import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: ''
      }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888'>
          <button>Login with Spotify</button>
        </a>
        <div>Now Playing { this.state.nowPlaying.name } </div>
        <div>
          <img src={ this.state.nowPlaying.image } style={ {width: 100} }/>
        </div>
      </div>
    );
  }
}

export default App;
