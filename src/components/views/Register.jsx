import React, { useState } from 'react';
import { api, handleError } from 'helpers/api';
import User from 'models/User';
import { Link, useHistory } from 'react-router-dom';
import 'styles/views/Login.scss';
import BaseContainer from 'components/ui/BaseContainer';
import FormField from './FormField';
import { Button } from '../ui/Button';

// new material ui
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doRegistration = async () => {
    try {
      // formerly: isRegistrationProcess: for server to decide how to handle passed object (login or registration process)
      const requestBody = JSON.stringify({
        username,
        password,
        email,
      });

      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('id', user.id);

      // Login successfully worked --> navigate to the route /home in the HomeRouter
      history.push('/home');
    } catch (error) {
      alert(`Something went wrong during the registration: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div
          className="login form"
          style={{
            height: '400px',
          }}
        >
          <FormField
            label="Username"
            value={username}
            onChange={(un) => setUsername(un)}
          />
          <FormField
            label="email"
            value={email}
            onChange={(n) => setEmail(n)}
            type="email"
          />
          <FormField
            label="password"
            value={password}
            onChange={(n) => setPassword(n)}
            type="password"
          />
          <div className="login button-container">
            <Button
              disabled={!username || !password || !email}
              width="100%"
              onClick={() => doRegistration()}
            >
              Sign up and Login
            </Button>
          </div>
        </div>
        {
          // adds link element/component under the login component
        }
        <Link to="/login">Back to Login</Link>
      </div>
    </BaseContainer>
  );
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Register;
