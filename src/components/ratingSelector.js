import React, { Component } from 'react';

class RatingSelector extends Component {
  constructor() {
    super();
    this.state = {
      ratings: new Array(21 - 0).fill().map((d, i) => (i * 0.5) + 0)
    }
  }
  render() {
    return (
      <select value={this.props.minimumRating} onChange={this.props.onChange}>
        {
          this.state.ratings.map(rating => 
            <option value={rating} key={rating}>{rating}</option>
          )
        }
      </select>
    );
  }
}

export default RatingSelector;
