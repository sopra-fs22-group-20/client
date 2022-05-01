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
  const [password, setPassword] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const { id } = useParams();
  const [cookies, _setCookie] = useCookies(['id']);

  // This function is responsible for sending request to server to change the username

  const changeUsername = async () => {
    try {
      const { id: userId } = cookies;
      const requestBody = JSON.stringify({ id: userId, username });
      const response = await api.put(`/users/${userId}`, requestBody, { headers: { userId } });

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // This command reloads the page
      // window.location.reload(false);
      console.log(username);
    } catch (error) {
      console.log(username);
      alert(`Something went wrong while changing the username. \n${handleError(error)}`);
    }
  };

  // This function is responsible for sending request to server to change the password

  const changePassword = async () => {
    try {
      const requestBody = JSON.stringify({ id: id2, password });
      const response = await api.put(`/users/${urla2}`, requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // This command reloads the page
      window.location.reload(false);
    } catch (error) {
      alert(`Something went wrong while changing the password. \n${handleError(error)}`);
    }
  };

  // This function is responsible for sending request to server to change the Instagram account name

  const changeInstagram = async () => {
    try {
      const requestBody = JSON.stringify({ id: id2, instagram });
      const response = await api.put(`/users/${urla2}`, requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // This command reloads the page
      window.location.reload(false);
    } catch (error) {
      alert(`Something went wrong while changing the instagram account. \n${handleError(error)}`);
    }
  };

  return (

    <>
      <CssBaseline />

      <main>
        <div>
          <Container maxWidth="sm">
            <Typography variant="h2" align="left" color="textPrimary" gutterBottom>
              Settings
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              On the settings page, you can update your account settings.
            </Typography>
            <div>
              <Typography variant="subtitle2" gutterBottom component="div">
                Your username: Aleks
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
                      id="outlined-basic"
                      label="Enter a new username"
                      variant="outlined"
                      onChange={(un) => setUsername(un.target.value)}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      changeUsername();
                    }}
                  >
                    Change Username
                  </Button>
                </Grid>

              </Grid>

            </div>

            {/* Before you put here onChange in the TextField wait to see how it works for ChangeUsername. Wait until server is ready for that. */}

            <div>
              <Typography variant="subtitle2" gutterBottom component="div">
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
              <Typography variant="subtitle2" gutterBottom component="div">
                Instagram: @Aleks_04_2022
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
                    <TextField id="outlined-basic" label="Enter a new Instagram Account" variant="outlined" />
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
