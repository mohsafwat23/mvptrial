import React, { Component, useMemo } from "react";
import { Button, Grid, List, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import TinderCard from "react-tinder-card";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allrestaurants: [],
      //name:'',
      //image:'',
      lastDirection: null,
      isHost: false,
      showSettings: false,
      matched : false,
      matchedname : '',
      matchedimage: '',
      matchedmap: '',
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    //this.updateShowSettings = this.updateShowSettings.bind(this);
    //this.renderSettingsButton = this.renderSettingsButton.bind(this);
    //this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.getRoomDetails();
    //this.fetchCards = this.fetchCards.bind(this);
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
          isHost: data.is_host,
        });
      });
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

    var interval = setInterval(() => {
      $.ajax({

        url: "/api/check/match",
        type: "POST",
        dataType: 'json',
        data: { "roomCode" : this.props.match.params.roomCode},
        cache: false,

        success: function(data) {
          console.log(data);

          if (data.is_match) {
            this.state.matched = true
            this.state.matchedname = data.name
            this.state.matchedimage = data.image
            this.state.matchedmap = data.map_url
          }

        }.bind(this),

        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }, 3000);

    const alreadyRemoved = []
    let rests = this.state.allrestaurants;

    const swiped = (direction, uniqueCardID) => {
      console.log("removing: " + uniqueCardID);
      this.setState({ lastDirection: direction });
      console.log(uniqueCardID);
      if (direction === 'right') {
        $.ajax({

          url: "/api/swipe",
          type: "POST",
          dataType: 'json',
          data: { "uniqueCardID" : uniqueCardID, "roomCode" : this.props.match.params.roomCode},
          cache: false,

          success: function(data) {
            console.log(data);


          }.bind(this),

          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      }
    };

    const outOfFrame = (name) => {
      console.log(name + " left the screen!");
    };

    if(this.state.matched){
      return(
        <Grid item xs={12} align="center">
          <div className="cardContainer">
            <div style={{ backgroundImage: "url(" + this.state.matchedimage + ")",}} className='card'></div>
            <h3>{this.state.matchedname}</h3>
            <Button variant="contained" color="primary" onClick={() => window.open(this.state.matchedmap)} >
                Directions
            </Button>
          </div>
        </Grid>
      )
    }

    else{
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
              onClick = {this.leaveButtonPressed}
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
                  onSwipe={(dir) => {swiped(dir, restaurantcard.id)}}
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
}