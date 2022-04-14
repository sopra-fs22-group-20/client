import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
// import for ref in firebase, getDownloadURL return url to access the image
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useCookies, setCookie } from 'react-cookie';
import axios from 'axios';
import { api, handleError } from '../../helpers/api';
import FormField from './FormField';
import { Button } from '../ui/Button';
import BaseContainer from '../ui/BaseContainer';
import { storage } from './firebase';
import { getDomain } from '../../helpers/getDomain';

function uploadFile(file, title, category, location) {
  document.cookie = 'userId=1';

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
          header: { 'userId': '1' },

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
function Upload() {
  const [selectedFile, setFile] = useState(null);
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

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
  return (
    <div>
      <h2>Upload</h2>
      <p>On this page, you can upload a new picture to RateMe!</p>
      <center>
        <h2>Select image</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          multiple={false}
        />
        <h2>Add credentials</h2>

        <FormField
          label="Title"
          value={title}
          onChange={(n) => setTitle(n)}
        />
        <FormField
          label="Category"
          value={category}
          onChange={(n) => setCategory(n)}
        />
        <FormField
          label="Location"
          value={location}
          onChange={(n) => setLocation(n)}
        />
        <button
          onClick={() => {
            uploadFile(selectedFile, title, category, location);
          }}
        >
          Upload
        </button>
      </center>
    </div>
  );
}

export default Upload;
