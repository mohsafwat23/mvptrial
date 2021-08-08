import React, { Component , useState} from 'react';
import { Button, Grid, Typography } from "@material-ui/core";
import CreateRoomPage from './CreateRoomPage';
import TinderCard from 'react-tinder-card';


export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantsList: [],
            //name:'',
            //image:'',
            votesToSkip: 2,
            lastDirection: null,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.leaveButtonPressed=this.leaveButtonPressed.bind(this);
        this.updateShowSettings=this.updateShowSettings.bind(this);
        this.renderSettingsButton=this.renderSettingsButton.bind(this);
        this.renderSettings=this.renderSettings.bind(this);
        this.getRoomDetails= this.getRoomDetails.bind(this);
        this.getRoomDetails();
        this.fetchCards = this.fetchCards.bind(this);
    }

    getRoomDetails(){
        fetch('/api/get-room' + '?code=' + this.roomCode)
        .then((response) => { 
            if (!response.ok) {
                this.props.leaveRoomCallback();
                this.props.history.push('/');
            }

            return response.json()
        
        }).then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
        });
    }

    leaveButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            };
            fetch("/api/leave-room", requestOptions)
            .then((_response) => {
                this.props.leaveRoomCallback();
                this.props.history.push('/');
            });
    }

    updateShowSettings(value){
        this.setState({
            showSettings: value,
        })
    }

    componentDidMount(){
        this.fetchCards()
    }

    fetchCards(){
        console.log('Fetching...')

        fetch('/api/restaurants')
        .then(response => response.json())
        .then(data => {
            this.setState({
                restaurantsList : data,
                //id: data[0].id,
                //name: data[0].name,
                //cuisine: data[0].cuisine,
                //image: data[0].image,
            });
        });
    }


    renderSettings() {
        return (
        <Grid container spacing={1}>
            <Grid item xs={12} align ="center">
                <CreateRoomPage 
                update={true} 
                votesToSkip={this.state.votesToSkip} 
                guestCanPause={this.state.guestCanPause}
                roomCode={this.roomCode}
                updateCallback={this.getRoomDetails}
                />
            </Grid>
            <Grid item xs={12} align ="center">
            <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => this.updateShowSettings(false)}>
                    Close
                </Button>

            </Grid>
        </Grid>
        );
    }

    renderSettingsButton(){
        return(
            <Grid item xs={12} align ="center">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => this.updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }



    

    render() {
        const characters = this.state.restaurantsList

        const swiped = (direction, nameToDelete) => {
            console.log('removing: ' + nameToDelete)
            this.setState({lastDirection: direction})
          }
        
        const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
        }

        if (this.state.showSettings){
            return this.renderSettings();
        }
        return <Grid container spacing={1}>
            <Grid item xs={12} align ="center">
            <div>
               <div className='cardContainer'>
                {characters.map((character)=>
                    <TinderCard className='swipe' key={character.id} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                        <div style={{ backgroundImage: 'url(' + character.image + ')' }} className='card'>
                        <h3>{character.name}</h3>
                        </div>
                    </TinderCard>
                    )
                    }
                </div>
                
                 {this.state.lastDirection ? <h2 className='infoText'>You swiped {this.state.lastDirection}</h2> : <h2 className='infoText' />}
            </div>   
            </Grid>
            <Grid item xs={12} align ="center">
                <Typography variant="h6" component="h6">
                    Host: {this.state.isHost.toString()}
                </Typography>
            </Grid>
            {this.state.isHost ? this.renderSettingsButton() : null}
            <Grid item xs={12} align ="center">
                <Button color="secondary" variant="contained" onClick={this.leaveButtonPressed}>Leave Room</Button>
            </Grid>
        </Grid>;
        
    }
}