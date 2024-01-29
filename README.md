# sdk-app

# Spotify Web API SDK - TypeScript

This is a JavaScript/TypeScript SDK for the [Spotify Web API](https://developer.spotify.com/web-api/).

## Requirements

Because this SDK uses `fetch` both in Node and the Browser, and ESM, we require the following:

- Node 18.0.0 or higher
- A modern, version infinite, browser

The package contains both an ESM and CommonJS build, so you can use it in both Node and the Browser.

## Using this in your project

```bash
npm install @spotify/web-api-ts-sdk
```

## Running the example app

First install the dependencies:

```bash
npm install
```

Create a `.env` file in the example directory with your `client_id` and redirect url:

```bash .env
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_for_tests
VITE_REDIRECT_TARGET=http://localhost:3000
```

To run the app:

```bash
npm run start
```

### Creating a client instance

Creating an instance of the SDK is easy, and can be done in a number of ways depending on which form of authentication you want to use.

```js
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

// Choose one of the following:
const sdk = SpotifyApi.withUserAuthorization("client-id", "https://localhost:3000", ["scope1", "scope2"]);
const sdk = SpotifyApi.withClientCredentials("client-id", "secret", ["scope1", "scope2"]);
```

Each of these factory methods will return a `SpotifyApi` instance, which you can use to make requests to the Spotify Web API.

Once you have an authenticated instance of the SDK, you can make requests to the Spotify Web API by using the methods exposed on the client instance of the API. Types are embedded in the package, so if you're using Visual Studio Code or other compatible IDEs, you should get intellisense and type checking by default.

```js
const items = await sdk.search("The Beatles", ["artist"]);

console.table(items.artists.items.map((item) => ({
    name: item.name,
    followers: item.followers.total,
    popularity: item.popularity,
})));
```

### Authentication Methods

- Authorization Code Flow with PKCE
- Client Credentials Flow
- Implicit Grant Flow
- Mixed Server and Client Side Authentication

We do auto-token refresh when expired and a refresh token is available.


----------------------


### Deploying a React App to GitHub Pages

- [ ] https://github.com/gitname/react-gh-pages


```{bash}
$ git remote add origin https://github.com/hluebbering/sdk-app.git
git remote add origin https://github.com/hluebbering/sdk-app.git
```


"build:mjs": "tsc --project tsconfig.mjs.json && cp res/package.mjs.json dist/mjs/package.json",
    "build:cjs": "tsc --project tsconfig.cjs.json && cp res/package.cjs.json dist/cjs/package.json",


    "build": "npm run build:cjs && npm run build:mjs",


const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);