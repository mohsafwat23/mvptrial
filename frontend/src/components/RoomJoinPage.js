import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      username: "",
      roomError: "",
      usernameError: "",
    };
    this.handleRoomTextFieldChange = this.handleRoomTextFieldChange.bind(this);
    this.handleUsernameTextFieldChange =
      this.handleUsernameTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  }

  renderUsernameTextField() {
    return (
      <Grid item xs={12} align="center">
        <TextField
          error={this.state.usernameError}
          label="username"
          placeholder="Enter a username"
          value={this.state.username}
          helperText={this.state.usernameError}
          variant="outlined"
          onChange={this.handleUsernameTextFieldChange}
        />
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">
            Join a Room
          </Typography>
        </Grid>
        {this.renderUsernameTextField()}
        <Grid item xs={12} align="center">
          <TextField
            error={this.state.roomError}
            label="code"
            placeholder="Enter a room code"
            value={this.state.roomCode}
            helperText={this.state.roomError}
            variant="outlined"
            onChange={this.handleRoomTextFieldChange}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={this.roomButtonPressed}
          >
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
  handleRoomTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }

  handleUsernameTextFieldChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  roomButtonPressed() {
    if (this.state.username == "") {
      this.setState({ usernameError: "invalid username" });
    } else {
      this.setState({ usernameError: "" });

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: this.state.roomCode,
        }),
      };

      fetch("/api/join-room", requestOptions)
        .then((response) => {
          if (response.ok) {
            this.props.history.push(`/room/${this.state.roomCode}`);
          } else {
            this.setState({ roomError: "room not found" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
