import React, { Component } from 'react';

class GenreList extends Component {
  render() {
    return (
      <div>
        {
          this.props.genres.map(genre => 
            <label key={genre.name}>
              <input type="checkbox" value={genre.id} defaultChecked={genre.isSelected} 
                onChange={this.props.onChange} />{genre.name}
            </label>
          )
        }
      </div>
    );
  }
}

export default GenreList;
