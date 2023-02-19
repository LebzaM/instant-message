import React, { useContext } from 'react'
import { useState } from 'react'
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc, doc} from "firebase/firestore";
import {db} from '../Firebase'
import { AuthContext } from '../context/AuthContext';
import searchico from '../img/searchicon.png';
const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const {currentUser} = useContext(AuthContext)


//Search a user
const handleSearch= async ()=>{
  const q = query(collection(db, "users"), where("displayName", "==", username));
  try{
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  setUser(doc.data());
});
  }catch(err){
    setErr(true)
  }

};
const HandleKey =(e)=>{
  
  if(e.keyCode === 13 || e.keyCode === 13){
   handleSearch() }
   
}
//changed from e.code to e.key to 13
const handleSelect= async ()=>{
  // check if the group(chats stored in firestore ) exits, if they do not exist, create a new one

  const combinedId = currentUser.uid> user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if(!res.exists()){
      //create a new chat in collections 
      await setDoc(doc (db, "chats", combinedId), {messages: []});

      //create user chats with nested objects
     await updateDoc(doc(db, "userChats", currentUser.uid),{
      [combinedId+".userInfo"]:{
        uid:user.uid,
        displayName:user.displayName,
        photoURL: user.photoURL

      },
      [combinedId+".date"]: serverTimestamp()
     });
     //do the same for receiver of the message 
     await updateDoc(doc(db, "userChats", user.uid),{
      [combinedId+".userInfo"]:{
        uid:currentUser.uid,
        displayName:currentUser.displayName,
        photoURL: currentUser.photoURL

      },
      [combinedId+".date"]: serverTimestamp()
     });
    }
  } catch (err) {
    
  }
  setUser(null);
  setUsername("")
}
  return (
    <div className='search'>
      <div className='searchForm'>
        
        <input type="text" placeholder='Find Someone' onKeyDown={HandleKey} value={username} onChange={(e)=>setUsername(e.target.value)}/>
        {/* <img src={searchico} width='5%' height='5%' style={{display:'flex'}} className='searchicon'/> */}
        {/* <div className='searchicon'>
          <img src={searchico} width='5%' height='5%'/>
        </div> */}
      </div>
      
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL}/>
     
      <div className="userChatInfo">
        <span>{user.displayName}</span>
      </div>
      </div>}
      {err && <span>No user found</span>}

    </div>
  )
}

export default Search