import React, { Component } from 'react';
import './App.css';
import MovieLister from './containers/movieLister';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieLister />
      </div>
    );
  }
}

export default App;
