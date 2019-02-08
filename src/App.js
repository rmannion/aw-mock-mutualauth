import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import {
    CssBaseline,
    withStyles,
} from '@material-ui/core';
import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import Config from './pages/Config';

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
	    <Config />
	</main>
    </Fragment>
);

export default withStyles(styles)(App);

