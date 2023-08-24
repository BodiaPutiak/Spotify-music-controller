import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";


   

export function HomePage() {
    const navigate = useNavigate();
    let [state, setState] = useState({
        roomCode: null,
    });

    const handleJoinRoomClick = async () => {
        const response = await fetch('/api/user-in-room');
        const data = await response.json();
    
        if (data.code !== null) {
          navigate(`/room/${data.code}`);
        } else {
            navigate('/join')
        }
      };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">
                    Spotyfy Music Controller
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disabledElevation variant="contained" color="primary">
                    <Button color="primary" onClick={handleJoinRoomClick}>
                        Join a Room
                    </Button>
                    <Button color="secondary" to="/create" component={ Link }>
                        Create A Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}