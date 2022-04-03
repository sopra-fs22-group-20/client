import React, { useState } from 'react';
import { api, handleError } from 'helpers/api';
import User from 'models/User';
import { useHistory } from 'react-router-dom';
import 'styles/views/Login.scss';
// new material ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import FormField from './FormField';

function Login() {
  const history = useHistory();
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
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
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Navbar />
      <h1>Login</h1>

      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            defaultValue={username}
            onChange={(un) => setUsername(un)}
          />
          <FormField
            label="Password"
            defaultValue={password}
            onChange={(n) => setPassword(n)}
          />
          <div className="login button-container">
            <Button
              variant="contained"
              disabled={!username || !password}
              width="100%"
              onClick={() => doLogin()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </Box>
  );
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
