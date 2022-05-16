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
  const [users, setUsers] = useState(null);
  const [images, setImages] = useState(null);
  const [cat, setCat] = useState('Car');
  const [products, setProducts] = useState([]);
  const [cookies, _setCookie] = useCookies(['id']);
  // Send the requesat whenever component is loaded

  /* useEffect(() => {
    axios.get(`http://localhost:8080/images/highlights/${cat}`).then((response) => {
      setProducts(response.data);
    }).catch((error) => {

    });
  }, [cat]);
*/

  console.log('products', products);

  useEffect(() => {
    async function fetchPictures() {
      try {
        const response = await api.get(`/images/highlights/${cat}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setProducts(response.data);

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

  const i = 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>

        <Grid item xs={1}>
          Categories:
          <br />
          <br />
          <label htmlFor="cars">Choose a Category:</label>

          <select onChange={changeCat} name="cars" id="cars">
            <option selected value="Car">Car</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Fish">Fish</option>
            <option value="Motorcycle">Motorcycle</option>

          </select>
        </Grid>

        {products ? products.map((item) => (
          <>
            <Grid item xs={3}>
              <p>
                Username:
                {' '}
                {item.owner.username}
              </p>
              <p>
                Number of Ratings:
                {' '}
                {item.ratingCounter}
              </p>

              <br />
              <Rating name="read-only" value={item.rating} readOnly size="large" />
              <img
                style={{ objectFit: 'contain', width: '100%' }}
                src={item.storageLink}
                height={200}
              />

              <p />
            </Grid>

            <br />

          </>

        )) : null }

      </Grid>
    </Box>
  );
}

export default Highlights;
