import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { getLocation } from "./Utils";

export default class CreateRoomPage extends Component {
  static defaultProps = {
    update: false,
    roomCode: null,
    username: "",
    usernameError: "",
    updateCallback: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      errorMsg: "",
      successMsg: "",
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    this.handleUsernameTextFieldChange =
      this.handleUsernameTextFieldChange.bind(this);
  }

  handleRoomButtonPressed() {
    if (this.state.username == "") {
      this.setState({ usernameError: "invalid username" });
    } else {

      this.setState({ usernameError: "" });

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host_username: this.state.username,
        }),
      };

      fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.history.push("/room/" + data.code));
    }
  }

  handleUpdateButtonPressed() {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: this.props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        this.setState({
          successMsg: "Room update successfully",
        });
      } else {
        this.setState({
          errorMsg: "Error updating room...",
        });
      }
      this.props.updateCallback();
    });
  }

  handleUsernameTextFieldChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  renderCreateButtons() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderUpdateButtons() {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  }

  renderUsernameTextField() {
    if (this.props.update) {
      return null;
    }

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
    const title = this.props.update ? "Update Room" : <div className="create-join-room-title"><h3>Create a Room</h3></div>;

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Collapse
            in={this.state.errorMsg != "" || this.state.successMsg != ""}
          >
            {this.state.successMsg != "" ? (
              <Alert
                severity="success"
                onClose={() => {
                  this.setState({ successMsg: "" });
                }}
              >
                {this.state.successMsg}
              </Alert>
            ) : (
              <Alert
                severity="error"
                onClose={() => {
                  this.setState({ errorMsg: "" });
                }}
              >
                {this.state.errorMsg}
              </Alert>
            )}
          </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <FormHelperText>
              <div align="center">Enter a username</div>
            </FormHelperText>
          </FormControl>
        </Grid> 
        {this.renderUsernameTextField()}
        {/* <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div className="create-join-room-title"><h4>Pick a Swiping Mode</h4></div>
            </FormHelperText>
            <RadioGroup
              row
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Explore"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="Custom"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <FormHelperText>
              <div align="center">Number of User in Group</div>
            </FormHelperText>
          </FormControl>
        </Grid> */}
        {this.props.update
          ? this.renderUpdateButtons()
          : this.renderCreateButtons()}
      </Grid>
    );
  }
}
