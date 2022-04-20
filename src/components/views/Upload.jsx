import React, { useRef, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import mapboxgl from '!mapbox-gl';
import 'styles/ui/mapContainer.scss';

import {
  ref, uploadBytes, getDownloadURL, getStorage,
} from 'firebase/storage';

import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent, DialogContentText, DialogActions,
} from '@mui/material';



mapboxgl.accessToken = '';

// TODO: fetch categories from backend
const CATEGORIES = [
  { value: 'Autos', name: 'Autos' },
  { value: 'Katzen', name: 'Katzen' },
  { value: 'Hunde', name: 'Hunde' },
  { value: 'New', name: '...suggest new category' },
];

function Upload() {
  const [selectedFile, setFile] = useState(null);
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Autos');
  const [location, setLocation] = useState('');
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategorySuggestion, setNewCategorySuggestion] = useState('');

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  });



  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >

      <Grid item>
        <p>Map</p>
        <div ref={mapContainer} className="map-container" />
      </Grid>

      <div></div>
    </Grid>
  );
}

export default Upload;
