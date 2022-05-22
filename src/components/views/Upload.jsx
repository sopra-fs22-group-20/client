import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import for ref in firebase, getDownloadURL return url to access the image
import {
  ref, uploadBytes, getDownloadURL, getStorage,
} from 'firebase/storage';
import AccordionDetails from '@mui/material/AccordionDetails';
import 'styles/mapbox-gl.css';

import 'styles/ui/mapContainer.scss';
import {
  Grid,
  Typography,
  Button,
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
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import mapboxgl from '!mapbox-gl';
import { mapboxAccessToken } from '../../helpers/mapboxConfig';
import { api, handleError } from '../../helpers/api';
import FormField from './FormField';
import BaseContainer from '../ui/BaseContainer';
import { getDomain } from '../../helpers/getDomain';
import {
  MailUsername, MailPassword, MailTo, MailFrom,
} from '../../helpers/mailCredentials';

// TODO: fetch categories from backend
const CATEGORIES = [
  { value: 'Car', name: 'Car' },
  { value: 'Cat', name: 'Cat' },
  { value: 'Dog', name: 'Dog' },
  { value: 'Fish', name: 'Fish' },
  { value: 'Motorcycle', name: 'Motorcycle' },
  { value: 'New', name: '...suggest new category' },
];

function Upload() {
  const [selectedFile, setFile] = useState(null);
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Autos');
  const [coordinates, setCoordinates] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategorySuggestion, setNewCategorySuggestion] = useState('');
  const [cookies, _setCookie] = useCookies(['userId']);
  const [success, setSuccess] = useState(false);
  // const for map api

  mapboxgl.accessToken = mapboxAccessToken;

  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(8.5);
  const [lat, setLat] = useState(47);
  const [zoom, setZoom] = useState(5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([8.5, 47])
      .addTo(map);
    function onDragEnd() {
      console.log(marker._lngLat);
      setCoordinates(marker._lngLat);
      console.log(coordinates);
    }

    marker.on('dragend', onDragEnd);

    // Clean up on unmount
  }, []);
  // Create a storage reference from our storage service
  const storage = getStorage();

  const doUpload = async () => {
    try {
      // formerly: isRegistrationProcess: for server to decide how to handle passed object (login or registration process)
      const requestBody = JSON.stringify({
        title,
        category,
        location: coordinates,
      });

      const response = await api.post('/upload', requestBody);
    } catch (error) {
      alert(`Something went wrong during the creation of your picture: \n${handleError(error)}`);
    }
  };

  const uploadFile = () => {
    // defines the name of the image => uploaded image.png stays the same
    const fileName = selectedFile.name;
    // will put the file to images, the name is given by the userId and the timestamp
    const timestamp = Date.now().toString();
    console.log('Time of upload', timestamp);
    // get id out of local storage
    const { id: userId } = cookies;
    // create the timestamp in this format: id_timestamp_NameOfPicture
    const fileNameToStore = userId.concat('_', timestamp.toString());
    const fileNameToStoreTimestamp = fileNameToStore.concat('_', fileName.toString());
    console.log('fileNameToStore:', fileNameToStoreTimestamp);
    // store in storage
    const fileRef = ref(storage, `images/${fileNameToStoreTimestamp}`);

    uploadBytes(fileRef, selectedFile).then(

      // successfully uploaded

      (snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          // write this to database
          // return URL of the image

          console.log('File available at', downloadURL);
          console.log('title', title);
          console.log('cat', category);
          console.log('loca', coordinates);
          const name = title;
          const storageLink = downloadURL;
          const location = JSON.stringify(coordinates);
          console.log(typeof location);

          console.log('locationString', location);

          const requestBody = JSON.stringify({
            name,
            location,
            storageLink,
            category,
          });
          console.log('Request:', requestBody);

          const authAxios = axios.create({
            baseURL: getDomain(),
            headers: { userId, 'Content-Type': 'application/json' },

          });
          console.log('Header:', authAxios());
          console.log(userId);
          const response = await authAxios.post('/images', requestBody);
          console.log(response);
          setSuccess(true);
        });
        console.log('Uploaded a blob or file!');
        // Store the new downloadURL together with credentials in Databse:
      },

      // error

      (error) => {
        console.log(`error => ${error}`);
      },

    );
  };

  const handleSubmitNewCategory = () => {
    // TODO: make api call to backend to submit new category suggestion
    // use Id to indetify the user
    const { id: userId } = cookies;
    const empty = '';
    const mailMessageBody = empty.concat('A suggestion came from user with id: ', userId.toString());

    const Email = {
      send(a) { return new Promise((n, e) => { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = 'Send'; const t = JSON.stringify(a); Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, (e) => { n(e); }); }); }, ajaxPost(e, n, t) { const a = Email.createCORSRequest('POST', e); a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'), a.onload = function () { const e = a.responseText; t != null && t(e); }, a.send(n); }, ajax(e, n) { const t = Email.createCORSRequest('GET', e); t.onload = function () { const e = t.responseText; n != null && n(e); }, t.send(); }, createCORSRequest(e, n) { let t = new XMLHttpRequest(); return 'withCredentials' in t ? t.open(e, n, !0) : typeof XDomainRequest !== 'undefined' ? (t = new XDomainRequest()).open(e, n) : t = null, t; },
    };
    Email.send({
      Host: 'smtp.gmail.com',
      Username: MailUsername,
      Password: MailPassword,
      To: MailTo,
      From: MailFrom,
      Subject: mailMessageBody,
      Body: newCategorySuggestion,
    }).then(
      (message) => alert(message),
    );

    setIsNewCategory(false);
  };

  const handleSetCategory = (event) => {
    const newValue = event.target.value;
    if (newValue === 'New') {
      setIsNewCategory(true);
    }
    setCategory(event.target.value);
  };

  if (CATEGORIES.length === 0) {
    return null;
  }
  function imageValidate(e) {
    const { name } = e.target.files[0];
    const ext = name.split('.')[1];
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'jfif') {
      setFile(e.target.files[0]);
    } else {
      alert('Input only image files');
    }
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      style={{ background: '#e8e2e2' }}
    >
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Typography variant="h2" style={{ fontWeight: 'bold' }} align="center">
              Upload
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <p align="center">
              On this page, you can upload a new picture to RateMe!
            </p>

          </Grid>
        </Grid>
        {success && (
        <div>
          <Alert onClose={() => setSuccess(false)}>
            {' '}
            <Typography variant="h5" style={{ fontWeight: 'bold' }} align="center">
              You have successfully uploaded a picture!
            </Typography>
          </Alert>
        </div>
        )}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: '30px' }}
          spacing={2}
        >

          <Grid item xs={12}>
            <Typography variant="h2" style={{ fontWeight: 'bold' }} align="center">
              Select image
            </Typography>
          </Grid>
          <Grid item>
            <input
              type="file"
              accept="image/*"
              onChange={imageValidate}
              multiple={false}
              style={{
                margin: 'auto',
                display: 'block',
              }}
            />
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(event) => handleSetCategory(event)}
              >
                {
                    CATEGORIES.map((x, index) => (
                      <MenuItem value={x.value} key={`${index}_value`}>
                        {x.name}
                      </MenuItem>
                    ))
                  }
              </Select>
            </FormControl>

          </Grid>
          <Grid item>
            <TextField
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Location"
              value={coordinates}
              disabled="true"
              onChange={(event) => setCoordinates(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                uploadFile(selectedFile, title, category, coordinates);
              }}
              disabled={selectedFile === null || title === '' || category === ''}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
        <Dialog open={isNewCategory} onClose={() => setIsNewCategory(false)}>
          <DialogTitle>Suggest new category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To suggest new category enter text below and press `&quot;`submit request`&quot;` button.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New category"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => setNewCategorySuggestion(event.target.value)}
              value={newCategorySuggestion}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsNewCategory(false)}>Cancel</Button>
            <Button onClick={handleSubmitNewCategory}>Submit request</Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={12}>
          <Typography variant="h2" style={{ fontWeight: 'bold' }} align="center">
            Select Location (optional)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AccordionDetails style={{ overflow: 'hidden' }}>
            <div ref={mapContainerRef} className="map-container" />

          </AccordionDetails>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Upload;
