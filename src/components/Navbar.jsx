import React from 'react'
import "../style.scss"
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import { AuthContext } from '../context/AuthContext'
import {useContext} from 'react'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
 return(
    <div className='navbar'>
      <span className='title'>Chatty</span>
      <div className='user'>
        <img src={currentUser.photoURL} alt=''/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>

      </div>
    </div>
  )
}

export default Navbar