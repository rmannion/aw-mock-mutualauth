import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { find } from 'lodash';
import { withRouter, Route, Link, Redirect } from 'react-router-dom';
import { withStyles, Typography, Button, Paper } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import RefreshingEventTable from '../components/RefreshingEventTable';
import TokenEditor from '../components/TokenEditor.js';
import TokenTable from '../components/TokenTable.js';

const styles = theme => ({
  tokens: {
    marginTop: 2 * theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: 3 * theme.spacing.unit,
    right: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      bottom: 2 * theme.spacing.unit,
      right: 2 * theme.spacing.unit,
    },
  },
  tokenHeader: {
    marginBottom: 1 * theme.spacing.unit,
  },
  eventsHeader: {
    marginTop: 5 * theme.spacing.unit,
    marginBottom: 1 * theme.spacing.unit,
  },
});

class Tokens extends Component {
  state = {
    loading: true,
    tokens: []
  };

  componentDidMount() {
    this.getTokens();
  }

  fetch = async (method, endpoint, body) => {
    const { api } = this.props;

    try {
      const res = await fetch(`${api}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  getTokens = async () => {
    this.setState({ loading: false, tokens: await this.fetch('get', '/token') });
  }

  saveToken = async (token) => {
    if (token.mutualAuthToken) {
      await this.fetch('post', `/token/${token.mutualAuthToken}`, { consumerAuthToken: token.consumerAuthToken });
    }
    this.props.history.goBack();
    this.getTokens();
  }

  deleteToken = async (token) => {
    await this.fetch('delete', `/token/${token.mutualAuthToken}`);
    this.getTokens();
  }

  renderTokenEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const token = find(this.state.tokens, { mutualAuthToken: id });
    if (!token && id !== 'new') return <Redirect to="/" />;
    return <TokenEditor token={token} onSave={this.saveToken} />;
  };

  render() {
    const { api, classes } = this.props;
    const { tokens } = this.state;

    return (
      <Fragment>
        <Typography variant='display1' className={classes.tokenHeader}>Mutual Auth Tokens</Typography>

        { this.state.tokens.length > 0 ? (
          <TokenTable tokens={tokens} onDeleteToken={this.deleteToken} />
        ) : (
          this.state.loading === false && <Typography variant='subheading'>No tokens</Typography>
        )}

        <Typography variant='display1' className={classes.eventsHeader}>Events</Typography>

        <Paper elevation={1} className={classes.tokens}>
          <RefreshingEventTable api={api} refreshInterval={0} />
        </Paper>

        <Button
          variant="fab"
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/token/new"
        >
          <AddIcon />
        </Button>

        <Route exact path="/token/:id" render={this.renderTokenEditor} />
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(Tokens);

