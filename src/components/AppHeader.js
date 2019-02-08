import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

const AppHeader = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit">
        Mock Mutual Auth Service
      </Typography>
    </Toolbar>
  </AppBar>
);

export default AppHeader;
