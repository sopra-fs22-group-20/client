import React, { useEffect, useState } from 'react';
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
import { styled } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../ui/Spinner';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Highlights() {
  const [cat, setCat] = useState('Car');
  const [loading, setLoading] = useState(true);
  const [highlights, setHighlights] = useState({ podest1: null, podest2: null, podest3: null });
  const { podest1, podest3, podest2 } = highlights;
  // Send the requesat whenever component is loaded
  const history = useHistory();
  /* useEffect(() => {
    axios.get(`http://localhost:8080/images/highlights/${cat}`).then((response) => {
      setProducts(response.data);
    }).catch((error) => {

    });
  }, [cat]);
*/

  useEffect(() => {
    async function fetchPictures() {
      setLoading(true);
      try {
        const response = await api.get(`/images/highlights/${cat}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { data } = response;
        setHighlights({ podest1: data[0], podest2: data[1], podest3: data[2] });
        setLoading(false);
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
  }, [cat]);

  // fetching pictures
  /* useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
     async function fetchPictures() {
      try {
        const { id: userId } = cookies;
        const response = await api.get(`/images/highlights/${category}`);

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

  */

  // Update CAte from state
  const changeCat = (e) => {
    setCat(e.target.value);
    console.log('Selected', e.target.value);
  };

  /*
  let content = <Spinner />;

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
   */

  function goToProfile(userId) {
    history.push(`/profile/${userId}`);
  }

  return (
    loading ? <div>Loading</div> : (
      <Box sx={{ width: '100%' }}>
        <div>
          <label htmlFor="cars">Choose a Category:</label>
          <select onChange={changeCat} value={cat} name="cars" id="cars">
            <option selected value="Car">Car</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Fish">Fish</option>
            <option value="Motorcycle">Motorcycle</option>

          </select>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <br />
            <br />
            <Link to={podest2 ? `/profilepage/${podest2.owner.userId}` : '/profilepage'}>
              {' '}
              Username:
              {' '}
              {podest2 ? podest2.owner.username : 'PlaceHolder'}
            </Link>
            <Item>
              <img
                style={{ objectFit: 'contain', width: '100%' }}
                src={podest2 ? podest2.storageLink : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}
                height={250}
                alt="new"
              />
            </Item>
            <Typography component="legend">
              <p>
                Number of Ratings:
                {' '}
                {podest2 ? podest2.ratingCounter : '0'}
              </p>
            </Typography>
            <Rating name="read-only" value={podest2 ? podest2.rating : 0} readOnly size="large" />
          </Grid>
          <Grid item xs={4}>
            <div className="podest1">
              <Link to={podest1 ? `/profilepage/${podest1.owner.userId}` : '/profilepage'}>
                {' '}
                Username:
                {' '}
                {podest1 ? podest1.owner.username : 'PlaceHolder'}
              </Link>

              <img src="/images/Crown.png" className="podest1_crown" />
              <div />
            </div>

            <Item>
              <img
                style={{ objectFit: 'contain', width: '100%' }}
                src={podest1 ? podest1.storageLink : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}
                height={250}

                alt="new"
              />
            </Item>
            <Typography component="legend">
              <p>
                Number of Ratings:
                {' '}
                {podest1 ? podest1.ratingCounter : '0'}
              </p>
            </Typography>
            <Rating name="read-only" value={podest1 ? podest1.rating : 0} readOnly size="large" />
          </Grid>
          <Grid item xs={4}>
            <br />
            <br />
            <br />
            <br />
            <Link to={podest3 ? `/profilepage/${podest3.owner.userId}` : '/profilepage'}>
              {' '}
              Username:
              {' '}
              {podest3 ? podest3.owner.username : 'PlaceHolder'}
            </Link>
            <Item>
              <img
                style={{ objectFit: 'contain', width: '100%' }}
                src={podest3 ? podest3.storageLink : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}
                height={250}

                alt="new"
              />
            </Item>
            <Typography component="legend">
              <p>
                Number of Ratings:
                {' '}
                {podest3 ? podest3.ratingCounter : '0'}
              </p>
            </Typography>
            <Rating name="read-only" value={podest3 ? podest3.rating : 0} readOnly size="large" />
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p>
                Podest Number 2
              </p>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p>
                Podest Number 1
              </p>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p>
                Podest Number 3
              </p>
            </Item>
          </Grid>
        </Grid>
      </Box>
    )
  );
}

export default Highlights;
