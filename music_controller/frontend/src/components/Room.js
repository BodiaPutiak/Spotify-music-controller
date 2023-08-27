import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from '@material-ui/core';
import { CreateRoomPage } from "./CreateRoomPage";
import  MusicPlayer  from "./Player";

export function Room() {
  let { roomCode } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
    spotifyAuthenticated: false,
    song: {}
});



useEffect(() => {
  const interval = setInterval(getCurrentSong, 1000);
  return () => clearInterval(interval); 
}, [state]);

useEffect(() => {
  getRoomDetails();
}, []);

function getRoomDetails() {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setState({
          ...state,
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.host,
        });
        if (data.host) {
          authenticateSpotify();
        }
      });
  };


  const clearRoomCode = () => {
    roomCode = null;
  }

  function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setState({ 
          ...state,
          spotifyAuthenticated: data.status 
        });
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  function getCurrentSong() {
    fetch('/spotify/current-song').then((response) => {
      if (!response.ok) {
        return {};
      } else {
        return response.json();
      }
    }).then((data) => {
      setState({
        ...state,
        song: data
      });
    });
  }

  const leaveRoom = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }
    fetch('/api/leave-room', requestOptions).then((_response) => {
      navigate('/');
    });
    clearRoomCode();
  }

  const updateShowSettings = (value) => {
    setState({
      ...state,
      showSettings: value
    })
  };

  const renderSettingsButton = () => {

    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
          Settings
        </Button>
      </Grid>
    );
  };


  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage update={true} 
          votesToSkip={state.votesToSkip} 
          guestCanPause={state.guestCanPause}
          roomCode={roomCode}
          updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" onClick={() => updateShowSettings(false)}>
            Close
          </Button>
        </Grid>
        
      </Grid>
    );
  };

  if (state.showSettings) {
    return renderSettings();
  }


  
  return (

    <Grid container >
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Code: {roomCode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <MusicPlayer {...state.song} />
        </Grid>
        {state.isHost ? renderSettingsButton() : null}
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" onClick={leaveRoom}>
            Leave room
          </Button>
        </Grid>
    </Grid>
  );
}

