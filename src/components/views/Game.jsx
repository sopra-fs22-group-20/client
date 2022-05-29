import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Spinner } from 'components/ui/Spinner';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Button,
  Grid, Typography,
} from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { getDomain } from '../../helpers/getDomain';
import { api, handleError } from '../../helpers/api';

export default function Game() {
  const [userData, setUserData] = useState({
    id: null,
    user1Id: null,
    user2Id: null,
    user1Score: null,
    user2Score: null,
    user1Name: null,
    user2Name: null,
    user1Joined: true,
    user2Joined: null,
    winner: null,
    gameStartTime: null,
    gameCode: '',
    active: false,
    step1Image: '',
    step2Image: '',
    step3Image: '',
    step4Image: '',
  });
  const [winner, setWinner] = useState('');
  const [error, setError] = useState('');
  const [clickScore1, setClickScore1] = useState(userData.user1Score);
  const [clickScore2, setClickScore2] = useState(userData.user2Score);
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [exitGame, setExitGame] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [_user1Joined, setUser1Joined] = useState(false);
  const [_user2Joined, setUser2Joined] = useState(false);
  const [showJoin, setShowJoin] = useState(true);
  const [cookies, setCookie] = useCookies(['id', 'userData']);
  const history = useHistory();
  const { userData: mainUser } = cookies;
  function setUser2Image(res) {
    if (res.data.user2Score < 25) setImage2(res.data.step1Image);
    if (res.data.user2Score > 25 && res.data.user2Score < 50) setImage2(res.data.step2Image);
    if (res.data.user2Score > 50 && res.data.user2Score < 75) setImage2(res.data.step3Image);
    if (res.data.user2Score == 100) setImage2(res.data.step4Image);
  }

  function setUser1Image(res) {
    if (res.data.user1Score < 25) setImage1(res.data.step1Image);
    if (res.data.user1Score > 25 && res.data.user1Score < 50) setImage1(res.data.step2Image);
    if (res.data.user1Score > 50 && res.data.user1Score < 75) setImage1(res.data.step3Image);
    if (res.data.user1Score == 100) setImage1(res.data.step4Image);
  }
  async function giveWinnerTrophies(userID) {
    try {
      const requestBody = JSON.stringify({ userId: userID, trophies: 10 });
      const response = await api.put('/users/trophies', requestBody);
      if (mainUser.userId === userID) {
        setCookie('userData', { ...mainUser, trophies: mainUser.trophies + 10 }, { path: '/' });
      }
    } catch (error) {
      alert(`Something went wrong: \n${handleError(error)}`);
    }
  }
  function declareWinner(res) {
    console.log(res);
    if (res.data.user1Score == 100) {
      giveWinnerTrophies(res.data.user1Id);
      setWinner(`🏅 Winner is "${userData.user1Name}"`);
      // giveWinnerTrophies(user1ID);
      setClickable(false);
      setExitGame(true);
    } else if (res.data.user2Score == 100) {
      giveWinnerTrophies(res.data.user2Id);
      setWinner(`🏅 Winner is "${userData.user2Name}"`);
      // giveWinnerTrophies(user2ID);
      setClickable(false);
      setExitGame(true);
    } else {
      setClickable(true);
      setExitGame(false);
      setWinner('🏅 Winner will be here');
    }
  }

  async function fetchGameByUserId() {
    const baseUrl = getDomain();
    await axios.get(`${baseUrl}/game/findGameByUserId/${cookies.id}`).then((res) => {
      setUserData(res.data);
      setClickScore1(res.data.user1Score);
      declareWinner(res);
      setClickScore2(res.data.user2Score);
      setUser1Joined(res.data.user1Joined);
      setUser2Joined(res.data.user2Joined);
      setUser1Image(res);
      setUser2Image(res);
    }).catch((err) => {
      fetchActiveGame();
      if (userData.user1Id == null) setError(err.response.data);
      else if (userData.user2Id == null) setError('Game lobby is ready, please click on following button to join the game');
    });
  }
  async function fetchActiveGame() {
    const baseUrl = getDomain();
    await axios.get(`${baseUrl}/game/findActiveGame`).then((res) => {
      setError('');
      setUserData(res.data);
      declareWinner(res);
      setUser1Image(res);
      setUser2Image(res);
      setImage1(res.data.step1Image);
    }).catch((err) => {
      if (userData.user1Id == null) setError(err.response.data);
      else if (userData.user2Id == null) setError('Game lobby is ready, please click on following button to join the game');
    });
  }

  async function checkPartiesAvailabilityAndFetchData() {
    await axios.get(`${getDomain()}/game/checkEmptyLobby`).then((res) => {
      if (res.status === 226) {
        console.log('1');
        fetchGameByUserId(cookies.id);
        /*
      } else if (isFirstLandOnPage) {
        setIsFirstLandOnPage(false);
        fetchGameByUserId(cookies.id);
        */
      } else {
        // you can update the time of automation by changing the last param
        fetchGameByUserId(cookies.id);
        /*
        alert('No other player has joined the lobby yet, '
          + 'please refresh by clicking the refresh button in a couple of seconds');
        */
      }
    }).catch((err) => {
      console.log('3');
      fetchGameByUserId(cookies.id);
      fetchActiveGame();
    });
  }

  useEffect(() => {
    //  if (res.status === 226) {
    checkPartiesAvailabilityAndFetchData();
    //   res.status == -1;
    // }
  }, []);

  // Functions
  async function createGame() {
    const baseUrl = getDomain();
    return await axios.post(`${baseUrl}/game/create`, {
      user1Id: cookies.id,
      user1Joined: true,
    }).then((res) => {
      setUserData(res.data);
      setClickScore1(res.data.user1Score);
      setError('');
      setImage1(res.data.step1Image);
    }).catch((err) => {
      setError(err.response.message);
      // console.log(err.response.data)
    });
  }

  /*
    async function cancelGame() {
    const baseUrl = getDomain();
    await axios.delete(`${baseUrl}/game/quit/${userData.gameCode}/${cookies.id}`).then((res) => {
      console.log(res.data);
      setUserData(res.data);
      setUser1Image(res);
    }).catch((err) => {
      setError(err.response.message);
      console.log(err.response.data);
    });
    exitGameNow();
  }
   */

  async function joinGame() {
    setClickable(true);
    if (userData.user1Id == cookies.id) {
      // placeholder for upward compatibility
      console.log('user1=cookiesId');
    } else if (userData.user2Id == cookies.id) {
      // placeholder for upward compatibility
      console.log('user2=cookiesId');
    } else {
      const baseUrl = getDomain();
      return await axios.post(`${baseUrl}/game/joinGame`, {
        user2Id: cookies.id,
        gameCode: userData.gameCode,
      }).then((res) => {
        setUserData(res.data);
        setError('');
        setClickScore2(res.data.user1Score);
        setShowJoin(false);
        setImage2(res.data.step1Image);
      }).catch((err) => {
        setError(err.response.message);
        console.log(err.response.data);
      });
    }
  }

  async function saveWinner(id, gameCode) {
    await axios.get(`${getDomain()}/saveWinner/${cookies.id}/${userData.gameCode}`);
  }

  async function handleIncrement1() {
    if (clickScore1 == 100) {
      setWinner(`🏅 Winner is ${userData.user1Name}`);
      setExitGame(false);
      saveWinner(userData.id, userData.gameCode);
      setClickable(false);
    } else {
      setClickScore1(clickScore1 + 1);
      // game/updateScore
      const baseUrl = getDomain();
      return await axios.put(`${baseUrl}/game/updateScore`, {
        gameCode: userData.gameCode,
        userId: cookies.id,
        score1: clickScore1,
      }).then((res) => {
        setError('');
        setUserData(res.data);
        declareWinner(res);
        setClickScore1(res.data.user1Score);
        setClickScore2(res.data.user2Score);
        setUser1Image(res);
        setUser2Image(res);
      }).catch((err) => {
        setError(err.response.message);
        console.log(err.response.data);
      });
    }
  }

  async function handleIncrement2() {
    if (clickScore2 == 100) {
      setWinner(`🏅 Winner is ${userData.user2Name}`);
      setClickable(false);
      setExitGame(false);
      saveWinner(userData.id, userData.gameCode);
    } else {
      setClickScore2(clickScore2 + 1);
      const baseUrl = getDomain();
      return await axios.put(`${baseUrl}/game/updateScore`, {
        gameCode: userData.gameCode,
        userId: cookies.id,
        score2: clickScore2,
      }).then((res) => {
        console.log(res.data);
        setUserData(res.data);
        setClickScore1(res.data.user1Score);
        setClickScore2(res.data.user2Score);
        declareWinner(res);
        setUser1Image(res);
        setUser2Image(res);
      }).catch((err) => {
        setError(err.response.message);
        console.log(err.response.data);
      });
    }
  }

  async function giveUp() {
    const baseUrl = getDomain();
    await axios.delete(`${baseUrl}/game/quit/${userData.gameCode}/${cookies.id}`).then((res) => {
      console.log(res.data);
      setUserData(res.data);
      setUser1Image(res);
      setUser2Image(res);
      if (cookies.id == userData.user1Id) setWinner(`🏅 Winner is "${userData.user2Name}"`);
      if (cookies.id == userData.user2Id) setWinner(`🏅 Winner is "${userData.user1Name}"`);
    }).catch((err) => {
      setError(err.response.message);
      console.log(err.response.data);
    });
  }

  async function exitGameNow() {
    // exit the game now
    await axios.delete(`${getDomain()}/game/exitGame/${userData.gameCode}`).then((res) => {
      setUserData({
        id: null,
        user1Id: null,
        user2Id: null,
        user1Score: null,
        user2Score: null,
        user1Name: null,
        user2Name: null,
        user1Joined: true,
        user2Joined: null,
        winner: null,
        gameStartTime: null,
        gameCode: '',
        active: false,
        step1Image: '',
        step2Image: '',
        step3Image: '',
        step4Image: '',
      });
      setExitGame(false);
      history.push('/home');
    }).catch((err) => {
      setError(err.response.data);
    });
  }

  async function refreshComponent() {
    await fetchGameByUserId(cookies.id);
  }

  async function cancelGame() {
    await giveUp();
    history.push('/home');
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid item xs={4}>
        <Typography
          variant="h5"
          style={{ fontWeight: 'bold' }}
          paragraph
        >
          {error}
        </Typography>
        <h2 style={{ color: 'black', fontFamily: 'bold' }}>{winner}</h2>

        {
          userData.active === false
          && (
            <Button onClick={() => createGame()} style={{ fontSize: '14px' }} size="large" variant="contained">
              Create Game
            </Button>
          )
        }

        {
          userData.active === true && (userData.user2Id == null || userData.user1Id == null) && showJoin === true && userData.user1Id != cookies.id
          && (
            <Button onClick={() => joinGame()} style={{ fontSize: '14px', marginLeft: '10px' }} size="large" variant="contained">
              Join Game
            </Button>
          )
        }
        {/* add refresh button and call the fresh data without any refresh page */}

        <Button
          color="inherit"
          size="large"
          startIcon={<RefreshIcon />}
          onClick={() => { refreshComponent(); }}
        >
          Refresh opponent search
        </Button>

        {
          (!userData.user2Joined) && (
            <button
              style={{ marginLeft: '15px' }}
              className="btn btn-danger btn-sm"
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                (!userData.active)
                  ? history.push('/home')
                  : cancelGame();
              }}
            >
              Cancel
            </button>
          )
        }

        {
          exitGame === true
          && (
            <Button onClick={() => exitGameNow()} style={{ fontSize: '14px', marginLeft: '10px' }} size="large" variant="contained">
              Exit the Game Now
            </Button>
          )
        }
      </Grid>

      {
        userData.active === true && (
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={(
                  <Typography variant="h5" aria-label="recipe">
                    {cookies.id == userData.user1Id ? <span>You</span> : <span>Your opponent</span>}
                  </Typography>
                )}
                action={(
                  <div>
                    <h4 className="mt-3">
                      Score:
                      {clickScore1}
                    </h4>
                    {userData.user1Id == cookies.id ? <button onClick={() => giveUp()} className="btn btn-danger btn-sm">Give Up</button> : <br />}
                  </div>
                )}
              />
              <CardContent>
                <Typography variant="p" color="text.secondary">
                  {userData.user2Name !== null && (
                    <span>
                      Your opponent is
                      {' '}
                      {userData.user2Name}
                    </span>
                  ) }
                </Typography>
              </CardContent>
              {userData.user1Id == cookies.id && clickable == true ? (
                <CardMedia
                  component="img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleIncrement1()}
                  image={image1}
                  width={250}
                  height={450}
                  alt="Paella dish"
                />
              ) : (
                <CardMedia
                  component="img"
                  image={image1}
                  width={250}
                  height={450}
                  alt="Paella dish"
                />
              )}
            </Card>
          </Grid>
        )
      }

      {
        (
          userData.user2Joined == true && userData.active == true) ? (
            <Grid item md={6} xs={12} lg={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={<Typography variant="h5" aria-label="recipe">{cookies.id == userData.user2Id ? <span>You</span> : <span>Your opponent</span>}</Typography>}
                  action={(
                    <div>
                      <h4 className="mt-3">
                        Score:
                        {clickScore2}
                      </h4>
                      {userData.user2Id == cookies.id ? <button onClick={() => giveUp()} className="btn btn-danger btn-sm">Give Up</button> : <br />}
                    </div>
                )}
                />
                <CardContent>
                  <Typography variant="p" color="text.secondary">
                    {userData.user1Name !== null && (
                    <span>
                      Your opponent is
                      {' '}
                      {userData.user1Name}
                    </span>
                    )}
                  </Typography>
                </CardContent>
                {userData.user2Id == cookies.id && clickable == true ? (
                  <CardMedia
                    component="img"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleIncrement2()}
                    image={image2}
                    width={250}
                    height={450}
                    alt="Paella dish"
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image={image2}
                    width={250}
                    height={450}
                    alt="Paella dish"
                  />
                )}
              </Card>
            </Grid>
          ) : <Spinner />
      }
    </Grid>
  );
}
