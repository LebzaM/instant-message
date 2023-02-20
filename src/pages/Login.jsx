import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {useState} from 'react'
import {auth, storage, db} from '../Firebase'
import {signInWithEmailAndPassword} from "firebase/auth";
import loginico from '../img/loginpic.png'
const Login = () => {

  const [err, setErr] = useState(false);
  const navigate=useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      setErr(true)
    }
  }
  return (
    
    <div className='formContainer'>
    <div className='formWrapper'>
        <span className='logo'>Chatty</span>
        <span className='slogan'>-A new way to chat</span>
        <img src={loginico} height='80px' className='loginpic'></img>
        <span className='title'>Login</span>
       <form onSubmit={handleSubmit}>
        
        <input type='email' placeholder='email'/>
        <input type='password' placeholder='password'/>
        

        <button>Sign in</button>
        <div style={{alignItems:'center', display:'flex', justifyContent:'center'}}>
            {err && <span>Try again</span>}
            </div>

       </form>
       <p>Don't have an account? <Link to="/register">Register</Link></p>

    </div>
</div>

  )
}

export default Login