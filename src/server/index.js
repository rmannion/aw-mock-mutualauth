require('dotenv').config({ path: '.env.local' })
var bodyParser = require('body-parser')
var _ = require('lodash');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

state = {
  tokens: { 
    'testMAT1': {
      'dateCreated': Date(),
      'consumerAuthToken': 'consumerAuthTokenA',
    },
    'testMAT2': {
      'dateCreated': Date(),
      'consumerAuthToken': 'consumerAuthTokenB',
    },
    '*': {
      'dateCreated': Date(),
      'consumerAuthToken': 'fallback',
    },
  },
  events: [
  ],
}

app.use(async (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error.message);
  }
});

app.post('/', (req, res) => {
  let mutualAuthToken = req.header('useraccesstoken');
  let token = state.tokens[mutualAuthToken] || state.tokens['*'];

  let event = {
    date: Date(),
    mutualAuthToken: mutualAuthToken,
    consumerAuthToken: token && token.consumerAuthToken,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
  };
  state.events = [event].concat(state.events.slice(0, 99))

  if (token === undefined) {
    res.status(404).send();
  } else {
    res.status(200).json({'userAccessToken': token.consumerAuthToken});
  }
});

app.post('/token/:mutualAuthToken', (req, res) => {
  if (req.body.consumerAuthToken === undefined) {
    res.status(400).send();
  } else if (Object.keys(state.tokens).length >= 100) {
    res.status(507).send();
  } else {
    state.tokens[req.params.mutualAuthToken] = {
      'dateCreated': Date(),
      'consumerAuthToken': req.body.consumerAuthToken,
    };
    res.status(201).send();
  }
});

app.delete('/token/:mutualAuthToken', (req, res) => {
  if (state.tokens[req.params.mutualAuthToken] === undefined) {
    res.status(400).send();
  } else {
    delete state.tokens[req.params.mutualAuthToken];
    res.status(200).send();
  }
});

app.get('/token', (req, res) => {
  let response = _.map(state.tokens, function(value, key) {
    return _.merge({'mutualAuthToken': key}, value);
  });
  res.status(200).send(response);
});

app.get('/events', (req, res) => {
  res.status(200).send(state.events);
});

const port = process.env.API_PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

