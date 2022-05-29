import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { api, handleError } from '../../helpers/api';
import User from '../../models/User';
import { getDomain } from '../../helpers/getDomain';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Sopra Group 20 © '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}
let counter = 1;

function Login() {
  const history = useHistory();
  const [_cookies, setCookie] = useCookies(['id', 'token']);
  const theme = createTheme();

  const doLogin = async (username, password) => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post('/login', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      setCookie('id', user.userId, { path: '/' });
      setCookie('token', user.token, { path: '/' });
      setCookie('userData', user, { path: '/' });
      // Login successfully worked --> navigate to the route /home in the HomeRouter
      history.push('/home');
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),

    });
    doLogin(data.get('username'), data.get('password'));
  };

  const doClass = async () => {
    const userId = 1;
    const authAxios = axios.create({
      baseURL: getDomain(),
      headers: { userId, 'Content-Type': 'application/json' },
    });
    const imageId = counter;
    console.log(counter);
    const classification = 'A';
    const requestBody1 = JSON.stringify({
      imageId,
      classification,
    });
    counter += 2;
    const response1 = await authAxios.put('/classification', requestBody1);
    console.log(response1);
  };

  const demoSetup = async () => {
    const car = [
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F11.jpg?alt=media&token=a4e2e957-bcf9-4bd8-b9dc-3472e111be47',
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F12.jpg?alt=media&token=97f2a308-15c1-463a-ad65-463e301e53f0',
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F13.jpg?alt=media&token=c7d60fbb-08ba-429b-9f01-a07a950cb7ac',
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F14.jpg?alt=media&token=4a03e14c-a5f6-4226-acad-bff93bbd18ad',
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F15.jpg?alt=media&token=6a65e7e3-f520-4c97-adff-cf2989fbdf16',
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F16.jpg?alt=media&token=8b11dabd-bff3-476d-8edd-826c70c637f8',
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F17.jpg?alt=media&token=f74d255d-1e50-4a37-ba91-5b09236f6244',
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F18.jpg?alt=media&token=cb0afafa-ad84-49d6-816e-eb5ff4fc2b12',
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F19.jpg?alt=media&token=29aaa507-e6b1-40a6-9138-7e609c290207',
      'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F20.jpg?alt=media&token=89274253-1c98-4b3b-a64a-70ecc2d2d387'];
    car.forEach(async (x, i) => {
      const name = i.toString();
      const userId = 1;
      const category = 'Car';
      const storageLink = x;
      const location = JSON.stringify('');

      const requestBody = JSON.stringify({
        name,
        location,
        storageLink,
        category,
      });
      const authAxios = axios.create({
        baseURL: getDomain(),
        headers: { userId, 'Content-Type': 'application/json' },
      });
      const response = await authAxios.post('/images', requestBody);
      console.log(response);

      if (i % 2 === 1) {
        doClass();
      }
    });

    const motorcycle = ['https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F8.jpg?alt=media&token=beeac06d-249e-46b1-ae2b-c9c12f6a1ce7', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F5.jpg?alt=media&token=debebe5b-d3c4-483c-a088-205f374b5a2b', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F9.jpg?alt=media&token=df35e95b-5eaf-4dec-97ea-983e04c15a0f', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F3.jpg?alt=media&token=46c9de2a-14a1-429f-aaa0-915f1b23dfe5', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F10.jpg?alt=media&token=65bf1fa2-86ce-48f9-9ae1-69bec3036ec3', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F2.jpg?alt=media&token=7c298dd5-ebb8-46d8-b097-8410b32efe59', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F4.jpg?alt=media&token=77d36c69-773f-42e4-86de-523a243dbfaf', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F7.jpg?alt=media&token=db3df500-9b19-4d98-a70f-1a27d4bea939', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F6.jpg?alt=media&token=30239032-857e-4284-acf2-b6d9528c98b4', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F1.jpg?alt=media&token=ecdaca75-9686-4d1d-a0a1-639dc4a47be3'];
    motorcycle.forEach(async (x, i) => {
      const name = i.toString();
      const userId = 1;
      const category = 'Motorcycle';
      const storageLink = x;
      const location = JSON.stringify('');

      const requestBody = JSON.stringify({
        name,
        location,
        storageLink,
        category,
      });
      const authAxios = axios.create({
        baseURL: getDomain(),
        headers: { userId, 'Content-Type': 'application/json' },
      });
      const response = await authAxios.post('/images', requestBody);
      console.log(response);

      if (i % 2 === 1) {
        doClass();
      }
    });

    const fish = ['https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch7.jpg?alt=media&token=85b273dd-c0ee-40eb-a7b4-1433cbf71755', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch10.jpg?alt=media&token=f9f984a7-59c1-470e-8ace-be44c8caa2b1', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch4.jpg?alt=media&token=7fe4fae6-e800-48cf-8cbb-604b5e6cf2a1', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch5.jpg?alt=media&token=3a272989-df58-4f03-821d-1533955072ef', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch1.jpg?alt=media&token=068ff19e-07c4-4838-aeab-1daabe1e6af4', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch8.jpg?alt=media&token=ee114cd2-1686-408b-9f29-72c8d3cd496d', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch10.webp?alt=media&token=893a60c9-97e1-4b3b-b9e9-3f955de21b8d', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch17.jpg?alt=media&token=1840c71e-0a5c-454c-a077-738836ffa306', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch19.jpg?alt=media&token=c8598a60-6994-44a0-85df-3c82e28baf5a', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch11.jpg?alt=media&token=f996fea5-0601-4981-9059-0731e2f82d61', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch13.jpg?alt=media&token=0152dee7-6997-467f-956d-14a597bba58c', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch3.jpg?alt=media&token=c5c4c751-cbbb-48b3-a128-1d36d735491b', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch6.jpg?alt=media&token=9efbf0ae-056a-4b1b-bc00-9da28063d3a7', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch2.jpg?alt=media&token=865fe4f9-d9a3-4877-b7b4-ccd6e0c511f7', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch16.jpg?alt=media&token=e8ae1ac8-151b-4c18-a9c8-9acfbf9af462', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch18.webp?alt=media&token=1241c57b-d818-4031-8d83-49413f14d0a2', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch15.jpg?alt=media&token=87b78fd8-b4c4-4dfb-9fdc-f95d63dc2215', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch9.jpg?alt=media&token=43d3b3a6-9c86-4551-8410-9db859b0441e', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch14.jpg?alt=media&token=21efe58d-8cc8-4d5d-9303-c82390211d42', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch20.jpg?alt=media&token=bb98087e-edb0-4435-8eb5-3c6d301225c5', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FFisch12.jpg?alt=media&token=77534176-576e-4693-af47-d8e90ff3cc0f'];
    fish.forEach(async (x, i) => {
      const name = i.toString();
      const userId = 1;
      const category = 'Fish';
      const storageLink = x;
      const location = JSON.stringify('');

      const requestBody = JSON.stringify({
        name,
        location,
        storageLink,
        category,
      });
      const authAxios = axios.create({
        baseURL: getDomain(),
        headers: { userId, 'Content-Type': 'application/json' },
      });
      const response = await authAxios.post('/images', requestBody);
      console.log(response);

      if (i % 2 === 1) {
        doClass();
      }
    });

    const dog = ['https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund8.jpg?alt=media&token=4a7f5721-c5fb-4056-9943-2c8567f9fb38', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund1.webp?alt=media&token=9b5df9f4-7de1-46e7-9c30-8ad8ced552e7', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund12.jpg?alt=media&token=8bc10bb5-1582-4b4c-9768-be8a23c65e77', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund14.jpg?alt=media&token=265d396b-8b14-4f37-96b2-4b03e3f00fdb', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund9.jpg?alt=media&token=1bfae7aa-e178-4858-a593-6d3ac5823f3f', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund5.jpg?alt=media&token=d51ae968-37c4-472a-b263-0b3f5677c446', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund10.jpg?alt=media&token=9370b618-f35f-48ff-89ca-55c451a946c8', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund15.jpg?alt=media&token=5792f3fc-ebe7-4c71-b3f3-b0aeebb33e45', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund2.webp?alt=media&token=b087acfc-22b2-45d1-b2d1-b6d341d0b0c3', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund6.jpg?alt=media&token=020980a4-141b-49ad-a544-0851290b6ef5', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund13.jpg?alt=media&token=8c9212a5-681b-44f2-a87a-49d744492fad', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund11.jpg?alt=media&token=92c559c1-4342-4225-ac87-3a4f3106479c', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund7.jpg?alt=media&token=1de2c311-701b-4644-ab24-f726cdf034d9', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund4.jpg?alt=media&token=b1aeace1-99f5-4607-9a0d-7d59133dcad2', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FHund3.jpg?alt=media&token=5a91c1de-27c2-42ad-85d1-91dc08ea265c'];
    dog.forEach(async (x, i) => {
      const name = i.toString();
      const userId = 1;
      const category = 'Dog';
      const storageLink = x;
      const location = JSON.stringify('');

      const requestBody = JSON.stringify({
        name,
        location,
        storageLink,
        category,
      });
      const authAxios = axios.create({
        baseURL: getDomain(),
        headers: { userId, 'Content-Type': 'application/json' },
      });
      const response = await authAxios.post('/images', requestBody);
      console.log(response);

      if (i % 2 === 1) {
        doClass();
      }
    });

    const cat = ['https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze17.jpg?alt=media&token=25639d36-c27c-49bc-bd6e-f81301bac936', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze19.jpg?alt=media&token=7966277f-f587-487d-af01-ae1b8113b3dd', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze5.jpg?alt=media&token=afaae7cb-f5d4-4878-ba3b-5da735c1a06e', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze13.jpg?alt=media&token=8b8208b2-1541-43bb-891f-1f4770896631', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze2.jpg?alt=media&token=a3912679-6caa-4398-bf22-4ab7d1cd6f53', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze14.jpg?alt=media&token=08d054c3-2aa6-4f68-9dc6-e0e97f7f7e9b', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze4.jpg?alt=media&token=fd10abf1-ba0b-4d51-9358-21a8fc966cb9', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze7.jpg?alt=media&token=824c0f07-af7b-423b-a6bb-11bcf4feaa69', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze10.jpg?alt=media&token=28a3f4cb-28f6-4a0c-9901-3f16b2d3c5c6', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze6.jpg?alt=media&token=bb7b1686-91ce-4a5b-90ef-824404147322', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze9.jpg?alt=media&token=36612d64-357f-45ee-b6ab-181cc76df845', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze20.jpg?alt=media&token=2903e1b9-ae81-452f-bc47-43598d64120e', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze3.jpg?alt=media&token=119fccd8-ab6e-4f91-a548-8cf4f63b2b1f', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze16.jpg?alt=media&token=404e2a2b-2eb9-409c-8c3c-8e04873ae524', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze12.jpg?alt=media&token=aeef547f-134c-4eff-87fa-b38f7ba6858e', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze11.jpg?alt=media&token=98634093-2bc6-4257-ae5b-37394315dcb3', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze15.jpg?alt=media&token=e844649f-9105-441b-b3ea-392568d96010', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze18.jpg?alt=media&token=299a64a1-1a73-45bb-b9f8-022295ee089f', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze8.jpg?alt=media&token=f94074a5-7d4a-4450-91df-7f7743fbc437', 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2FKatze1.jpg?alt=media&token=03fafa73-e234-43fc-ac8c-3cff55e0f0f0'];
    cat.forEach(async (x, i) => {
      const name = i.toString();
      const userId = 1;
      const category = 'Cat';
      const storageLink = x;
      const location = JSON.stringify('');

      const requestBody = JSON.stringify({
        name,
        location,
        storageLink,
        category,
      });
      const authAxios = axios.create({
        baseURL: getDomain(),
        headers: { userId, 'Content-Type': 'application/json' },
      });
      const response = await authAxios.post('/images', requestBody);
      console.log(response);

      if (i % 2 === 1) {
        doClass();
      }
    });
  };

  /**
    const name = 'title';
    const userId = 1;
    const category = 'Fish';
    const storageLink = 'https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F17.jpg?alt=media&token=f74d255d-1e50-4a37-ba91-5b09236f6244';
    const location = JSON.stringify('');
    const requestBody = JSON.stringify({
      name,
      location,
      storageLink,
      category,
    });
    const authAxios = axios.create({
      baseURL: getDomain(),
      headers: { userId, 'Content-Type': 'application/json' },
    });
    const response = authAxios.post('/images', requestBody);
    console.log(response);
  };
*/
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://images5.alphacoders.com/423/thumb-1920-423474.jpg)',
            backgroundImage: 'url(https://www.hdcarwallpapers.com/walls/novitec_mclaren_620r_2021_5k_3-HD.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2>RATE ME!</h2>
            <Avatar sx={{ m: 1, bgcolor: 'red' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={demoSetup}
              >
                Demo Setup
              </Button>

              <Grid container>
                <Grid item>
                  <Link href="/Register" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
