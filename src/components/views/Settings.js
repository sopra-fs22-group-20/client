import {useEffect, useState} from 'react';

import {api, handleError} from 'helpers/api';

//import {Button} from 'components/ui/Button';
import {Spinner} from 'components/ui/Spinner';
import {useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";

import "styles/views/Game.scss";
import PropTypes from "prop-types";
import User from "../../models/User";

//import React from 'react';
//import {Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseLine, Grid, Toolbar, Container } from '@material-ui/core';
//import { PhotoCamera } from '@material-ui/icons';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import {PhotoCamera} from "@mui/icons-material";
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Settings = () => {
    return (
        <>
        <CssBaseline />

            <main>
                <div>
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="left" color="textPrimary" gutterBottom>
                            Settings
                        </Typography>
                        <Typography variant="h5" align="center" color = "textSecondary" paragraph>
                            On the settings page, you can update your account settings.
                        </Typography>
                        <div>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                username:
                            </Typography>
                            <Grid container spacing={6}>
                                <Grid item xs={6}>
                                    <Item>New Username</Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained">Change Username</Button>
                                </Grid>

                            </Grid>

                        </div>
                        <div> </div>
                        <div>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                password:
                            </Typography>
                            <Grid container spacing={6}>
                                <Grid item xs={6}>
                                    <Item>Your Password</Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained">Change Password</Button>
                                </Grid>

                            </Grid>

                        </div>
                        <div>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                Instagram:
                            </Typography>
                            <Grid container spacing={6}>
                                <Grid item xs={6}>
                                    <Item>Instagram Account</Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained">Change Instagram</Button>
                                </Grid>

                            </Grid>

                        </div>

                    </Container>
                </div>

            </main>
        </>
    )
}

export default Settings;