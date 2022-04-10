import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import FormField from './FormField';
import { Button } from '../ui/Button';
import BaseContainer from '../ui/BaseContainer';

function Upload() {
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

      const response = await api.post('/pictures', requestBody);

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
      <BaseContainer>
        <div className="upload container">
          <div
            className="upload form"
            style={{
              height: '800px',
            }}
          >
            <FormField
              label="Title"
              value={title}
              onChange={(un) => setTitle(un)}
            />
            <FormField
              label="category"
              value={category}
              onChange={(n) => setCategory(n)}
            />
            <FormField
              label="location"
              value={location}
              onChange={(n) => setLocation(n)}
            />
            <div className="login button-container">
              <Button
                disabled={!title || !category || !location}
                width="100%"
                onClick={() => doUpload()}
              >
                Upload!
              </Button>
            </div>
          </div>
          {
                    // adds link element/component under the login component
                }
        </div>
      </BaseContainer>
    </div>
  );
}

export default Upload;
