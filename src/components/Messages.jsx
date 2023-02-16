import React from 'react'
import Message from '../components/Message'
import { ChatContext } from '../context/ChatContext'
import {useState, useEffect, useContext} from 'react'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '../Firebase'


const Messages = () => {
  const {data} = useContext(ChatContext)
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    const unsub = onSnapshot(doc(db,"chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
    return()=>{
      unsub()
    }

  },[data.chatId])
  return (
    <div className='messages'>
      {messages.map((m)=>(
         <Message message={m} key={m.id}/>

      ))}
       
       
    </div>
  )
}

export default Messages