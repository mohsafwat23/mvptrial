import React, { Component } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import { ButtonGroup, Button, Grid, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'; 

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);   
    }
//handles if person is already in room
    async componentDidMount() {
        fetch('/api/user-in-room').then((response) => response.json()).then((data) =>{
            this.setState({
                roomCode: data.code,
            });
        });
    }

    renderHomePage(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" compact="h3">
                        <div id="outvite-title"><h3>outvite</h3></div>
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant = "contained" color="primary">
                        <div id="join-a-room"><Button color="primary" to='/join' component={Link}><h3>Join a Room</h3></Button></div>
                        <div id="create-a-room"><Button color="primary" to='/create' component={Link}><h3>Create a Room</h3></Button></div>
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
