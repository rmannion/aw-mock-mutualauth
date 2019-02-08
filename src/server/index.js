require('dotenv').config({ path: '.env.local' })
var bodyParser = require('body-parser')

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

tokens = { 
    'asdfasdf': 'yes'
};

app.use(async (req, res, next) => {
    try {
	next();
    } catch (error) {
	next(error.message);
    }
});

app.post('/', (req, res) => {
    let mutualAuthToken = req.header('useraccesstoken');
    let consumerAuthToken = tokens[mutualAuthToken];
    if (consumerAuthToken === undefined) {
	res.status(404).send();
    } else {
	res.status(200).json({'userAccessToken': consumerAuthToken});
    }
});

app.post('/token/:mutualAuthToken', (req, res) => {
    if (req.body.consumerAuthToken === undefined) {
	res.status(400).send();
    } else {
	tokens[req.params.mutualAuthToken] = req.body.consumerAuthToken;
	res.status(200).send();
    }
});

app.delete('/token/:mutualAuthToken', (req, res) => {
    if (tokens[req.params.mutualAuthToken] === undefined) {
	res.status(400).send();
    } else {
	delete tokens[req.params.mutualAuthToken];
	res.status(200).send();
    }
});

app.get('/token', (req, res) => {
    res.status(200).send(tokens);
});

const port = process.env.SERVER_PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
