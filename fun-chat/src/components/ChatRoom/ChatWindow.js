import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Tooltip,Button,Form,Input } from 'antd';
import React, {  useContext, useState } from 'react'
import styled from 'styled-components';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/service';
import useFireStore from '../../hooks/useFireStore';




const HeaderStyled = styled.div`
    display:flex;
    justify-content:space-between;
    height:10%;
    padding:0 16px;
    align-item:center;
    border-bottom:1px solid rgb(230,230,230);
    .header {
        &__info{
             display:flex;
             flex-direction:column;
             justify-content:center;
        }
             &__title{
                 font-weight:bold;
                 margin:0px;
             }
             &__description{
                 font-size:12px;
             }
    
    }
`;
const ButtonGroupStyled = styled.div`
    display:flex;
    align-items:center;
    
`;

const ContentStyled = styled.div`
    height: 90%;
    display:flex;
    flex-direction:column;
    padding:11px;
    justify-content:flex-end;
`;

const MessageListStyled = styled.div`
    max-height:100%;
    overflow-y:auto;
`
const FormStyled = styled(Form)`
   display: flex;
   justify-content:space-between;
   align-items:center;
   padding:2px 2px 2px  0;
   border: 1px solid rgb(230,230,230);
   border-radius:2px;
   .ant-form-item{
        flex:1;
    margin-bottom:0px;
    margin-right:5px;
   }
`
const WrapperStyled = styled.div`
    height:100vh;
`

export default function ChatWindow() {
    const [inputValue,setInputValue] =useState('');
    const [form] = Form.useForm();
    const {selectedRoom,rooms,usersGroup,setIsInviteMemberVisible,user} = useContext(AppContext);   
    const condition = React.useMemo(()=>{
        return {fieldName:'roomId',operator:'==',compareValue:selectedRoom.id}
    },[selectedRoom.id])
    const messages = useFireStore('messages',condition);
   
     
    
    function handleOnSubmit() {
        addDocument('messages',{
            text:inputValue,
            uid:user.uid,
            photoURL:user.photoURL,
            displayName:user.displayName,
            roomId:selectedRoom.id            
        })
       form.resetFields(['message']);
       
    }
    function handleInputChange(e) {
        setInputValue(e.target.value);
    }
    if(!selectedRoom)
    {
         return <div></div>;
    }
    else if(rooms.length===0)
    {   
         return <div></div>;
    
    }
   else {
  
 


  return (
    <WrapperStyled>
  
        <HeaderStyled>
            <div className='header__info'>
                <p className='header__title'>{selectedRoom?selectedRoom.name:''}</p>
                <span className='header__description'>{selectedRoom?selectedRoom.description:''}</span>
            </div>
            <ButtonGroupStyled>   
                <Button type='text' icon={<UserAddOutlined/>} onClick={()=>setIsInviteMemberVisible(true)}>Mời</Button>
                <Avatar.Group size='small' max={{count:2}} >
                {
                selectedRoom?usersGroup.map(userGroup=>(
                    <Tooltip title={userGroup.displayName}>
                        <Avatar>{userGroup.photoURL?'' : userGroup.displayName?.charAt(0).toUpperCase()}</Avatar>
                    </Tooltip>
                )) : <div></div>
            }
                    
                   
                </Avatar.Group>
            </ButtonGroupStyled>
        </HeaderStyled>
        <ContentStyled>
            <MessageListStyled>
                {   
                    
                    messages.map(message=>(
                        <Message text={message.text} photoURL={message.photoURL} createAt={message.createAt} displayName={message.displayName}></Message>
                    ))
                }
               
               
            </MessageListStyled>
            <FormStyled form={form} >
                <Form.Item name='message'>
                    <Input 
                        autoComplete='off' 
                        placeholder='Nhập tin nhắn...'
                        onChange={handleInputChange}
                        onPressEnter={handleOnSubmit}
                        

                        />
                </Form.Item>
                <Button type='primary' onClick={handleOnSubmit}>Gửi</Button>
            </FormStyled>
        </ContentStyled>
    </WrapperStyled>
  )

   }
    
}
