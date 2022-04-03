import { Redirect, Route } from 'react-router-dom';
import Game from 'components/views/Game';
import PropTypes from 'prop-types';
import React from 'react';

function GameRouter(props) {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  const { base } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Route exact path={`${base}/dashboard`}>
        <Game />
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

GameRouter.propTypes = {
  base: PropTypes.string.isRequired,
};

export default GameRouter;
