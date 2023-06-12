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
    .searchArtists(`${req.query.artist}`, { limit: 15 })
    .then((data) => {
      console.log("The received data from the API: ", data.body);
      res.json(data);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

router.get("/album/:artistId", (req, res, next) => {
  console.log(req.params.artistId);
  spotifyApi
    .getArtistAlbums(`${req.params.artistId}`, { limit: 15 })
    .then((data) => {
      console.log("The received data from the API: ", data.body);
      res.json(data);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

router.get("/tracks/:albumId", (req, res, next) => {
  console.log(req.params.albumId);
  spotifyApi
    .getAlbumTracks(`${req.params.albumId}`, { limit: 15 })
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
