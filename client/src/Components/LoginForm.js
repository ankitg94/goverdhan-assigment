import React, { useState } from 'react';
import "../CSS/Hompage..css"
import { Login } from '../Api/AllApi';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
const navigate =useNavigate("")
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const login = await Login(loginData)
    if(login){
    navigate("/profile")
    }
    else{
    console.log("login failed")
    }
   
    
  };

  return (
    <div className='form'> 
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
