import React, { useEffect, useRef, useState } from 'react';
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
  DialogContent, DialogContentText, DialogActions, ImageList, ImageListItem, Rating, Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import { api, handleError } from '../../helpers/api';
import { Spinner } from '../ui/Spinner';
import mapboxgl from '!mapbox-gl';
import { mapboxAccessToken } from '../../helpers/mapboxConfig';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DisplayImage({
  image,
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

        <Grid item xs={12}>

          <Item>
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
          </Item>
        </Grid>

      </Grid>
      <br />
    </Box>

  );
}

function Highlights() {
  const [category, setCategory] = useState('Car');
  const [loading, setLoading] = useState(true);
  const [highlights, setHighlights] = useState({ podest1: null, podest2: null, podest3: null });
  const { podest1, podest3, podest2 } = highlights;
  const [catArray, setCatArray] = useState([]);
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
        const response = await api.get(`/images/highlights/${category}`);

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
  }, [category]);

  useEffect(() => {
    async function fetchCat() {
      try {
        const categoryArray = await api.get('/categories');
        setCatArray(categoryArray.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCat();
  }, []);

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
    setCategory(e.target.value);
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
          <select onChange={changeCat} value={category} name="cars" id="cars">
            {catArray.filter((item) => item.name !== 'Random').map((item) => <option selected value={item.name}>{item.name}</option>)}

          </select>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <br />
            <br />
            {podest2 ? (
              <Link to={podest2 ? `/profilepage/${podest2.owner.userId}` : '/profilepage'}>
                {' '}
                Username:
                {' '}
                { podest2.owner.username }
              </Link>
            ) : 'Placeholder'}
            <div className="podestRating">
              <Typography component="legend">
                <p>
                  Number of Ratings:
                  {' '}
                  {podest2 ? podest2.ratingCounter : '0'}
                </p>
              </Typography>
              <Rating name="read-only" value={podest2 ? podest2.rating : 0} readOnly size="large" />
            </div>
            <Item>
              <img
                style={{ objectFit: 'contain', width: '100%' }}
                src={podest2 ? podest2.storageLink : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}
                height={250}
                alt="new"
              />
            </Item>

            {podest2.location && <DisplayImage image={podest2} />}

            <img src="/images/SecondPodest.png" className="PodestImage" />
          </Grid>
          <Grid item xs={4}>
            <div className="podest1">
              {podest1 ? (
                <Link to={podest1 ? `/profilepage/${podest1.owner.userId}` : '/profilepage'}>
                  {' '}
                  Username:
                  {' '}
                  { podest1.owner.username }
                </Link>
              ) : 'Placeholder'}

              <div className="podestRating">
                <Typography component="legend">
                  <p>
                    Number of Ratings:
                    {' '}
                    {podest1 ? podest1.ratingCounter : '0'}
                  </p>
                </Typography>
                <Rating name="read-only" value={podest1 ? podest1.rating : 0} readOnly size="large" />
              </div>

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

            {podest1.location && <DisplayImage image={podest1} />}

            <img src="/images/FirstPodest.png" className="PodestImage" />

          </Grid>
          <Grid item xs={4}>
            <br />
            <br />
            <br />
            <br />
            {podest3 ? (
              <Link to={podest3 ? `/profilepage/${podest3.owner.userId}` : '/profilepage'}>
                {' '}
                Username:
                {' '}
                { podest3.owner.username }
              </Link>
            ) : 'Placeholder'}

            <div className="podestRating">
              <Typography component="legend">
                <p>
                  Number of Ratings:
                  {' '}
                  {podest3 ? podest3.ratingCounter : '0'}
                </p>
              </Typography>
              <Rating name="read-only" value={podest3 ? podest3.rating : 0} readOnly size="large" />
            </div>

            <Item>
              <img
                style={{ objectFit: 'contain', width: '100%' }}
                src={podest3 ? podest3.storageLink : 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg'}
                height={250}

                alt="new"
              />
            </Item>

            {podest3.location && <DisplayImage image={podest3} />}

            <img src="/images/ThirdPodest.png" className="PodestImage" />

          </Grid>
        </Grid>
      </Box>
    )
  );
}

export default Highlights;
