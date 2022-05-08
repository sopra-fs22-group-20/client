import React from 'react';
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Highlights() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <p>
            Categories:
            <br />
            <br />
            Username: dog_lover99
          </p>
          <Item>
            <img
              style={{ objectFit: 'contain', width: '100%' }}
              src="https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F1_1652038130845_mutprobe-der-kia-ev6.jpg?alt=media&token=e6765cb2-a6c2-41d5-b653-8c9ab219b0fe"
              height={250}

              alt="new"
            />
          </Item>
          <Typography component="legend">
            <p>
              Number of Ratings: 16
            </p>
          </Typography>
          <Rating name="read-only" value={4} readOnly size="large" />
        </Grid>
        <Grid item xs={4}>
          <p>
            Username: dog_lover99
          </p>
          <Item>
            <img
              style={{ objectFit: 'contain', width: '100%' }}
              src="https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F1_1652038130845_mutprobe-der-kia-ev6.jpg?alt=media&token=e6765cb2-a6c2-41d5-b653-8c9ab219b0fe"
              height={250}

              alt="new"
            />
          </Item>
          <Typography component="legend">
            <p>
              Number of Ratings: 16
            </p>
          </Typography>
          <Rating name="read-only" value={4} readOnly size="large" />
        </Grid>
        <Grid item xs={4}>
          <p>
            <br />
            <br />
            <br />
            <br />
            Username: dog_lover99
          </p>
          <Item>
            <img
              style={{ objectFit: 'contain', width: '100%' }}
              src="https://firebasestorage.googleapis.com/v0/b/ratem-482b2.appspot.com/o/images%2F1_1652038130845_mutprobe-der-kia-ev6.jpg?alt=media&token=e6765cb2-a6c2-41d5-b653-8c9ab219b0fe"
              height={250}

              alt="new"
            />
          </Item>
          <Typography component="legend">
            <p>
              Number of Ratings: 16
            </p>
          </Typography>
          <Rating name="read-only" value={4} readOnly size="large" />
        </Grid>
        <Grid item xs={4}>
          <Item>
            <p>
              Podest Number 2
            </p>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <p>
              Podest Number 1
            </p>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <p>
              Podest Number 3
            </p>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Highlights;
