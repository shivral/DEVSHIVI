import React from "react";
import RoomJoin from "./RoomJoin";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid,Button,Typography,ButtonGroup,} from "@material-ui/core";
import {
  BrowserRouter as Router,Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function HomePage(props) {

  const homepagerender=()=>{
  return(
    <Grid container spacing={2}>
      <Grid item xs={12} align='center'>
        <Typography variant="h3" compact="h3">Party </Typography>
      </Grid>
      <Grid item xs={12} align='center'>
        <ButtonGroup variant='contained' >
          <Button to='/join' component={Link}> JOIN A ROOM</Button>
          <Button to='/create' component={Link} color="secondary"> CREATE A ROOM</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )}

    // return(<h1>Home page</h1>);
  return (
    <Router>
      <Switch>
          <Route exact path="/">{homepagerender}</Route>
          <Route path="/join" component={RoomJoin}></Route>
          <Route path="/create" component={CreateRoomPage}></Route>
          <Route path="/room/:roomCode" component={Room}></Route>
          
      </Switch>
    </Router>
  );
}
