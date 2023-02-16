import React from 'react'
import "../style.scss"
import Add from '../img/addAvatar.png'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage, db} from '../Firebase'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import {useState} from 'react'





const Register = () => {
  const [err, setErr] = useState(false);
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e)=>{
    setLoading(true)
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

   
    try{
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);

        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
  
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              // console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      }catch(err){
        setErr(true);
        setLoading(false);

    }


  


  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chatty</span>
            <span className='title'>Register</span>
           <form onSubmit={handleSubmit}>
            <input required type='text' placeholder='username'/>
            <input required type='email' placeholder='email'/>
            <input required type='password' placeholder='password'/>
            <input required type='file' placeholder='insert file' id='file' style={{display:"none"}}/>
            <label htmlFor='file'>
              <img src={Add} alt='Upload Avatar'/>
              <span>Add a profile picture</span>

            </label>

            <button disabled={loading}>Sign Up</button>
            <div style={{alignItems:'center', display:'flex', justifyContent:'center'}}>
            {loading && <span>Loading...</span>}
            </div>
            <div style={{alignItems:'center', display:'flex', justifyContent:'center'}}>
            {err && <span>Try again</span>}
            </div>
           </form>
           <p>Simply Login if you have an account already <Link to="/login">Login</Link></p>

        </div>
    </div>
  );
};

export default Register