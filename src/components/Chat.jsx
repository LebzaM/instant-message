import React from 'react'
import Add from '../img/add.png'
import Cam from '../img/cam.png'
import More from '../img/more.png'
import Messages from '../components/Messages'
import Input from '../components/Input'
import { ChatContext } from '../context/ChatContext'
import {useContext, useState} from 'react'

const Chat = () => {
  const {data} = useContext(ChatContext)
  
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span >{data.user?.displayName}</span>
        <div className='chatIcons'>
          <img src={Cam}/>
          <img src={Add}/>
          <img src={More}/>
        </div>
        
      </div>
      <Messages />
      <Input/>
    </div>
  )
}

export default Chat