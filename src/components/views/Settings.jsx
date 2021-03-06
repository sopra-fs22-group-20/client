import { useEffect, useState } from 'react';

import { api, handleError } from 'helpers/api';

import { Spinner } from 'components/ui/Spinner';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';

import 'styles/views/Game.scss';
import PropTypes from 'prop-types';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useCookies } from 'react-cookie';
import User from '../../models/User';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Settings() {
  const history = useHistory();

  const [username, setUsername] = useState(null);
  const [moreInfo, setmoreInfo] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [user, setUser] = useState(1);
  const [password, setPassword] = useState(null);
  const { id } = useParams();
  const [cookies, _setCookie] = useCookies(['userId', 'userData']);
  const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });

  const { userData } = cookies;

  // This function is responsible for sending request to server to change the username
  /*
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const { id: userId } = cookies;
        const response = await api.get(`/users/${userId}`, { headers: { userId } });

        // Get the returned profile
        setUser(response.data);
        // console.log("User has been set");
      } catch (error) {
        console.error(`Something went wrong while fetching the User: \n${handleError(error)}`);
        console.error('Details:', error);
        alert('Something went wrong while fetching the User! See the console for details.');
      }
    }

    fetchData();
  }, []);
  const getUserData = async () => {
    try {
      const { id: userId } = cookies;
      const response = await api.get(`/users/${userId}`);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // This command reloads the page
      // window.location.reload(false);
      console.log(username);
      setCookie('userData', { ...userData, username: user.username }, { path: '/' });
    } catch (error) {
      console.log(username);
      alert(`Something went wrong while changing the username. \n${handleError(error)}`);
    }
  }; */

  const changeUsername = async (field, value) => {
    try {
      const { id: userId } = cookies;
      const requestBody = JSON.stringify({ id: userId, username });
      const response = await api.put(`/users/${userId}`, requestBody, { headers: { userId } });

      _setCookie('userData', { ...userData, username }, { path: '/' });
      setUsername('');
      // Get the returned user and update a new object.
      // const user = new User(response.data);

      // This command reloads the page
      // window.location.reload(false);
    } catch (error) {
      alert(`Something went wrong while changing the username. \n${handleError(error)}`);
    }
  };

  // This function is responsible for sending request to server to change the password

  const changePassword = async () => {
    try {
      const { id: userId } = cookies;
      const requestBody = JSON.stringify({ password });
      const response = await api.put(`/users/credentials/${userId}`, requestBody, { headers: { userId } });

      _setCookie('userData', { ...userData, password }, { path: '/' });
      setPassword('');
      setAlertMessage({ message: 'You successfully updated your password', type: 'success' });
    } catch (error) {
      alert(`Something went wrong while changing the username. \n${handleError(error)}`);
    }
  };
  // This function is responsible for sending request to server to change the Instagram account name
  console.log(userData);
  const changeMoreInfo = async () => {
    try {
      const { id: userId } = cookies;
      const requestBody = JSON.stringify({ id: userId, instagram: userData.instagram, moreInfo });
      const response = await api.put(`/users/info/${userId}`, requestBody, { headers: { userId } });

      _setCookie('userData', { ...userData, moreInfo }, { path: '/' });
      setmoreInfo('');
      setAlertMessage({ message: 'You successfully updated your more info field', type: 'success' });
    } catch (error) {
      alert(`Something went wrong while changing the username. \n${handleError(error)}`);
    }
  };

  const changeInstagram = async () => {
    try {
      const { id: userId } = cookies;
      const requestBody = JSON.stringify({ id: userId, instagram, moreInfo: userData.moreInfo });
      const response = await api.put(`/users/info/${userId}`, requestBody, { headers: { userId } });

      _setCookie('userData', { ...userData, instagram }, { path: '/' });
      setInstagram('');
      setAlertMessage({ message: 'You successfully updated your Instagram', type: 'success' });
    } catch (error) {
      alert(`Something went wrong while changing the username. \n${handleError(error)}`);
    }
  };

  return (

    <>
      <CssBaseline />

      <main>
        <div>
          <Container maxWidth="sm">
            <Typography variant="h2" align="left" color="textPrimary" gutterBottom />
            <Typography variant="h4" align="center" color="textSecondary" paragraph>
              On this page you can update your account settings.
            </Typography>

            {alertMessage.message && (
            <div>
              <Alert severity={alertMessage.type} onClose={() => setAlertMessage({ message: '', type: '' })}>
                {' '}
                <Typography variant="h6" style={{ fontWeight: 'bold' }} align="center">
                  {alertMessage.message}
                </Typography>
              </Alert>
            </div>
            )}

            <div>
              <Typography variant="h5" gutterBottom component="div">
                Your username:
                {' '}
                {userData.username}
              </Typography>

            </div>

            {/* Before you put here onChange in the TextField wait to see how it works for ChangeUsername. Wait until server is ready for that. */}

            <div>
              <Typography variant="h5" gutterBottom component="div">
                Your password: **********
              </Typography>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(un) => setPassword(un.target.value)}
                      value={password}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      changePassword();
                    }}
                  >
                    Change Password
                  </Button>
                </Grid>

              </Grid>

            </div>
            <div>
              <Typography variant="h5" gutterBottom component="div">
                More Information:
                {' '}
                {userData.moreInfo}
              </Typography>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="outlined-basic" label="Enter more information" variant="outlined" onChange={(un) => setmoreInfo(un.target.value)} value={moreInfo} />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      changeMoreInfo();
                    }}
                  >
                    Update new Information
                  </Button>
                </Grid>

              </Grid>

            </div>

            <div>
              <Typography variant="h5" gutterBottom component="div">
                Instagram:
                {' '}
                {userData.instagram}

              </Typography>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-password-input"
                      label="Enter your Instagram"
                      autoComplete="current-password"
                      onChange={(un) => setInstagram(un.target.value)}
                      value={instagram}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      changeInstagram();
                    }}
                  >
                    Change Instagram
                  </Button>
                </Grid>

              </Grid>

            </div>

          </Container>
        </div>

      </main>
    </>
  );
}

export default Settings;
