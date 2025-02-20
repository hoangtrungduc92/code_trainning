import React, { useContext } from 'react'
import { Button ,Avatar, Typography} from 'antd'
import styled from 'styled-components'
import { auth } from '../../firebase/config'
import { AuthContext } from '../../Context/AuthProvider'
import { AppContext } from '../../Context/AppProvider'

const WrapperStyled = styled.div`
    display: flex;

    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(82,38,83);
    .username {
        color: white;
        margin-left:5px;
    }
`

export default function UserInfo() {

  const {user,setUser} = React.useContext(AuthContext);
  const {setSelectedRoom} = useContext(AppContext);
  function signOut() {
    auth.signOut();
    setUser({});
    setSelectedRoom('');
  }
  return (
    <WrapperStyled>
        
        <div>
            <Avatar src={user.photoURL}> {user.photoURL?'' : user.displayName?.charAt(0).toUpperCase()}</Avatar> 
            <Typography.Text className='username'>{user.displayName}</Typography.Text>
        </div>
        <Button ghost onClick={signOut}>Đăng xuất</Button>
    
    </WrapperStyled>
    
  )
}
