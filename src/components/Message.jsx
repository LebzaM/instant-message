import React, { useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import {useContext, useEffect} from 'react'


const Message = ({ message }) => {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef();

  useEffect(() => {
   ref.current?.scrollIntoView({behavior:"smooth"});
  }, [message])
  
  return (
    <div ref={ref} className={`message ${message.senderID === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src={message.senderID === currentUser.uid ? currentUser.photoURL: data.user.photoURL}/>
        <span>Just Now</span>

      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img}/>}
      </div>
    </div>
  )
}

export default Message