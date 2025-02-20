import React from 'react'
import {Row,Col, Button,Typography} from 'antd'
import firebase, { auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/service';

const {Title} =Typography;
const fbProvider = new firebase.auth.FacebookAuthProvider();
export default function Login () {
    
    const  handleFbLogin = async () => {
        const {additionalUserInfo,user}= await auth.signInWithPopup(fbProvider);
          if(additionalUserInfo.isNewUser) {
            console.log(user.displayName);
            
            addDocument('users',{
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                providerID: additionalUserInfo.providerId,
                keywords:generateKeywords(user.displayName.toLowerCase())
            })
           
          }
    }
   
    return (
        <div>
            <Row justify={'center'} style={{height:800}}>
                <Col span={8}>
                <Title Level={3} style={{textAlign:'center'}}>Fun Chat</Title>
                <Button style={{width: '100%',marginBottom:5}}>
                    Đăng nhập bằng Google 
                </Button>
                <Button onClick={handleFbLogin} style={{width:'100%'}}>
                    Đăng nhập bằng Facebook
                </Button>
                </Col>
            </Row>
            
        </div>
    )
}