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
  DialogContent, DialogContentText, DialogActions, ImageList, ImageListItem, Rating,
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
  const [cookies, _setCookie] = useCookies(['id']);

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

  const boostImage = async (imageId) => {
    try {
      // formerly: isRegistrationProcess: for server to decide how to handle passed object (login or registration process)
      const { id: userId } = cookies;
      const requestBody = JSON.stringify({ id: userId });
      const response = await api.put('/images/boost', requestBody, { headers: { userId } });
    } catch (error) {
      console.log(error.response);
      alert(`Something went wrong during the boosting of your image: \n${handleError(error)}`);
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

        <item>
          <ul className="image list">
            {images.map((image) => (
              <DisplayImage image={image} deleteImage={deleteImage} />
            ))}
          </ul>
        </item>

      </Grid>
    );
  }

  return (

    <div>
      <h2>Pictures</h2>
      <p>On this page, you can see your uploaded pictures!</p>

      {content}
    </div>

  );
}

function DisplayImage({ image, deleteImage, boostImage }) {
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
            <Button variant="contained" onClick={() => deleteImage(image.imageId)} size="large" color="error">Delete</Button>
            <Button variant="contained" onClick={() => boostImage(image.imageId)} size="large" color="success">Boost</Button>
            <p />
          </Item>
        </Grid>

      </Grid>
      <br />
    </Box>

  );
}

export default Pictures;
