import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import PropTypes from 'prop-types';
import 'styles/views/Game.scss';
import { styled } from '@mui/material/styles';

import {
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import User from '../../models/User';

function Player({ user }) {
  return (
    <div className="player container">
      <div className="player username">{user.username}</div>
      <div className="player name">{user.name}</div>
      <div className="player id">
        id:
        {user.id}
      </div>
    </div>
  );
}

Player.propTypes = {
  user: PropTypes.object.isRequired,
};

function Pictures() {
  // use react-router-dom's hook to access the history

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [users, setUsers] = useState(null);
  const [images, setImages] = useState(null);
  const [cookies, _setCookie] = useCookies(['userId']);

  // delete request

  const deleteImage = async (imageId) => {
    try {
      // formerly: isRegistrationProcess: for server to decide how to handle passed object (login or registration process)
      const { id: userId } = cookies;
      const requestBody = JSON.stringify({
        userId,
      });

      const response = await api.post(`/images/${imageId}`, requestBody);
    } catch (error) {
      alert(`Something went wrong during the registration: \n${handleError(error)}`);
    }
  };

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const response = await api.get('/users');

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        // eslint-disable-next-line
                await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUsers(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
        console.error('Details:', error);
        alert('Something went wrong while fetching the users! See the console for details.');
      }
    }

    fetchData();
  }, []);

  // fetching pictures
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchPictures() {
      try {
        const response = await api.get('/images/all/1');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setImages(response.data);
      } catch (error) {
        console.error(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error('Details:', error);
        alert('Something went wrong while fetching the images! See the console for details.');
      }
    }

    fetchPictures();
  }, []);

  let content = <Spinner />;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  if (users) {
    content = (
      <div className="game">
        <ul className="game user-list">
          {users.map((user, index) => (
            <Player user={user} key={`${user.id}_with_index_${index}`} />
          ))}
        </ul>
      </div>
    );
  }
  if (images) {
    content = (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              item = xs=4
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>

      </Grid>
    );
  }

  return (

    <div>
      <h2>Pictures</h2>
      <p>On this page, you can see your uploaded pictures and you can upload new ones!</p>
      <Button variant="contained" href="/upload/" color="success">
        Upload a new picture!
      </Button>
      <h3>Your pictures</h3>
      <p>Below, you can your uploaded pictures!</p>

      <p className="game paragraph">
        Get all users from secure endpoint:
      </p>
      {content}
    </div>

  );
}

export default Pictures;
