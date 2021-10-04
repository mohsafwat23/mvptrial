import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import TinderCard from "react-tinder-card";
import { sortByLocation } from "./Utils";
import { OpenHours } from "./hours";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allrestaurants: [],
      lastDirection: null,
      isHost: false,
      showSettings: false,
      matched : false,
      matchedname : '',
      matchedimage: '',
      matchedmap: '',
      swipeClassName: "swipe",
      nextCard: ""
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
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
          isHost: data.is_host,
          matched: data.found_match
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

  openDirection() {
    window.open(this.state.matchedmap)
  }

  render() {
    sortByLocation(this.state.allrestaurants)
    OpenHours(this.state.allrestaurants)
    const restaurants = this.state.allrestaurants;

    const checkMatch = () => {
      console.log("reached here");
      $.ajax ({
        url: "/api/check/match",
        type: "POST",
        dataType: 'json',
        data: { "roomCode" : this.props.match.params.roomCode},
        cache: false,
    
        success: function(data) {
          if (data.is_match) {
            console.log(data);
            this.state.matched = true
            this.state.matchedname = data.name
            this.state.matchedimage = data.image
            this.state.matchedmap = data.map_url
          }
          
        }.bind(this),
    
        error: function(xhr, status, err) {}.bind(this)
      });
    }

    const swipeHandler = (direction) => {


      console.log(direction + " wow");

      this.setState({ lastDirection: direction});
      var restaurantCards = document.querySelectorAll(".swipe")
      for (var i = restaurantCards.length - 1; i >= 0; i--) {
  
        if (restaurantCards[i].style.display !== 'none') {
          restaurantCards[i].style.display = 'none'
          
          if (direction === 'right') {
            console.log(restaurantCards[i].classList[0]);
            console.log("reached herererererer");
            $.ajax({
              url: "/api/swipe",
              type: "POST",
              dataType: 'json',
              data: { "uniqueCardID" : restaurantCards[i].classList[0], "roomCode" : this.props.match.params.roomCode},
              cache: false,
              success: function(data) {
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
              }.bind(this)
            });


            $.ajax ({
              url: "/api/check/match",
              type: "POST",
              dataType: 'json',
              data: { "roomCode" : this.props.match.params.roomCode},
              cache: false,
          
              success: function(data) {
                if (data.is_match) {
                  console.log(data);
                  this.state.matched = true
                  this.state.matchedname = data.name
                  this.state.matchedimage = data.image
                  this.state.matchedmap = data.map_url
                }
                
              }.bind(this),
          
              error: function(xhr, status, err) {}.bind(this)
            });
          }

          


          checkMatch.bind(this);
  
          break;
        }
      }
    }
  
    const swiped = (direction, uniqueCardID) => {
      console.log("removing: " + uniqueCardID);
      this.setState({ lastDirection: direction});
      console.log(uniqueCardID);
        
      if (direction === 'right') {
        console.log("reached hehehehe toooo");
        $.ajax({
          url: "/api/swipe",
          type: "POST",
          dataType: 'json',
          data: { "uniqueCardID" : uniqueCardID, "roomCode" : this.props.match.params.roomCode},
          cache: false,
          success: function(data) {
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
        $.ajax ({
          url: "/api/check/match",
          type: "POST",
          dataType: 'json',
          data: { "roomCode" : this.props.match.params.roomCode},
          cache: false,
      
          success: function(data) {
            if (data.is_match) {
              console.log(data);
              this.state.matched = true
              this.state.matchedname = data.name
              this.state.matchedimage = data.image
              this.state.matchedmap = data.map_url
            }
            
          }.bind(this),
      
          error: function(xhr, status, err) {}.bind(this)
        });
      }
    };

    const outOfFrame = (name) => {
      console.log(name + " left the screen!");
    };

    if (this.state.matched) {
      return(
        <Grid item xs={12} align="center">
          <div className="cardContainer">
            <div className="leaveRoom">
              <Button
                color="secondary"
                variant="contained"
                onClick = {this.leaveButtonPressed.bind(this)}
              >
                Leave Room
            </Button>
            </div>
            <div style={{ backgroundImage: "url(" + this.state.matchedimage + ")",}} className='card'></div>
            <h3>{this.state.matchedname}</h3>
            <Button variant="contained" color="primary" className="directionsButton" onClick={this.openDirection.bind(this)} >
                Directions
            </Button>
          </div>
        </Grid>
      )
    }

    else {
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
                onClick = {this.leaveButtonPressed.bind(this)}
              >
                Leave Room
              </Button>
            </Grid>
          </div>
          <Grid item xs={12} align="center">
            <div>
              <div className="cardContainer">
                {restaurants.map((restaurantCard) => (
                  <React.Fragment>
                    <TinderCard
                      className={`${restaurantCard.id} swipe`}
                      key={restaurantCard.id}
                      onSwipe={(dir) => {swiped(dir, restaurantCard.id)}}
                      onCardLeftScreen={() => outOfFrame(restaurantCard.name)}
                    >
                      <div
                        style={{
                          backgroundImage: "url(" + restaurantCard.image + ")",
                        }}
                        className="card"
                      >
                      
                      <div className="name">
                        <h3>{restaurantCard.name}</h3>
                        {restaurantCard.price != "nan" ? (
                          <h4>
                            {restaurantCard.cuisine} - {restaurantCard.price} - {restaurantCard.currentlyopen}- {restaurantCard.distance_from_user} mi 
                          </h4>
                          ) : (
                          <h4>{restaurantCard.cuisine} - {restaurantCard.distance_from_user} mi</h4>
                        )}
                        <div id="room-buttons">
                          {restaurantCard.menu != "nan" ? (
                            <Button
                              variant="contained"
                              color="tertiary"
                              className="directionsButton"
                              onClick={() => window.open(restaurantCard.menu)}
                            >
                              Menu
                            </Button>
                          ) : (
                          ""
                          )}
                        </div>
                      </div>
                      <div className="rating">
                        <h3>&nbsp;&nbsp;{restaurantCard.rating}/5⭐️</h3>
                      </div>
                    </div>
                            
                    </TinderCard>
                  </React.Fragment>
                ))}
              </div> 
            </div>
            <React.Fragment>
              <button
                color="secondary"
                variant="contained"
                class="swipeButton swipeButtonLeft"
                onClick = {swipeHandler.bind(this, "left")}
              >
                Left
              </button>
              <button
                color="secondary"
                variant="contained"
                class="swipeButton swipeButtonRight"
                onClick = {swipeHandler.bind(this, "right")}
              >
                Right
              </button>
            </React.Fragment>
            {this.state.lastDirection ? <h2 className='infoText'>You swiped {this.state.lastDirection}</h2> : <h2 className='infoText' />}
          </Grid>
        </Grid>
      );
    }
  }
}