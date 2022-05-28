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

  const doClass = async (i) => {
    const userId = 1;
    const authAxios = axios.create({
      baseURL: getDomain(),
      headers: { userId, 'Content-Type': 'application/json' },
    });
    const imageId = i + 1;
    console.log(i + 1);
    const classification = 'A';
    const requestBody1 = JSON.stringify({
      imageId,
      classification,
    });
    const response1 = await authAxios.put('/classification', requestBody1);
    console.log(response1);
  };

  const demoSetup = async () => {
    const car = ['https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F1.jpg?alt=media&token=a894f74d-d6e6-456a-89a5-c16186c041d9', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F10.jpg?alt=media&token=8d18f6e7-c5e0-4951-a29d-288d16388bb0', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F11.jpg?alt=media&token=a4e2e957-bcf9-4bd8-b9dc-3472e111be47', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F12.jpg?alt=media&token=97f2a308-15c1-463a-ad65-463e301e53f0', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F13.jpg?alt=media&token=c7d60fbb-08ba-429b-9f01-a07a950cb7ac', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F14.jpg?alt=media&token=4a03e14c-a5f6-4226-acad-bff93bbd18ad', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F15.jpg?alt=media&token=6a65e7e3-f520-4c97-adff-cf2989fbdf16', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F15.jpg?alt=media&token=6a65e7e3-f520-4c97-adff-cf2989fbdf16', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F16.jpg?alt=media&token=8b11dabd-bff3-476d-8edd-826c70c637f8', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F17.jpg?alt=media&token=f74d255d-1e50-4a37-ba91-5b09236f6244', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F18.jpg?alt=media&token=cb0afafa-ad84-49d6-816e-eb5ff4fc2b12', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F19.jpg?alt=media&token=29aaa507-e6b1-40a6-9138-7e609c290207', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F2.jpg?alt=media&token=6a266a9e-4d52-4d2d-ad77-d61be1725e82', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F20.jpg?alt=media&token=89274253-1c98-4b3b-a64a-70ecc2d2d387', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F3.jpg?alt=media&token=7c1220d1-0c60-4405-894f-49a1fb26bbfe', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F4.jpg?alt=media&token=387974d0-5564-445f-bfd4-3ae954fccc2c', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F5.jpg?alt=media&token=4f24f384-c184-453c-9ff9-62bb2b3fd0c7', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F6.jpg?alt=media&token=e966d35c-10ec-495b-a5a8-89ef0855c6a8', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F7.jpg?alt=media&token=d0ff5ec6-7c88-494d-b39e-86a1750a6e9c', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F8.jpg?alt=media&token=0b6098b1-7600-4137-be4f-e31da4673929', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F9.jpg?alt=media&token=bf2e1823-bad7-4845-bc67-35f778e5f0bd'];

    car.forEach(async (x, i) => {
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
      const response = await authAxios.post('/images', requestBody);
      console.log(response);

      if (i % 2 === 1) {
        doClass(i);
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
