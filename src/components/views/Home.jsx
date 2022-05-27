import React, {
  useCallback, useEffect, useRef, useState, useMemo,
} from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import BaseContainer from 'components/ui/BaseContainer';
import PropTypes from 'prop-types';
import 'styles/views/Game.scss';
import {
  Dialog,
  DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Divider,
  Grid, ImageList, ImageListItem, Rating, TextField, Typography, Zoom,
} from '@mui/material';
import axios, { Axios } from 'axios';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useCookies } from 'react-cookie';
import Lottie, { useLottie } from 'lottie-react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FlagIcon from '@mui/icons-material/Flag';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { getDomain } from '../../helpers/getDomain';
import CustomSelect from '../ui/CustomSelect';
import animation from '../../lotties/smash-an-egg.json';
import staranimation from '../../lotties/explosion.json';
import {
  MailFrom, MailPassword, MailTo, MailUsername,
} from '../../helpers/mailCredentials';

function Home() {
  // TODO: imageURL is directly there when rendering
  const [randImageURL, setRandImageURL] = useState('');
  const [imageId, setImageId] = useState(null); // TODO: maybe type string;
  const [rating, setRating] = React.useState(0); // TODO: fix number
  const [hover, setHover] = React.useState(0);
  const [cookies, _setCookie] = useCookies(['id']);
  const isMounted = useRef(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Random');
  const [isReport, setIsReport] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isLoadingNewPicture, setIsLoadingNewPicture] = useState(false);
  /*
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
*/
  const labels = {
    1: '🤮',
    2: '😕',
    3: '😐',
    4: '😁',
    5: '😍',
  };
  /*
const starAnimationOptions = {
  animationData: staranimation,
  autoplay: true,
};
const starAnimationStyle = {
  height: 'auto',
  width: 'auto',
};

const eggAnimationOptions = {
  animationData: animation,
  loop: true,
  autoplay: true,
};
const eggAnimationStyle = {

};
const { View } = useLottie(eggAnimationOptions, eggAnimationStyle);
*/
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchCategories() {
      // Get the categories for the Selection dropdown menu
      const categoryArray = await api.get('/categories');
      setCategories(categoryArray.data);
    }

    async function fetchFirstRandomPictureURL() {
      try {
        const { id: userId } = cookies;
        const authAxios = axios.create({
          baseURL: getDomain(),
          headers: { userId, 'Content-Type': 'application/json' },
        });
        // response = await authAxios.get('/images/random/c');

        const response = 'https://images.dog.ceo//breeds//malinois//n02105162_10076.jpg';
        // const response = 'https://ik.imagekit.io/ikmedia/women-dress-2.jpg';
        // eslint-disable-next-line
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned image URL and update the state.
        setRandImageURL(response);
        // const randomImage = response.data;
        // setImageId(randomImage.imageId);
        // setRandImageURL(randomImage.storageLink);
      } catch (error) {
        alert(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error('Details:', error);
      }
    }
    fetchCategories();
    fetchFirstRandomPictureURL();
    // TODO: probably not necessary as start state of category is random: only 2 states to differentiate
    isMounted.current = true;
  }, []);

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchNoCategoryRandomPictureURL() {
      try {
        const { id: userId } = cookies;
        const authAxios = axios.create({
          baseURL: getDomain(),
          headers: { userId, 'Content-Type': 'application/json' },
        });
        // response = await authAxios.get('/images/random/c');

        const response = 'https://www.w3schools.com/images/w3schools_green.jpg';
        // const response = 'https://ik.imagekit.io/ikmedia/women-dress-2.jpg';
        // eslint-disable-next-line
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned image URL and update the state.
        setRandImageURL(response);
        // const randomImage = response.data;
        // setImageId(randomImage.imageId);
        // setRandImageURL(randomImage.storageLink);
      } catch (error) {
        alert(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error('Details:', error);
      }
    }
    async function fetchWithCategoryRandomPictureURL() {
      try {
        const { id: userId } = cookies;
        const authAxios = axios.create({
          baseURL: getDomain(),
          headers: { userId, 'Content-Type': 'application/json' },
        });
        // const response = await authAxios.get('/images/random/{selectedCategory}');

        // const response = 'https://images.dog.ceo//breeds//malinois//n02105162_10076.jpg';
        const response = 'https://ik.imagekit.io/ikmedia/women-dress-2.jpg';
        // eslint-disable-next-line
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned image URL and update the state.
        setRandImageURL(response);
        // const randomImage = response.data;
        // setImageId(randomImage.imageId);
        // setRandImageURL(randomImage.storageLink);
      } catch (error) {
        // TODO: Check if error is catched/shown when all images are seen
        alert(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error(`Something went wrong while fetching the images: \n${handleError(error)}`);
        console.error('Details:', error);
      }
    }

    if (isMounted) {
      if (selectedCategory === 'Random') {
        fetchNoCategoryRandomPictureURL();
      } else {
        fetchWithCategoryRandomPictureURL();
      }
    }
  }, [rating, selectedCategory]);

  const rateImage = (newRatingValue) => {
    const { id: userId } = cookies;
    const requestBody = JSON.stringify({
      imageId,
      rating: newRatingValue,
    });
    const authAxios = axios.create({
      baseURL: getDomain(),
      headers: { userId, 'Content-Type': 'application/json' },
    });

    authAxios.put('/rate', requestBody);
    // TODO: catch error
    /*
  rating
  header: userId
  requestBody: ImageId, rating (int)
  */
  };

  // does the function call work or could it be that the rating (value via setValue) is not yet updated?
  const handleReportImage = () => {
    // use Id to indetify the reporting user
    // TODO: fix function, does not work
    const { id: userId } = cookies;
    const empty = '';
    const mailMessageBody = empty.concat(
      'User with id: ',
      userId.toString(),
      ' reported an inappropriate image with imageId: ',
      imageId.toString(),
    );

    const Email = {
      send(a) {
        return new Promise((n, e) => {
          a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = 'Send';
          const t = JSON.stringify(a);
          Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, (e) => {
            n(e);
          });
        });
      },
      ajaxPost(e, n, t) {
        const a = Email.createCORSRequest('POST', e);
        a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'), a.onload = function () {
          const e = a.responseText;
          t != null && t(e);
        }, a.send(n);
      },
      ajax(e, n) {
        const t = Email.createCORSRequest('GET', e);
        t.onload = function () {
          const e = t.responseText;
          n != null && n(e);
        }, t.send();
      },
      createCORSRequest(e, n) {
        let t = new XMLHttpRequest();
        return 'withCredentials' in t ? t.open(e, n, !0) : typeof XDomainRequest !== 'undefined' ? (t = new XDomainRequest()).open(e, n) : t = null, t;
      },
    };
    Email.send({
      Host: 'smtp.gmail.com',
      Username: MailUsername,
      Password: MailPassword,
      To: MailTo,
      From: MailFrom,
      Subject: mailMessageBody,
      Body: reportReason,
    }).then(
      (message) => alert(message),
    );

    setIsReport(false);
  };

  const handleOnChangeRating = (event, newValue) => {
    setIsLoadingNewPicture(true);
    setRating(newValue);
    rateImage(newValue);
  };

  const rateMeTitle = useMemo(
    () => (
      <Grid
        item
        style={{
          height: '10%',
        }}
      >
        <Typography variant="h2" style={{ fontWeight: 'bold' }} align="center">
          RATE ME!
        </Typography>
      </Grid>
    ),
    [],
  );

  const picture = useMemo(() => (
    <ImageList
      sx={{
        width: 1, height: 1,
      }}
      cols={1}
      align="center"
    >

      <Zoom in style={{ transitionDelay: '500ms' }}>
        <ImageListItem
          key="some unique key"
          style={{
            objectFit: 'contain',
            height: '100%',
            maxHeight: '100%',
            maxWidth: '100%',
            minHeight: '100%',
          }}
        >

          <img
            src={randImageURL}
            alt="random title"
            loading="lazy"
            style={{
              objectFit: 'contain',
              height: '100%',
              maxHeight: '100%',
              minHeight: '100%',
            }}
          />

          <Lottie animationData={staranimation} style={{ position: 'absolute', zIndex: 1 }} />
        </ImageListItem>
      </Zoom>
    </ImageList>
  ), [randImageURL]);

  if (randImageURL === '') {
    return null;
  }

  return (

    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >

      {/* left side of screen: columns with game */}
      <Grid item xs={6}>
        <Grid
          container
          rowSpacing={2}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          style={{
            height: 'calc(100vh - 90px)',
          }}
        >
          <Grid
            item
            style={{
              height: '10%',
            }}
          >
            <Typography
              variant="h6"
              style={{ fontWeight: 'bold' }}
              align="center"
              paragraph
            >
              Crush the Egg and earn a bonus! Compete against other users and earn
              trophies that you can link to your selected pictures. Pictures with
              assigned bonuses have a greater change of being shown to other users,
              increasing your chances of appearing in the weekly highlights.
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              height: '75%',
            }}
          >
            <Grid cols={1} align="center">
              <Grid
                style={{
                  objectFit: 'contain',
                  height: '80%',
                  maxHeight: '70%',
                  maxWidth: '70%',
                  minHeight: '70%',
                }}
              >
                <Lottie animationData={animation} loop autoplay />
              </Grid>
              <Button component={Link} to="/game" variant="contained" color="primary">
                Play Game
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* TODO: divider -> divides the game part (left side of screen) from the rating part
       (middle to right side of screen)
      <Grid item>
        <Divider orientation="vertical" variant="middle" flexItem />
      </Grid>
