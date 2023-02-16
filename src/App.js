import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom"
import { AuthContext } from './context/AuthContext';
import {useContext} from 'react'
function App() {
  const { currentUser } =useContext(AuthContext)
 
  //React protected Router
  const ProtectedRoute  =({children})=>{
    

    if(!currentUser){
      return <Navigate to="/login" />;
      
    }
    return children;
  }
  // console.log(currentUser)
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>

      </Route>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
