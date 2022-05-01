import React, { useCallback, useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
import 'styles/views/Game.scss';
import { useHistory } from 'react-router-dom';
import {
  Grid, ImageList, ImageListItem, Rating, Typography,
} from '@mui/material';
import axios, { Axios } from 'axios';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useCookies } from 'react-cookie';
import { getDomain } from '../../helpers/getDomain';

function Home() {
  // TODO: imageURL is directly there when rendering
  const [randImageURL, setRandImageURL] = useState('');
  const [imageId, setImageId] = useState(null); // TODO: maybe type string;
  const [rating, setRating] = React.useState(0); // TODO: fix number
  const [hover, setHover] = React.useState(0);
  const [cookies, _setCookie] = useCookies(['id']);

  const labels = {
    1: 'Ewwww!',
    2: 'Ewwwish..',
    3: 'Hmmm',
    4: 'Nice',
    5: 'Awesome!',
  };

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchRandomPictureURL() {
      try {
        const response = await api.get('/images'); // TODO: specify call to backend

        // const response = 'https://images.dog.ceo//breeds//malinois//n02105162_10076.jpg';
        // const response = 'https://ik.imagekit.io/ikmedia/women-dress-2.jpg';
        // eslint-disable-next-line
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned image URL and update the state.
        const randomImage = response.data;
        setImageId(randomImage.imageId);
        setRandImageURL(randomImage.storageLink);
      } catch (error) {
        console.error(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error('Details:', error);
        alert('Something went wrong while fetching the images! See the console for details.');
      }
    }
    /*    const downloadPicture = async () => {
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
    }; */

    fetchRandomPictureURL(); // TODO: or better const url = ....
    // downloadPicture(randImageURL)
  }, [rating]);

  const content = <Spinner />; // TODO: exchange with logo/animation

  if (randImageURL === '') {
    return null;
  }

  const rateImage = (newRatingValue) => {
    const { id: userId } = cookies;
    const requestBody = JSON.stringify({
      imageId,
      rating: newRatingValue,
    });
    const authAxios = axios.create({
      baseURL: getDomain(),
      headers: { userId, 'Content-Type': 'application/json' },
    });

    authAxios.put('/rate', requestBody);

    /*
  rating
  header: userId
  requestBody: ImageId, rating (int)
  */
  };

  // does the function call work or could it be that the rating (value via setValue) is not yet updatet?

  return (

    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >

      {/* left side of screen: columns with categories, game */}
      <Grid item xs={7}>
        <Typography variant="h2" style={{ fontWeight: 'bold' }} align="center">
          placeholder
        </Typography>
      </Grid>

      {/* right side of screen: columns with picture, rating */}
      <Grid
        item
        xs={5}
      >
        <Grid
          container
          rowSpacing={2}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          style={{
            height: 'calc(100vh - 90px)',
          }}
        >

          <Grid
            item
            style={{
              height: '10%',
            }}
          >
            <Typography variant="h2" style={{ fontWeight: 'bold' }} align="center">
              RATE ME!
            </Typography>
          </Grid>

          <Grid
            item
            style={{
              height: '75%',
            }}
          >
            {
              /*
              <div>test</div>

               */
            }
            <ImageList sx={{ width: 1, height: 1 }} cols={1} align="center">
              <ImageListItem
                key="some unique key"
                style={{
                  objectFit: 'contain',
                  height: '100%',
                  maxHeight: '100%',
                  maxWidth: '100%',
                  minHeight: '100%',
                }}
              >
                <img
                  src={randImageURL}
                  alt="random title"
                  loading="lazy"
                  style={{
                    objectFit: 'contain',
                    height: '100%',
                    maxHeight: '100%',
                    minHeight: '100%',
                  }}
                />
              </ImageListItem>
            </ImageList>

          </Grid>

          <Grid
            item
            style={{
              height: '15%',
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              style={{
                height: '100%',
              }}
            >

              <Grid
                item
                style={{
                  height: '80%',

                }}

              >

                <Rating
                  name="hover-feedback"
      /* defaultValue = {value} --> maybe this takes the value
      from before and shows it with the next picture
      TODO: adjust size, doesn't work yet */
                  align="center"
                  value={0}
                  onChange={(event, newValue) => {
                    setRating(newValue); rateImage(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55, fontSize: '3vw' }} />}
                  icon={<StarIcon style={{ opacity: 0.55, fontSize: '3vw' }} />}
                />
              </Grid>
              <Grid item style={{ paddingTop: '0px', height: '20%' }}>
                <div>
                  {labels[hover]}

                  {/* TODO: maybe fix : rating as there might otherwise show the previously assigned rating value with the next picture */}

                </div>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}

export default Home;
