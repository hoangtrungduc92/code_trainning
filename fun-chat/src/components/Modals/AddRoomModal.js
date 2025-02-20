import { Form, Input,Modal } from 'antd'

import React ,{useContext}from 'react'
import { AppContext } from '../../Context/AppProvider'


import { addDocument } from '../../firebase/service';


export default function AddRoomModal() {
  
  const {isAddRoomVisible,setIsAddRoomVisible,user} = useContext(AppContext);
  
  
  
  const [form] = Form.useForm();
  const handleOK = () => {
    //add new rooms to firestore
    addDocument('rooms',{
      name: form.getFieldValue('name'),
      description: form.getFieldValue('description'),
      members: [user.uid]
    })
    form.resetFields();
    setIsAddRoomVisible(false);
  }
  const handleCancel = () => {
    setIsAddRoomVisible(false);
    form.resetFields();
  }
  return (
    <div><Modal title='Tạo phòng' open={isAddRoomVisible} onOk={handleOK} onCancel={handleCancel}>
            <Form form={form}>
                <Form.Item label="Tên phòng" name='name'>
                    <Input allowClear={false} placeholder='Nhập tên phòng'/>
                </Form.Item>
                <Form.Item label="Nhập mô tả" name='description'>
                    <Input.TextArea allowClear={false} placeholder='Nhập mô tả'/>
                </Form.Item>
            </Form>
        </Modal></div>
  )
}
