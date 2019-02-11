import React, { Fragment } from 'react';
import { CssBaseline, withStyles, } from '@material-ui/core';
import AppHeader from './components/AppHeader';
import Tokens from './pages/Tokens';

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Tokens
        api={process.env.REACT_APP_API_BASE}
        refreshInterval={process.env.REACT_APP_EVENT_REFRESH_INTERVAL || 0} />
    </main>
  </Fragment>
);

export default withStyles(styles)(App);

