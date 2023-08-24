import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {
    Grid,
    Button,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    FormHelperText,
    Collapse,
  } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";


export function CreateRoomPage(props) {
    const navigate = useNavigate();

    let [state, setState] = useState({
        guestCanPause: props.guestCanPause,
        votesToSkip: props.votesToSkip,
        errorMsg: '',
        successMsg: ''
    })
    const handleVotesChange = (event) => {
        setState({
            ...state,
            votesToSkip: event.target.value
        });
    };

    const handleGuestCanPauseChange = (event) => {
        setState({
            ...state,
            guestCanPause: event.target.value === 'true' ? true : false
        });
    };

    const handleRoomButtonPressed = () => {
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            votes_to_skip: state.votesToSkip,
            guest_can_pause: state.guestCanPause
          })
        };
      
        fetch('/api/create-room', requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => navigate("/room/" + data.code))
          .catch((error) => {
            console.error('Error:', error);
          });
      };

      const handleUpdateButtonPressed = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                votes_to_skip: state.votesToSkip,
                guest_can_pause: state.guestCanPause,
                code: props.roomCode
            })
        };
        fetch('/api/update-room', requestOptions)
        .then((response) => {
            if (response.ok) {
                setState({
                    ...state,
                    successMsg: 'Room updated successfully!'
                })
            } else {
                setState({
                    ...state,
                    errorMsg: 'Error updatind room...'
                    
                });
            }
            props.updateCallback(); 
        });
      }

      const renderCreateButtons = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" onClick={handleRoomButtonPressed}> Create A Room</Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        );
      };

      const renderUpdateButtons = () => {
        return (
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleUpdateButtonPressed}> Update A Room</Button>
            </Grid>
        );
      }

      

      const title = props.update ? 'Update Room' : 'Create a Room';

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} align="center">
                <Collapse in={state.errorMsg != '' || state.successMsg != ''}>
                    
                    
                    {state.successMsg != "" ? (<Alert severity="success" onClose={() => {setState({...state, successMsg: ""})}}>{state.successMsg}</Alert>)
                    : (<Alert severity="error" onClose={() => {setState({...state, errorMsg: ""})}}>{state.errorMsg}</Alert>)}
                    
                </Collapse>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align='center'>
                            Guest Control of Playback State
                        </div>
                    </FormHelperText>
                    <RadioGroup row defaultValue={props.guestCanPause} onChange={handleGuestCanPauseChange}>
                        <FormControlLabel value="true" control={<Radio color="primary"/>}  
                        label="Play/Pause" 
                        labelPlacement="bottom"
                        />
                        <FormControlLabel value="false" control={<Radio color="secondary"/>}  
                        label="No control" 
                        labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField required={true} type="number"
                    onChange={handleVotesChange} 
                    defaultValue={state.votesToSkip}
                    inputProps={{
                        min: 1,
                        style: {textAlign: "center"}
                    }} 
                    />
                    <FormHelperText>
                        <div align="center">
                            Votes Required To Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            {props.update ? renderUpdateButtons() : renderCreateButtons()}
        </Grid>
    );
}