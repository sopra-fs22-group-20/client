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
import axios from 'axios';
import { api, handleError } from '../../helpers/api';
import User from '../../models/User';
import { getDomain } from '../../helpers/getDomain';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Sopra Group 20 © '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

function Login() {
  const history = useHistory();
  const [_cookies, setCookie] = useCookies(['id', 'token']);
  const theme = createTheme();

  const doLogin = async (username, password) => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post('/login', requestBody);

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

    });
    doLogin(data.get('username'), data.get('password'));
  };

  const demoSetup = () => {
    const car = ['kevin', 'flo'];

    car.forEach((x, i) => {
      const name = i.toString();
      const userId = 1;
      const category = 'Car';
      const storageLink = x;
      const location = JSON.stringify('');

      const requestBody = JSON.stringify({
        name,
        location,
        storageLink,
        category,
      });
      const authAxios = axios.create({
        baseURL: getDomain(),
        headers: { userId, 'Content-Type': 'application/json' },
      });
      const response = authAxios.post('/images', requestBody);
      console.log(response);

      if (i % 2 === 0) {
        const imageId = i + 1;
        console.log(i + 1);
        const classification = 'A';
        const requestBody1 = JSON.stringify({
          imageId,
          classification,
        });
        const response1 = authAxios.put('/classification', requestBody1);
        console.log(response1);
      }
    });
  };

  /**
    const name = 'title';
    const userId = 1;
    const category = 'Fish';
    const storageLink = 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F17.jpg?alt=media&token=f74d255d-1e50-4a37-ba91-5b09236f6244';
    const location = JSON.stringify('');
    const requestBody = JSON.stringify({
      name,
      location,
      storageLink,
      category,
    });
    const authAxios = axios.create({
      baseURL: getDomain(),
      headers: { userId, 'Content-Type': 'application/json' },
    });
    const response = authAxios.post('/images', requestBody);
    console.log(response);
  };
*/
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
            // backgroundImage: 'url(https://images5.alphacoders.com/423/thumb-1920-423474.jpg)',
            backgroundImage: 'url(https://www.hdcarwallpapers.com/walls/novitec_mclaren_620r_2021_5k_3-HD.jpg)',
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
            <Avatar sx={{ m: 1, bgcolor: 'red' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={demoSetup}
              >
                Demo Setup
              </Button>

              <Grid container>
                <Grid item>
                  <Link href="/Register" variant="body2">
                    Don't have an account? Sign Up
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

export default Login;
