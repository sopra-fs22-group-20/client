import Settings from './Settings';

import { useEffect, useState } from 'react';

import { api, handleError } from 'helpers/api';

import { Spinner } from 'components/ui/Spinner';
import { useHistory, useParams } from 'react-router-dom';
import BaseContainer from 'components/ui/BaseContainer';

import 'styles/views/Game.scss';
import PropTypes from 'prop-types';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ButtonGroup from '@mui/material/ButtonGroup';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useCookies } from 'react-cookie';
import User from '../../models/User';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// <img src={Omar} height={100} width={100}/>

function ProfilePage() {
  const history = useHistory();

  const [value, setValue] = React.useState(2);
  const [user, setUser] = useState(1); // Am Anfang ist User Null. Mit SetUser habe ich eine Funktion, die die Data vom Backend dem User zuweist. User ist hier wie ein Container. Wenn ich die Seite wechsle ist es wieder Null. Nur lokal.
  const [cookies, _setCookie] = useCookies(['userId']);
  const EditProfile = async (userId) => {
    try {
      // const token = localStorage.getItem('token');

      // const requestBody = JSON.stringify({ token });

      // const response = await api.post(`/users/editRights/${userId}`, requestBody);// checks rights to edit the selected profile. INSTEAD OF URLA2 pu userid

      // const user = new User(response.data);
      // history.push(`/EditModus/`);
      // history.push(`/Settings/${user.id}`);
      history.push('/Settings');
    } catch (error) {
      alert(`Something went wrong during the profileEdit: \n${handleError(error)}`);
    }
  };

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const { id: userId } = cookies;
        const response = await api.get(`/users/${userId}`, { headers: { userId } });

        // Get the returned profile
        setUser(response.data);
        // console.log("User has been set");
      } catch (error) {
        console.error(`Something went wrong while fetching the User: \n${handleError(error)}`);
        console.error('Details:', error);
        alert('Something went wrong while fetching the User! See the console for details.');
      }
    }

    fetchData();
  }, []);

  return (
    <main>
      <div>
        <Container maxWidth="sm">
          <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
            Welcome Aleks!

          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <Item>
                  Stats:
                  {' '}
                  <br />
                  Member since:
                  {' '}
                  {user.creationDate}
                  {' '}
                  <br />
                  {' '}
                  {/* Instead of "Creation Date" write {user.creationDate} */}
                  4 Pictures posted
                  {' '}
                  <br />
                  {' '}
                  {/* Instead of "AverageRating" write {AverageRating} when its available */}

                  {/* Now comes the rating. Replace value with Rating_Average. 4.5 will be rounded to 5 */}
                  <Box
                    sx={{
                      '& > legend': { mt: 2 },
                    }}
                  >
                    <Typography component="legend">Your average Rating</Typography>
                    <Rating name="read-only" value={3} readOnly />
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item>
                  Social Media
                  {' '}
                  <br />
                  Instagram Account: @Aleks_04_2022
                </Item>
              </Grid>
            </Grid>
          </Box>
          <br />
          <Button variant="contained" onClick={() => { EditProfile(); }}>
            {' '}
            {/* instead of nothing put an argument with UserID */}
            Edit Profile
          </Button>

        </Container>
      </div>
    </main>

  );
}

export default ProfilePage;
