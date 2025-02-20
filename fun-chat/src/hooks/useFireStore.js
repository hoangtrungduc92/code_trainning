import { useState } from "react";
import { db } from "../firebase/config";
import React from 'react'

const useFireStore = (collection,condition) =>{
    const [documents,setDocument] = useState([]);
      React.useEffect(() => {
    let collectionRef = db.collection(collection).orderBy('createAt');  
        
        
    
    // condition {
    //     filedName:name;
    //     operator: '==',
    //     compareValue: value
    //  }
    
    
    if(condition)
    {
        if(!condition.compareValue||!condition.compareValue.length)
        {
            return;
        }
       collectionRef= collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
        const unsubscribe = collectionRef.onSnapshot((snapshot)=>{    
               
           const documents = snapshot.docs.map(doc=>({
             ...doc.data(),id:doc.id
           }))
           setDocument(documents);
        });
        return unsubscribe;
  }
},[collection,condition])
  

  return documents;
}
export default useFireStore;