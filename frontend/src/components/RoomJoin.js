import { Button, FormControl, FormHelperText, TextField ,Grid, Typography} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RoomJoin(prop) {
  const [roomCode, setRoomCode] = useState("ABSBSBB");
  const url="http://127.0.0.1:8000/room/"
  const handleOnChangeText=(e)=>{
      setRoomCode(e.target.value)

  }
  const handleOnSubmit=(e)=>{console.log(roomCode)}
  return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
            <Typography component='h5' variant='h5' color='textPrimary'>
                JOIN A ROOM BY ENTERING ITS CODE
            </Typography>
        </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            onChange={handleOnChangeText}
            required={true}
            type="text"
            defaultValue={"AAAAAAAA"}
            inputProps={{ textAlign: "center" }}
          >
              <FormHelperText>
                  <div align="center">ENTER ROOM CODE</div>
              </FormHelperText>
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={handleOnSubmit} to={'/'+"room/"+roomCode} component={Link}>
              JOIN ROOM
          </Button>
      </Grid>
    </Grid>
  );
}
