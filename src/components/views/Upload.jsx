import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import for ref in firebase, getDownloadURL return url to access the image
import {
  ref, uploadBytes, getDownloadURL, getStorage,
} from 'firebase/storage';

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

import axios from 'axios';
import { api, handleError } from '../../helpers/api';
import FormField from './FormField';
import BaseContainer from '../ui/BaseContainer';
import { getDomain } from '../../helpers/getDomain';

function uploadFile(file, title, category, location) {
  document.cookie = 'userId=1';
  const storage = getStorage();
  // defines the name of the image => uploaded image.png stays the same
  const fileName = file.name;
  // will put the file to images, the name is given by the userId and the timestamp
  const timestamp = Date.now().toString();
  console.log('Time of upload', timestamp);
  // get id out of local storage
  const id = localStorage.getItem('id');
  // create the timestamp in this format: id_timestamp_NameOfPicture
  const fileNameToStore = id.concat('_', timestamp.toString());
  const fileNameToStoreTimestamp = fileNameToStore.concat('_', fileName.toString());
  console.log('fileNameToStore:', fileNameToStoreTimestamp);
  // store in storage
  const fileRef = ref(storage, `images/${fileNameToStoreTimestamp}`);

  uploadBytes(fileRef, file).then(

    // successfully uploaded

    (snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        // write this to database
        // return URL of the image

        console.log('File available at', downloadURL);
        console.log('title', title);
        console.log('cat', category);
        console.log('loca', location);
        const name = title;
        const storageLink = downloadURL;
        const requestBody = JSON.stringify({
          name,
          location,
          storageLink,
        });
        console.log('Request:', requestBody);
        localStorage.setItem('userId', '1');

        const authAxios = axios.create({
          baseURL: getDomain(),
          header: { userId: '1' },

        });
        console.log('Header:', authAxios());
        const response = authAxios.post('/imagesTemp', requestBody);
      });
      console.log('Uploaded a blob or file!');
      // Store the new downloadURL together with credentials in Databse:
    },

    // error

    (error) => {
      console.log(`error => ${error}`);
    },

  );
}

// TODO: fetch categories from backend
const CATEGORIES = [
  { value: 'Autos', name: 'Autos' },
  { value: 'Katzen', name: 'Katzen' },
  { value: 'Hunde', name: 'Hunde' },
  { value: 'New', name: '...suggest new category' },
];

function Upload() {
  const [selectedFile, setFile] = useState(null);
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Autos');
  const [location, setLocation] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategorySuggestion, setNewCategorySuggestion] = useState('');

  const doUpload = async () => {
    try {
      // formerly: isRegistrationProcess: for server to decide how to handle passed object (login or registration process)
      const requestBody = JSON.stringify({
        title,
        category,
        location,
      });

      const response = await api.post('/upload', requestBody);

      // Get the returned user and update a new object.

      // Login successfully worked --> navigate to the route /pictures
      history.push('/pictures');
    } catch (error) {
      alert(`Something went wrong during the creation of your picture: \n${handleError(error)}`);
    }
  };

  const handleSubmitNewCategory = () => {
    // TODO: make api call to backend to submit new category suggestion
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

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
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
              onChange={(e) => setFile(e.target.files[0])}
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
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                uploadFile(selectedFile, title, category, location);
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
              To suggest new cateogry enter text below and press `&quot;`submit request`&quot;` button.
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
      </Grid>
    </Grid>
  );
}

export default Upload;
