import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import for ref in firebase, getDownloadURL return url to access the image
import {
  getDownloadURL, getStorage, ref, uploadBytes,
} from 'firebase/storage';
import AccordionDetails from '@mui/material/AccordionDetails';
import 'styles/mapbox-gl.css';

import 'styles/ui/mapContainer.scss';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import mapboxgl from '!mapbox-gl';
import { mapboxAccessToken } from '../../helpers/mapboxConfig';
import { api, handleError } from '../../helpers/api';
import { getDomain } from '../../helpers/getDomain';
import {
  MailFrom, MailPassword, MailTo, MailUsername,
} from '../../helpers/mailCredentials';
import CustomSelect from '../ui/CustomSelect';

// TODO: fetch categories from backend

function Upload() {
  const [selectedFile, setFile] = useState(null);
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Car');
  const [coordinates, setCoordinates] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategorySuggestion, setNewCategorySuggestion] = useState('');
  const [cookies, _setCookie] = useCookies(['userId']);
  const [alertMessage, setAlertMessage] = useState({ message: '', type: '' });
  const [categories, setCategories] = useState([]);
  // const for map api

  mapboxgl.accessToken = mapboxAccessToken;

  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(8.5);
  const [lat, setLat] = useState(47);
  const [zoom, setZoom] = useState(5);

  // Initialize map when component mounts
  useEffect(() => {
    async function fetchCategories() {
      // Get the categories for the Selection dropdown menu
      const categoryArray = await api.get('/categories');
      setCategories(categoryArray.data);
    }
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
    fetchCategories();
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

          setAlertMessage({ message: 'Your pictures was successfully uploaded', type: 'success' });
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
    // use Id to indetify the user
    const { id: userId } = cookies;
    const empty = '';
    const mailMessageBody = empty.concat('A suggestion came from user with id: ', userId.toString());

    const Email = {
      send(a) { return new Promise((n, e) => { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = 'Send'; const t = JSON.stringify(a); Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, (e) => { n(e); }); }); }, ajaxPost(e, n, t) { const a = Email.createCORSRequest('POST', e); a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'), a.onload = function () { const e = a.responseText; t != null && t(e); }, a.send(n); }, ajax(e, n) { const t = Email.createCORSRequest('GET', e); t.onload = function () { const e = t.responseText; n != null && n(e); }, t.send(); }, createCORSRequest(e, n) { let t = new XMLHttpRequest(); return 'withCredentials' in t ? t.open(e, n, !0) : typeof XDomainRequest !== 'undefined' ? (t = new XDomainRequest()).open(e, n) : t = null, t; },
    };
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: MailUsername,
      Password: MailPassword,
      To: MailTo,
      From: MailFrom,
      Subject: mailMessageBody,
      Body: newCategorySuggestion,
    }).then(
      (message) => setAlertMessage({ message: 'You have successfully submitted a new Category. We will review it. Thank you.', type: 'info' }),
    ).catch(() => setAlertMessage({ message: 'We could not forward your category. There is a problem with the server.', type: 'error' }));

    setIsNewCategory(false);
  };

  const handleSetCategory = (event) => {
    if (event === 'New') {
      setIsNewCategory(true);
    }
    setCategory(event);
  };

  function imageValidate(e) {
    const { name } = e.target.files[0];
    const ext = name.split('.')[1];
    if (ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'jfif') {
      setFile(e.target.files[0]);
    } else {
      alert('Input only image files');
    }
  }

  const getCategories = (categoriesArray) => {
    let categoriesFiltered = categoriesArray.filter((x) => x.name !== 'Random').map((x) => ({
      ...x,
      value: x.name,
    }));
    categoriesFiltered = [{ value: '', name: '' }, ...categoriesFiltered, { value: 'New', name: '...suggest new category' }];
    return categoriesFiltered;
  };

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
        {alertMessage.message && (
        <div>
          <Alert severity={alertMessage.type} onClose={() => setAlertMessage({ message: '', type: '' })}>
            {' '}
            <Typography variant="h5" style={{ fontWeight: 'bold' }} align="center">
              {alertMessage.message}
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
            {
              (categories.length !== 0) ? (
                <CustomSelect
                  autoWidth
                  categories={getCategories(categories)}
                  label="Category"
                  value={category}
                  onChange={(event) => handleSetCategory(event)}
                  getMenuItemValue={(x) => x.value}
                />
              ) : null
}
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
              disabled
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
              To suggest new category enter text below and confirm with &quot;SUBMIT REQUEST&quot; button.
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
