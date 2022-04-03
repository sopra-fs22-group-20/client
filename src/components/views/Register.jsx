import React, { useState } from 'react';
import { api, handleError } from 'helpers/api';
import User from 'models/User';
import { useHistory } from 'react-router-dom';
import 'styles/views/Login.scss';
import BaseContainer from 'components/ui/BaseContainer';
import Button from '@mui/material/Button';
import FormField from './FormField';

// new material ui
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, email, password });
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push('/game');
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <h1>sopra-fs22-group-20</h1>
      <h2>This is the register Page!</h2>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            defaultValue={username}
            onChange={(un) => setUsername(un)}
          />
          <FormField
            label="email"
            defaultValue={email}
            onChange={(n) => setEmail(n)}
          />
          <FormField
            label="password"
            defaultValue={password}
            onChange={(n) => setPassword(n)}
          />
          <div className="login button-container">
            <Button
              disabled={!username || !email}
              width="100%"
              onClick={() => doLogin()}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Register;
