import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { HomeGuard } from 'components/routing/routeProtectors/HomeGuard';
import { LoginGuard } from 'components/routing/routeProtectors/LoginGuard';
import Login from 'components/views/Login';
import React from 'react';
import Register from '../../views/Register';
import Highlights from '../../views/Highlights';
import Home from '../../views/Home';
import Game from '../../views/Game';
import Settings from '../../views/Settings';
import Pictures from '../../views/Pictures';
import Application from '../../views/Application';
import Upload from '../../views/Upload';
import ProfilePage from '../../views/ProfilePage';

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/home".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /home renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        {
          [{ path: '/home', component: <Home /> },
            { path: '/highlights', component: <Highlights /> },
            { path: '/settings', component: <Settings /> },
            { path: '/game', component: <Game /> },
            { path: '/pictures', component: <Pictures /> },
            { path: '/upload', component: <Upload /> },
            { path: '/ProfilePage', component: <ProfilePage /> },
          ].map((element, index) => (
            <Route path={element.path} key={`${index}_application_element`}>
              <HomeGuard>
                <Application>
                  {element.component}
                </Application>
              </HomeGuard>
            </Route>
          ))
        }
        <Route exact path="/login">
          <LoginGuard>
            <Login />
          </LoginGuard>
        </Route>
        <Route exact path="/register">
          <LoginGuard>
            <Register />
          </LoginGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
          
        </Route>
        <Route exact path="/game">
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

/*
* Don't forget to export your component!
 */
export default AppRouter;
