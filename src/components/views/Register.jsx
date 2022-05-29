import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { api, handleError } from '../../helpers/api';
import User from '../../models/User';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      Sopra Group 20 ©
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

function Register() {
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const history = useHistory();
  const [_cookies, setCookie] = useCookies(['id', 'token']);
  const theme = createTheme();

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const email = event;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage('Your email looks good!');
    } else {
      setIsValid(false);
      setMessage('Please enter a valid email!');
    }
  };

  const doRegistration = async (username, password, email) => {
    try {
      const requestBody = JSON.stringify({
        username,
        password,
        email,
      });
      const response = await api.post('/users', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      setCookie('id', user.userId, { path: '/' });
      setCookie('token', user.token, { path: '/' });
      setCookie('userData', user, { path: '/' });
      // Login successfully worked --> navigate to the route /home in the HomeRouter
      history.push('/home');
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
      email: data.get('email'),

    });
    doRegistration(data.get('username'), data.get('password'), data.get('email'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://airwallpaper.com/wp-content/uploads/2016/04/Winter-dog-snowflakes-wallpaper-HD.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2>RATE ME!</h2>
            <Avatar sx={{ m: 1, bgcolor: 'Green' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              <TextField
                onChange={(un) => setUsernameInput(un.target.value)}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                onChange={(em) => { validateEmail(em.target.value); setEmailInput(em.target.value); }}
                margin="normal"
                required
                fullWidth
                name="email"
                label="E-Mail"
                type="email"
                id="email"
              />
              <Typography variant="button" style={{ color: `${isValid ? 'green' : 'red'}` }}>
                {message}
              </Typography>
              <TextField
                onChange={(pw) => setPasswordInput(pw.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                disabled={!isValid || !emailInput || !usernameInput || !passwordInput}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/Login" variant="body2">
                    Already got an account? Sign In
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Register;
