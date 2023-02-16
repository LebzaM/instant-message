import React from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import{ useContext, useState} from 'react'
import { arrayUnion, doc, Timestamp, updateDoc ,serverTimestamp} from 'firebase/firestore'
import { storage, db } from '../Firebase'
import { v4 as uuid} from "uuid" ; //The uuid, or universally unique identifier, npm package is a secure way to generate cryptographically strong unique identifiers with Node. js that doesn't require a large amount of code.
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'

const Input = () => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleSend = async()=>{
    if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
  
        (error) => {
          // setErr(true);
          console.log(error)
          // Handle unsuccessful uploads
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            // console.log('File available at', downloadURL);
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text, 
                senderID:currentUser.uid,
                date: Timestamp.now(),
                img:downloadURL,
              })
             });
          });
        }
      );

    }else{
       await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID:currentUser.uid,
          date: Timestamp.now()
        })
       });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid),{
      [data.chatId+ ".lastMessage"]:{
        text,
      },
      [data.chatId+".data"]: serverTimestamp()

    });
    await updateDoc(doc(db, "userChats", data.user.uid),{
      [data.chatId+ ".lastMessage"]:{
        text,
      },
      [data.chatId+".data"]: serverTimestamp()

    });


    setText("");
    setImg(null);
  };
  return (
    <div className='input'>
      <input type='text' placeholder='Type something..' onChange={(e)=>setText(e.target.value)} value={text}/>
      <div className='send'>
        <img src={Attach} alt=""/>
        <input type='file' id='file' style={{display:"none"}} onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor='file'>
          <img src={Img} alt=""/>

        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input