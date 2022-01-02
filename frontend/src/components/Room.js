import React, { useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function Room(props) {
  const [votesToskip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const roomCode = props.match.params.roomCode;
  const [spotifyAuth, setSpotifyAuth] = useState(false);

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuth(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url)
            });
        }
      });
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: roomCode,
    }),
  };
  fetch("http://127.0.0.1:8000/api/checkroom", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.good === "true") {
        setIsValid(true);
        if (data.host === "true") {
          setIsHost(true);
          authenticateSpotify();
        }
      } else {
        setIsValid(false);
      }
      
    });
  const render = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            CODE :{roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            GUEST CAN PAUSE :{guestCanPause.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Votes to skip :{votesToskip}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            isHost :{isHost.toString()}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button to="/" variant="outlined" component={Link} color="secondary">
            BACK
          </Button>
        </Grid>
      </Grid>
    );
  };

  if (isValid) {
    return render();
  } else {
    return (
      <div>
        <Typography variant="h4" color="textSecondary">
          BAD ROOM CODE
        </Typography>
        <Grid contianer>
          <Grid item xs={12} align="center">
            <Button
              to="/"
              variant="outlined"
              component={Link}
              color="secondary"
            >
              BACK
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
