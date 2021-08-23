import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { ButtonGroup, Button, Grid, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }
  //handles if person is already in room
  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomePage() {
    return (
      <Grid container spacing={1}>
        <div id="outvite-title">
          <Grid item xs={12} align="center">
            <Typography variant="h3" compact="h3">
              <h2>
                OUT<span>&#62;</span>ITE
              </h2>
            </Typography>
          </Grid>
        </div>
        <br></br>
        <div id="homepage-text">
          <Grid item xs={12} align="left">
            <Typography variant="h3" compact="h3">
              <h3>
                Stop Wasting Time,<br></br> Start Enjoying It!
              </h3>
              <br></br>
              <h4>
                Save time deciding on where to go out with friends and family!
              </h4>
              <br></br>
            </Typography>
          </Grid>
        </div>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <div id="join-a-room">
              <Button color="primary" to="/join" component={Link}>
                <h3>Join a Room</h3>
              </Button>
            </div>
            <div id="create-a-room">
              <Button color="primary" to="/create" component={Link}>
                <h3>Create a Room</h3>
              </Button>
            </div>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return this.state.roomCode ? (
                <Redirect to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              );
            }}
          />
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}
