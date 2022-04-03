import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
        <div className="login container">
          <div
            className="login form"
            style={{
              height: '400px',
            }}
          >
            <FormField
              label="Username"
              value={title}
              onChange={(un) => setTitle(un)}
            />
            <FormField
              label="email"
              value={category}
              onChange={(n) => setCategory(n)}
              type="email"
            />
            <FormField
              label="password"
              value={location}
              onChange={(n) => setLocation(n)}
              type="password"
            />
            <div className="login button-container">
              <Button
                disabled={!title || !category || !location}
                width="100%"
                onClick={() => doUpload()}
              >
                Sign up and Login
              </Button>
            </div>
          </div>
          {
                    // adds link element/component under the login component
                }
          <Link to="/login">Back to Login</Link>
        </div>
      </BaseContainer>
    </div>
  );
}

export default Upload;
