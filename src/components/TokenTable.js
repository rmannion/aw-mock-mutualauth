import React from 'react';
import { Paper, Link, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import moment from 'moment';

export default ({ tokens, onDeleteToken }) =>
  <Paper elevation={1}>
    <List>
      { tokens.map(token => (
        <ListItem key={token.mutualAuthToken} button component={Link} to={`/token/${token.mutualAuthToken}`}>
          <ListItemText
            primary={token.mutualAuthToken + ' / ' + token.consumerAuthToken}
            secondary={token.dateCreated && `Updated ${moment(token.dateCreated).fromNow()}`}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => onDeleteToken(token)} color='inherit'>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </Paper>
