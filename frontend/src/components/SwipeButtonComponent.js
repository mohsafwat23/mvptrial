import React from 'react';

export class SwipeButtonComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  changeButtonState() {
    //call the Callback function
    this.props.swiped(this.props.direction, this.props.restaurantID);
  }

  render() {
    return (
      <button
        onClick={this.changeButtonState.bind(this)}
      >
        {this.props.direction}
      </button>
    );
  }
}
