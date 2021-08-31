import React, { Component } from "react";
import { Button, Grid, List, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import TinderCard from "react-tinder-card";
let globalRoomSocket;

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allrestaurants: [],
      //name:'',
      //image:'',
      votesToSkip: 2,
      lastDirection: null,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    //this.updateShowSettings = this.updateShowSettings.bind(this);
    //this.renderSettingsButton = this.renderSettingsButton.bind(this);
    //this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.getRoomDetails();
  }

  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }

        return response.json();
      })
      .then((data) => {
        this.setState({
          allrestaurants: data.restaurant,
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  componentDidMount(){
    const roomSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/room/'
        + this.roomCode 
    );
    
    roomSocket.onmessage = (event) => {

      console.log(event.data);
      var data = JSON.parse(e.data);
      var message = {text: data.message, date: data.utc_time};
	    message.date = moment(message.date).local().format('YYYY-MM-DD HH:mm:ss');
	    
      let updated_messages = [...this.state.messages];
      updated_messages.push(message);
      this.setState({messages: updated_messages});
    };

    globalRoomSocket = roomSocket;
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  renderSettings() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={this.state.votesToSkip}
            guestCanPause={this.state.guestCanPause}
            roomCode={this.roomCode}
            updateCallback={this.getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }

  // renderSettingsButton() {
  //   return (
  //     <Grid item xs={12} align="center">
  //       <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={() => this.updateShowSettings(true)}
  //       >
  //         Settings
  //       </Button>
  //     </Grid>
  //   );
  // }

  render() {
    const rests = this.state.allrestaurants;

      
    const outOfFrame = (name) => {
      console.log(name + " left the screen!");
    };

    const swiped = (direction, nameToDelete) => {
      console.log("removing: " + nameToDelete);
      this.setState({ lastDirection: direction });
    
      globalRoomSocket.send(JSON.stringify({
        'restaurant': nameToDelete,
      }));
    };

    return (
      <Grid container spacing={1}>
        <div className="leaveroom">
          <Grid item xs={12} align="center">
            <div className="RoomCode">
              <h3>Room Code: {this.roomCode}</h3>
            </div>
            <Button
              color="secondary"
              variant="contained"
              onClick={this.leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </div>
        <Grid item xs={12} align="center">
          <div>
            <div className="cardContainer">
              {rests.map((restaurantcard) => (
                <TinderCard
                  className="swipe"
                  key={restaurantcard.id}
                  onSwipe={(dir) => swiped(dir, restaurantcard.name)}
                  onCardLeftScreen={() => outOfFrame(restaurantcard.name)}
                >
                  <div
                    style={{
                      backgroundImage: "url(" + restaurantcard.image + ")",
                    }}
                    className="card"
                  >
                    <div className="name">
                      <h3>{restaurantcard.name}</h3>
                      {restaurantcard.price != "nan" ? (
                        <h4>
                          {restaurantcard.cuisine} - {restaurantcard.price}
                        </h4>
                      ) : (
                        <h4>{restaurantcard.cuisine}</h4>
                      )}
                      <div id="room-buttons">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => window.open(restaurantcard.map_url)}
                        >
                          Directions
                        </Button>
                        {restaurantcard.menu != "nan" ? (
                          <Button
                            variant="contained"
                            color="tertiary"
                            onClick={() => window.open(restaurantcard.menu)}
                          >
                            Menu
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="rating">
                      <h3>&nbsp;&nbsp;{restaurantcard.rating}/5⭐️</h3>
                    </div>
                  </div>
                </TinderCard>
              ))}
            </div>

            {/* {this.state.lastDirection ? <h2 className='infoText'>You swiped {this.state.lastDirection}</h2> : <h2 className='infoText' />} */}
          </div>
        </Grid>
        {/* <Grid item xs={12} align ="center">
                <Typography variant="h6" component="h6">
                    Host: {this.state.isHost.toString()}
                </Typography>
            </Grid>
            {this.state.isHost ? this.renderSettingsButton() : null} */}
      </Grid>
    );
  }
}
