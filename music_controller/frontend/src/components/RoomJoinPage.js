import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

export function RoomJoinPage() {

    const navigate = useNavigate();

    let [state, setState] = useState({
        roomCode: '',
        error: ''
    });

    const handleTextFieldChange = (event) => {
        setState({
            ...state,
            roomCode: event.target.value  
        }) 
    };

    const roomButtonPressed = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: state.roomCode,
            })
        };
        fetch('/api/join-room', requestOptions).then((response) => {
            if (response.ok) {
                navigate(`/room/${state.roomCode}`)
            } else {
                setState({error: 'Room not found.'})
            }
        }).catch((error) => {console.log(error)});
    };


    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h4" align="center" margin-top="100px">
                    Join A Room 
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField 
                error={state.error}
                label="Code"
                placeholder="Enter a Room Code"
                value={state.roomCode}
                helperText={state.error}
                variant="outlined"  
                onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}