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

const Settings = () => {
    return (
        <>
        <CssBaseline />
        <AppBar position="relative">
            <Toolbar>
                <PhotoCamera />
                <Typography variant="h6">
                    Settings
                </Typography>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Settings;