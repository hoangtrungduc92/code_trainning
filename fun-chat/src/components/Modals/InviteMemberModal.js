import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { Modal,Form,Select, Spin, Avatar } from 'antd';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';
function DebounceSelect({
    fetchOptions,debounceTimeout=300,...props
}
){
    const [fetching,setFetching] = useState(false);
    const [options,setOptions] =useState([]);
    const deboundFetcher = React.useMemo(()=>{
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);
            fetchOptions(value,props.curMembers).then((newOptions)=>{
            setOptions(newOptions);
            setFetching(false);        
        })
    }
    return debounce(loadOptions,debounceTimeout);
    },[debounceTimeout,fetchOptions,props.curMembers])
    return (
        <Select
           labelInValue
           filterOption={false}
           onSearch={deboundFetcher}
           notFoundContent={fetching?<Spin size='small'/>:null}
           {...props}
        >
            {
                // custom option {label:displayname,value:uid,photoURL:url,}
                options.map(option=>(
                    <Select.Option key={option.value} value={option.value}>{option.label}
                        <Avatar size='small' src={option.photoURL}>{option.photoURL?'':option.label.charAt(0).toUpperCase()}</Avatar>
                    {`${option.label}`}
                    </Select.Option>
                ))
            }
        </Select>
    )
}
async function fetchUserList(search,curMembers) {
    return db.collection('users').where('keywords','array-contains',search.toLowerCase())
    .orderBy('displayName').limit(20).get().then(snapshot=>{
        return snapshot.docs.map(doc=>({
            label: doc.data().displayName,
            value: doc.data().uid,
            photoURL: doc.data().photoURL
        })).filter(opt=> !curMembers.includes(opt.value))
    });
}
export default function InviteMemberModal() {
    const {isInviteMemberVisible,setIsInviteMemberVisible,selectedRoom} =useContext(AppContext);
    const [value,setValue] =useState([]);
    const [form] = Form.useForm();
    const handleOK = () => {
      //add update rooms to firestore. Add uid to members filed
      const roomRef = db.collection('rooms').doc(selectedRoom.id);
      roomRef.update({
        members: [...selectedRoom.members, ...value.map(val=>val.value)]
      })
      form.resetFields();
      setIsInviteMemberVisible(false);
    }
    const handleCancel = () => {
        setIsInviteMemberVisible(false);
      form.resetFields();
    }
  return (
    <div><Modal title='Mời thành viên' open={isInviteMemberVisible} onOk={handleOK} onCancel={handleCancel}>
    <Form form={form} layout='vertical'>
        <DebounceSelect 
        mode='multiple'
        label='Tên các thành viên'
        value={value}
        placeholder='Nhập tên thành viên'
        fetchOptions={fetchUserList}
        onChange={newValue=>{
            setValue(newValue)           
            }       
        }
        curMembers={selectedRoom.members}   // for avoiding adding selected members in room        
        style={{width:'100%'}}
        />
    </Form>
</Modal></div>
  )
}
