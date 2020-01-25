import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

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
    if (params.access_token) {
      spotify.setAccessToken(params.access_token);
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
  getNowPlaying() {
    spotify.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          name: response.item.name,
          image: response.item.images[0].url
        });
      })
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
        <button onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      </div>
    );
  }
}

export default App;
