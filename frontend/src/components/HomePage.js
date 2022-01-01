import React from "react";
import RoomJoinPage from "./RoomJoinPage";
import RoomJoin from "./RoomJoin";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function HomePage(props) {
    // return(<h1>Home page</h1>);
  return (
    <Router>
      <Switch>
          <Route exact path="/"><h1>this is the home page</h1></Route>
          <Route path="/join" component={RoomJoin}></Route>
          <Route path="/create" component={CreateRoomPage}></Route>
          <Route path="/room/:roomCode" component={Room}></Route>
          
      </Switch>
    </Router>
  );
}
