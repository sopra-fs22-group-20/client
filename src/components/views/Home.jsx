import React, { useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
import 'styles/views/Game.scss';
import { useHistory } from 'react-router-dom';
import {
  Grid, ImageList, ImageListItem, Rating, Typography,
} from '@mui/material';
import { Axios } from 'axios';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

function Home() {
  // TODO: imageURL is directly there when rendering
  const [randImageURL, setRandImageURL] = useState('');
  const [randImage, setRandImage] = useState(null);
  const [value, setValue] = React.useState(0); // TODO: fix number
  const [hover, setHover] = React.useState(-1);
  const history = useHistory();

  const labels = {
    1: 'Ewwww!',
    2: 'Ewwwish..',
    3: 'Hmmm',
    4: 'Nice',
    5: 'Hot!',
  };

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchRandomPictureURL() {
      try {
        // const response = await api.get('/randImage'); // TODO: specify call to backend
        // const response = 'https://images.dog.ceo//breeds//malinois//n02105162_10076.jpg';
        const response = 'https://ik.imagekit.io/ikmedia/women-dress-2.jpg';
        // eslint-disable-next-line
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned image URL and update the state.
        // setRandImageURL(response.data);
        setRandImageURL(response);
      } catch (error) {
        console.error(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error('Details:', error);
        alert('Something went wrong while fetching the users! See the console for details.');
      }
    }
    /*    const downloadPicture = async () => {
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
    }; */

    fetchRandomPictureURL(); // TODO: or better const url = ....
    // downloadPicture(randImageURL)
  }, []);

  const content = <Spinner />; // TODO: exchange with logo/animation

  if (randImageURL === '') {
    return null;
  }

  return (

    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >

      <Grid item xs={4} />
      <Grid item xs={8}>
        <Typography variant="h2" style={{ fontWeight: 'bold' }} align="center">
          placeholder
        </Typography>
        <Grid item xs={8}>
          <Typography variant="h2" style={{ fontWeight: 'bold' }} align="center">
            RATE ME!
          </Typography>
        </Grid>
        <ImageList sx={{ width: 550, height: 550 }} cols={1}>
          <ImageListItem key="some unique key">
            <img
              src={randImageURL}
              alt="random title"
              loading="lazy"
              style={{
                objectFit: 'contain',
                width: 550,
                height: 550,
              }}
            />
          </ImageListItem>
        </ImageList>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            /* defaultValue = {value} --> maybe this takes the value
            from before and shows it with the next picture
            TODO: adjust size, doesn't work yet */
            size="large"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 3 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
      </Grid>
    </Grid>

  );
}

export default Home;
