import React, { useState } from 'react'
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';


export const AppContext = React.createContext();

export default function AppProvider({children}) {
    const [isAddRoomVisible,setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible,setIsInviteMemberVisible] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('');
    
    //const {uid} = React.useContext(AuthContext);
    const {user} = React.useContext(AuthContext);
    

    
    
    const roomCondition = React.useMemo(()=> {
        return {fieldName:'members',operator:'array-contains',compareValue:user.uid}
    },[user.uid])
   
    
    const rooms = useFireStore('rooms',roomCondition);
    const userCondition = React.useMemo(()=> {
      return {fieldName:'uid',operator:'in',compareValue:selectedRoom.members}
  },[selectedRoom.members])
  const usersGroup = useFireStore('users',userCondition);
  
    
    


  
    
  return (
    <AppContext.Provider value={{isInviteMemberVisible,setIsInviteMemberVisible,user,rooms,isAddRoomVisible,setIsAddRoomVisible,selectedRoom,setSelectedRoom,usersGroup}}>{children}</AppContext.Provider>
  )
}
