import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { RegistrationView } from '../registration-view/registration-view';
import './login-view.scss'

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  
const handleSubmit = (e) => {
  e.preventDefault();
  /* Send a request to the server for authentication */
  axios.post('https://nameless-bayou-89739.herokuapp.com/login', {
    userName: username,
    Password: password
  })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log('no such user')
  });
};
  return (
    <div className='login-view'>
    <div >
      <h1 className="logo">MY-FLIX</h1>
    </div>
    <Form>
      <h1>Sign in</h1>
    <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control placeholder='Email or phone number' type="text" onChange={e => setUsername(e.target.value)} />
    </Form.Group>

    <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control placeholder='Password' type="password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    <Button id="login-button" variant="primary" type="submit" onClick={handleSubmit}>
      Sign In
    </Button>
    <p className='signUP'>Need to create an account?<span>
    </span> <Link to='/register'> Sign up now</Link> </p>
        <Link to="/register">
            <Button className="ml-3" variant="secondary">Register now</Button>
        </Link>

    <p className='bot'>This page is protected by Google ReCAPTCHA to ensure you'r not a bot <a href='#'>Learn more</a></p>
  </Form>
    <div className='footer'><br />
<p>Question? <a href='#'>call 1-123-456-7890</a></p>
<a href='#' className='grid1'>FQA</a>
<a href='#' className='grid1'>Cookie Preferences</a>
<a href='#' className='grid1'>Help Center</a>
<a href='#'className='grid2'>Coporate information</a>
<a href='#' className='grid2'>terms of Use</a>
<a href='#' className='grid2'>Privacy</a>
<select name="Language" id="language">
<option value ='English'>English</option>  
<option value='Espanol'>Espanol</option>
</select>
    </div>
    </div>
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};