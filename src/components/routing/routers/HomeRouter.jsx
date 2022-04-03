import { Redirect, Route } from 'react-router-dom';
import Home from 'components/views/Home';
import PropTypes from 'prop-types';
import React from 'react';

function HomeRouter(props) {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of HomeRouter, i.e., App.js
   */
  const { base } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Route exact path={`${base}/dashboard`}>
        <Home />
      </Route>
      <Route exact path={`${base}`}>
        <Redirect to={`${base}/dashboard`} />
      </Route>
    </div>
  );
}
/*
* Don't forget to export your component!
 */

HomeRouter.propTypes = {
  base: PropTypes.string.isRequired,
};

export default HomeRouter;