*/}
      {/* middle of screen: columns with categories */}
      <Grid item xs={1}>
        <Grid
          container
          rowSpacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <CustomSelect
              autoWidth
              categories={categories}
              label="Category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            />
            <Grid item xs={12}>
              <Button
                color="inherit"
                size="large"
                startIcon={<FlagIcon />}
                onClick={() => setIsReport(true)}
              >
                Report image
              </Button>
            </Grid>
            <Dialog open={isReport} onClose={() => setIsReport(false)}>
              <DialogTitle>Report inappropriate image</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To report an inappropriate image, explain below why you think so and confirm with &quot;REPORT&quot; button.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Why is the image inappropriate?"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(event) => setReportReason(event.target.value)}
                  value={reportReason}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsReport(false)}>Cancel</Button>
                <Button onClick={handleReportImage}>Report</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
      {/* right side of screen: columns with picture, rating */}
      <Grid
        item
        xs={5}
      >

        <Grid
          container
          rowSpacing={2}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          style={{
            height: 'calc(100vh - 90px)',
          }}
        >
          {rateMeTitle}

          <Grid
            item
            style={{
              height: '75%',
            }}
          >
            {picture}
          </Grid>

          <Grid
            item
            style={{
              height: '15%',
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              style={{
                height: '100%',
              }}
            >

              <Grid
                item
                style={{
                  height: '80%',

                }}
              >

                <Rating
                  name="hover-feedback"
      /* defaultValue = {value} --> maybe this takes the value
      from before and shows it with the next picture
      TODO: adjust size, doesn't work yet */
                  align="center"
                  value={0}
                  onChange={handleOnChangeRating}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55, fontSize: '3vw' }} />}
                  icon={<StarIcon style={{ opacity: 0.55, fontSize: '3vw' }} />}
                />
              </Grid>
              <Grid item style={{ paddingTop: '0px', height: '20%' }}>
                <div>
                  {labels[hover]}

                  {/* TODO: maybe fix : rating as there might otherwise show the previously assigned rating value with the next picture */}

                </div>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}

export default Home;
