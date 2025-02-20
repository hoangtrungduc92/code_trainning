import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import {Spin} from 'antd';
export const AuthContext = React.createContext();
export default function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();
    React.useEffect(() =>{
     const unsubscribed = auth.onAuthStateChanged(user=>{
            if(user) {
               const {displayName, email, uid, photoURL } = user;
               setUser({displayName, email, uid, photoURL });
                setIsLoading(false);
                navigate('/');
            } else {
                setIsLoading(false);
                navigate('/login');
            }
        })
        
        //console.log(uid);
        return () => {
            
                     
            unsubscribed()
    };  // cleanup function
    },[navigate])
   

  return (
    <AuthContext.Provider value={{user,setUser}}>{isLoading?<Spin/>:children}</AuthContext.Provider>
  )
}
