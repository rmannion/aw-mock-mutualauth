import React, { Component, Fragment } from 'react';
import {
    withStyles,
    Typography,
    Button,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import { compose } from 'recompose';
import { withRouter, Route, Link, Redirect } from 'react-router-dom';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import { find } from 'lodash';

import TokenEditor from '../components/TokenEditor.js';

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
});

const API = process.env.REACT_APP_API || 'http://www.zdlocal.com:3001';

class Config extends Component {
    state = {
	loading: true,
	tokens: []
    };

    componentDidMount() {
	this.getTokens();
    }

    async fetch(method, endpoint, body) {
	try {
	    const res = await fetch(`${API}${endpoint}`, {
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

    async getTokens() {
	this.setState({ loading: false, tokens: await this.fetch('get', '/token') });
    }

    saveToken = async (token) => {
	if (token.mutualAuthToken) {
	    await this.fetch('post', `/token/${token.mutualAuthToken}`, { consumerAuthToken: token.consumerAuthToken });
	}
	this.props.history.goBack();
	this.getTokens();
    }

    async deleteToken(token) {
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
	const { classes } = this.props;

	return (
	    <Fragment>
		<Typography variant="display1">Mutual Auth Tokens</Typography>

		{this.state.tokens.length > 0 ? (
		    <Paper elevation={1} className={classes.tokens}>
			<List>
			    {this.state.tokens.map(token => (
				<ListItem key={token.mutualAuthToken} button component={Link} to={`/token/${token.mutualAuthToken}`}>
				    <ListItemText
					primary={token.mutualAuthToken + " / " + token.consumerAuthToken}
					secondary={token.dateCreated && `Updated ${moment(token.dateCreated).fromNow()}`}
				    />
				    <ListItemSecondaryAction>
					<IconButton onClick={() => this.deleteToken(token)} color="inherit">
					    <DeleteIcon />
					</IconButton>
				    </ListItemSecondaryAction>
				</ListItem>
			    ))}
			</List>
		    </Paper>
		) : (
		    this.state.loading == false && <Typography variant="subheading">No tokens</Typography>
		)}

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
)(Config);

