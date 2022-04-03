import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Navigation } from '../ui/Navigation';

function Application(props) {
  const { children } = props;
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} style={{ height: '90px' }}>
            <Navigation />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} style={{ paddingRight: '25px', paddingLeft: '25px' }}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}

Application.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Application;
