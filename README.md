# Mock AmWell Mutual Auth Service

## Installation

* Clone this repository
* From your working directory, `npm install`
* Configure a `.env.local` file, customizing as needed:
```
PORT=3000
API_PORT=3001
REACT_APP_API_BASE=https://api.mutualauth.com:3001
REACT_APP_EVENT_REFRESH_INTERVAL=5
```
* `yarn start`

## Protip

If using Apache, you can proxy requests to a subdomain like so:

```
<VirtualHost *:80>
  ServerName api.mutualauth.com
  ProxyPreserveHost on
  ProxyPass / http://localhost:3001/
  ProxyPassReverse / http://localhost:3001/

  ...
</VirtualHost *:80>
```

Which entails this change to your `.env` file:


```
REACT_APP_API_BASE=https://api.mutualauth.com
```

Do the same for the web instance.
