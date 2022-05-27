import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useCookies } from 'react-cookie';
import Lightspeed from 'react-reveal/LightSpeed';

export function Navigation() {
  const history = useHistory();
  const [cookies, _setCookie,
    removeCookie] = useCookies(['userId', 'token']);
  const { id: userId } = cookies;
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12}>

          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
              >
                {' '}
                <span className="sr-only">Toggle navigation</span>
                {' '}
                <span className="icon-bar" />
                {' '}
                <span className="icon-bar" />
                {' '}
                <span className="icon-bar" />
                {' '}
              </button>
              <Link className="navbar-brand page-scroll" to="/home">
                <Lightspeed left>
                  <img
                    src="/images/Logo_long.png"
                    alt="some title"
                    style={{
                      height: '250%',
                      width: 'auto',
                      imageRendering: 'crisp-edges',
                    }}
                  />
                </Lightspeed>
              </Link>
            </div>

            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                {
                    [{ path: '/home', name: 'Home' },
                      { path: '/highlights', name: 'Highlights' },
                      { path: `/ProfilePage/${userId}`, name: 'Profile Page' },
                      { path: '/pictures', name: 'Pictures' },
                      { path: '/upload', name: 'Upload' },
                    ].map((element, index) => (
                      <li key={`${index}_${element.name}`}>
                        <Link to={element.path} className="page-scroll">
                          {element.name}
                        </Link>
                      </li>
                    ))
                  }
                <li style={{ marginTop: '12px', marginLeft: '19px' }}>
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {
                      removeCookie('token', { path: '/' });
                      removeCookie('id', { path: '/' });
                      history.push('/login');
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </Grid>
      </Grid>
    </nav>
  );
}
