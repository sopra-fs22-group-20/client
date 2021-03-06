import React, { useEffect, useRef, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import PropTypes from 'prop-types';
import 'styles/views/Game.scss';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
  DialogContent, DialogContentText, DialogActions, ImageList, ImageListItem, Rating, Alert, Badge, IconButton, Tooltip,
} from '@mui/material';
import { useCookies } from 'react-cookie';
import mapboxgl from '!mapbox-gl';
import User from '../../models/User';
import Image from '../../models/Image';
import { mapboxAccessToken } from '../../helpers/mapboxConfig';

// This function player is from individual assignment.

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
  const [cookies, _setCookie] = useCookies(['id', 'userData']);
  const [errorImageId, setErrorImageId] = useState({ imageId: null, type: 'error', message: '' });
  const { userData } = cookies;
  const [user, setUser] = useState(null);

  // delete request

  const deleteImage = async (imageId) => {
    try {
      // formerly: isRegistrationProcess: for server to decide how to handle passed object (login or registration process)
      const { id: userId } = cookies;

      // refresh the page after deleting one image
      setImages((prev) => {
        const temp = [...prev];
        const i = prev.findIndex((x) => x.imageId === imageId);
        temp.splice(i, 1);
        return temp;
      });

      const response = await api.delete(`/images/${imageId}`, { headers: { userId } });
    } catch (error) {
      console.log(error.response);
      alert(`Something went wrong during the Deletion: \n${handleError(error)}`);
    }
  };
  console.log(userData);

  const boostImage = async (imageId) => {
    try {
      // formerly: isRegistrationProcess: for server to decide how to handle passed object (login or registration process)
      const { id: userId } = cookies;
      const requestBody = JSON.stringify({ userId, imageId });
      const response = await api.put('/images/boost', requestBody, { headers: { userId } });
      _setCookie('userData', { ...userData, trophies: userData.trophies - 10 }, { path: '/' });
      setUser((f) => ({ ...f, trophies: f.trophies - 10 }));
      setErrorImageId({ imageId, type: 'success', message: 'The boost was successfully activated. The duration of the boost is 24 hours.' });
    } catch (error) {
      setErrorImageId({ imageId, type: 'warning', message: error.response.data.message });
    }
  };

  // fetching pictures
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchPictures() {
      try {
        const { id: userId } = cookies;
        const response = await api.get(`/images/all/${userId}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setImages(response.data);

        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);
      } catch (error) {
        console.error(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error('Details:', error);
        alert('Something went wrong while fetching the images! See the console for details.');
      }
    }

    fetchPictures();
  }, []);

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const { id: userId } = cookies;
        const response = await api.get(`/users/${userId}`, { headers: { userId } });

        // Get the returned profile
        console.log(response.data);
        setUser(response.data);
        console.log(user);
        // console.log("User has been set");
      } catch (error) {
        console.error(`Something went wrong while fetching the User: \n${handleError(error)}`);
        console.error('Details:', error);
        alert('Something went wrong while fetching the User! See the console for details.');
      }
    }

    fetchData();
  }, []);

  let content = <Spinner />;

  // This is from individual assignment
  /*
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

 */

  if (images) {
    content = (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >

        <div style={{ margin: '0 auto' }}>
          <ul className="image list">
            {images.map((image) => (
              <DisplayImage image={image} errorImageId={errorImageId} setErrorImageId={setErrorImageId} deleteImage={deleteImage} boostImage={boostImage} />
            ))}
          </ul>
        </div>

      </Grid>
    );
  }

  return (

    <div style={{ textAlign: 'center' }}>
      <h2>Pictures</h2>

      <p>
        On this page, you can see your uploaded pictures! - You have
      </p>
      <p style={{ fontWeight: 'bold' }}>
        {' '}
        {user && user.trophies}
        {' '}
        Trophies
        {' '}
        <Tooltip
          style={{ fontSize: 16 }}
          title=<Typography fontSize={14}>
            You can use trophies to boost your images. One boost per image costs you 10 trophies. The boost will increase the likelihood that your images will be shown to other users for 24h.
            You can earn trophies by playing the game in the Home Screen. For each round that you win, you will receive 10 Trophies.
          </Typography>
        >
          <IconButton>
            <EmojiEventsIcon color="primary" fontSize="large" />
          </IconButton>
        </Tooltip>
      </p>
      <p />
      {content}
    </div>

  );
}

function DisplayImage({
  image, deleteImage, boostImage, errorImageId, setErrorImageId,
}) {
  const [value, setValue] = React.useState(2);

  mapboxgl.accessToken = mapboxAccessToken;
  const mapContainerRef = useRef(null);
  const [zoom, setZoom] = useState(5);
  const location = JSON.parse(image.location);
  console.log(location);
  // Initialize map when component mounts

  useEffect(() => {
    if (location) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [location.lng, location.lat],
        zoom,
      });

      /*
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
*/
      const marker = new mapboxgl.Marker({
        draggable: false,
      })
        .setLngLat([location.lng, location.lat])
        .addTo(map);
    }
  }, []);

  return (

    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <img
              style={{ objectFit: 'contain', width: '100%' }}
              src={image.storageLink}
              height={250}
              alt="new"
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            {errorImageId.imageId === image.imageId && <Alert severity={errorImageId.type} onClose={() => setErrorImageId((f) => ({ ...f, imageId: null }))}>{errorImageId.message}</Alert>}
            <div className="image">
              <div className="image title">

                <p align="center">
                  Title:
                  {' '}
                  {image.name}
                  {' '}
                </p>
              </div>
            </div>
            <p>
              Category:
              {' '}
              {image.category.name}
              {' '}
            </p>

            {location && (
            <p>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography><p> Show the Location</p></Typography>
                </AccordionSummary>
                <AccordionDetails style={{ overflow: 'hidden' }}>
                  <div ref={mapContainerRef} className="map-container" />

                </AccordionDetails>
              </Accordion>
            </p>
            )}
            <p>
              <Box
                sx={{
                  '& > legend': { mt: 2 },
                }}
              >
                <Typography component="legend">
                  <p>
                    Number of Ratings:
                    {image.ratingCounter}
                  </p>
                </Typography>
                <Rating name="read-only" value={image.rating} readOnly size="large" />
              </Box>
            </p>
            <div style={{ display: 'flex' }}>
              <Button variant="contained" style={{ margin: '0 0.5rem' }} fullWidth onClick={() => deleteImage(image.imageId)} size="large" color="error">Delete</Button>
              <Button variant="contained" style={{ margin: '0 0.5rem' }} fullWidth onClick={() => boostImage(image.imageId)} size="large" color="success">Boost</Button>
            </div>
            <p />
          </Item>
        </Grid>

      </Grid>
      <br />
    </Box>

  );
}

export default Pictures;
