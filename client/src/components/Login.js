import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    e.preventDefault()
      setCredentials({
        ...credentials,
        [e.target.id]: e.target.value
      })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('login', credentials)
      .then(response => {
        // console.log(response)
        localStorage.setItem('token', response.data.payload);
        props.history.push('/bubblepage');
      })
      .catch(err => {
        console.log(err)
      })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' id='username' placeholder='username' value={credentials.username} onChange={handleChange} />
        <input type='password' id='password' placeholder='password' value={credentials.password} onChange={handleChange} />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
