import React from "react";
import { useState } from "react";
import {
  FormHelperText,
  FormControl,
  Button,
  Grid,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function CreateRoomPage(props) {
  const defaultvotes = 2;
  const [guestCanPause,setGuestCanPause]=useState(true);
  const [votesToSkip,setVotesToSkip]=useState(defaultvotes);
  const handleVotesChanged=(e)=>{
      console.log(e.target.value)
      setVotesToSkip(e.target.value)
  }
  const handleGuestCanPauseChange=(e)=>{
      setGuestCanPause(e.target.value==='true'?true:false)
  }
  const handleRoomButtonPressed=(e)=>{
      const requestOptions={method:"POST",
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify({
            votes_to_skip:votesToSkip,
            guest_can_pause:guestCanPause
        })    
    };
    fetch('http://127.0.0.1:8000/api/createroom',requestOptions).then((response)=>response.json()).then((data)=>console.log(data))
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Control of playback state</div>
          </FormHelperText>
          <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="Bottom"
            />
            <FormControlLabel
              value="False"
              control={<Radio color="secondary" />}
              label="NO control"
              labelPlacement="Bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={defaultvotes}
            onChange={handleVotesChanged}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          />
          <FormHelperText>
            <div align="center">votes required to skip song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="PRIMARY" variant="contained" onClick={handleRoomButtonPressed}>
          Create a Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          BACK
        </Button>
      </Grid>
    </Grid>
  );
}
