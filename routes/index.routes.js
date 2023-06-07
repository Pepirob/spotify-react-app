const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/artist-search", (req, res, next) => {
  spotifyApi
    .searchArtists(`${req.body.artist}`, { limit: 15 })
    .then((data) => {
      console.log("The received data from the API: ", data.body);
      res.json(data);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

router.get("/album/:artistId", (req, res, next) => {
  spotifyApi
    .getArtistAlbums(`${req.params}`, { limit: 15 })
    .then((data) => {
      console.log("The received data from the API: ", data.body);
      res.json(data);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

router.get("/tracks/:albumId", (req, res, next) => {
  spotifyApi
    .getArtistAlbums(`${req.params}`, { limit: 15 })
    .then((data) => {
      console.log("The received data from the API: ", data.body);
      res.json(data);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

router.get("/");
module.exports = router;
