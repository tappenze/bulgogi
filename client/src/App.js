import React, { Component } from "react";
import "./App.css";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "Not Checked", albumArt: "" },
      artist: { name: "Verify", face: "" },
      songs: {
        name1: "",
        artist1: "",
        name2: "",
        artist2: "",
        name3: "",
        artist3: "",
        name4: "",
        artist4: ""
      },
      albums: {
        album1: "",
        artist1: "",
        album2: "",
        artist2: "",
        album3: "",
        artist3: "",
        album4: "",
        artist4: ""
      },
      playlists: {
        playlist1: "",
        creator1: "",
        playlist2: "",
        creator2: "",
        playlist3: "",
        creator3: "",
        playlist4: "",
        creator4: ""
      }
    };
  }
  parseUrl() {
    var url = document.location.href,
        params = url.split("?")[1].split("&"),
        data = {},
        tmp;
    for (var i = 0; i < params.length; i++) {
      tmp = params[i].split("=");
      data[tmp[0]] = tmp[1];
    }
    document.getElementById("Overall").innerHTML = data.name;
    var str = data.name;
    var search_type = str.slice(0, str.indexOf("/"));
    var search_contents = str.slice(str.indexOf("/") + 1, str.length);
    document.getElementById("type").innerHTML = search_type;
    document.getElementById("contents").innerHTML = search_contents;
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  }

  getSongByArtist(artist_name) {
    spotifyApi.searchArtists(artist_name).then(response => {
      this.setState({
        artist: {
          name: response.artists.items[0].name,
          face: response.artists.items[0].images[0].url
        }
      });
    });
  }

  getSong(song_name) {
    spotifyApi.searchTracks(song_name).then(response => {
      this.setState({
        songs: {
          name1: response.tracks.items[0].name,
          artist1: response.tracks.items[0].artists[0].name,
          name2: response.tracks.items[1].name,
          artist2: response.tracks.items[1].artists[0].name,
          name3: response.tracks.items[2].name,
          artist3: response.tracks.items[2].artists[0].name,
          name4: response.tracks.items[3].name,
          artist4: response.tracks.items[3].artists[0].name
        }
      });
    });
  }

  getAlbums(album_name) {
    spotifyApi.searchAlbums(album_name).then(response => {
      this.setState({
        albums: {
          album1: response.albums.items[0].name,
          artist1: response.albums.items[0].artists[0].name,
          album2: response.albums.items[1].name,
          artist2: response.albums.items[1].artists[0].name,
          album3: response.albums.items[2].name,
          artist3: response.albums.items[2].artists[0].name,
          album4: response.albums.items[3].name,
          artist4: response.albums.items[3].artists[0].name
        }
      });
    });
  }

  getPlaylists(playlist_name) {
    spotifyApi.searchPlaylists(playlist_name).then(response => {
      this.setState({
        playlists: {
          playlist1: response.playlists.items[0].name,
          creator1: response.playlists.items[0].owner.display_name,
          playlist2: response.playlists.items[1].name,
          creator2: response.playlists.items[1].owner.display_name,
          playlist3: response.playlists.items[2].name,
          creator3: response.playlists.items[2].owner.display_name,
          playlist4: response.playlists.items[3].name,
          creator4: response.playlists.items[3].owner.display_name
        }
      });
    });
  }

  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
        <div>
          Song 1: {this.state.songs.name1} By {this.state.songs.artist1}
        </div>
        <div>
          Song 2: {this.state.songs.name2} By {this.state.songs.artist2}
        </div>
        <div>
          Song 3: {this.state.songs.name3} By {this.state.songs.artist3}
        </div>
        <div>
          Song 4: {this.state.songs.name4} By {this.state.songs.artist4}
        </div>

        <div>
          Album 1: {this.state.albums.album1} By {this.state.albums.artist1}
        </div>
        <div>
          Album 2: {this.state.albums.album2} By {this.state.albums.artist2}
        </div>
        <div>
          Album 3: {this.state.albums.album3} By {this.state.albums.artist3}
        </div>
        <div>
          Album 4: {this.state.albums.album4} By {this.state.albums.artist4}
        </div>

        <div>
          Playlist 1: {this.state.playlists.playlist1} By{" "}
          {this.state.playlists.creator1}
        </div>
        <div>
          Playlist 2: {this.state.playlists.playlist2} By{" "}
          {this.state.playlists.creator2}
        </div>
        <div>
          Playlist 3: {this.state.playlists.playlist3} By{" "}
          {this.state.playlists.creator3}
        </div>
        <div>
          Playlist 4: {this.state.playlists.playlist4} By{" "}
          {this.state.playlists.creator4}
        </div>

        <div>Artist searched for: {this.state.artist.name}</div>
        <div>
          <img src={this.state.artist.face} style={{ height: 150 }} />
        </div>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        {this.state.loggedIn && (
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        )}
        {this.state.loggedIn && (
          <button onClick={() => this.getSongByArtist("Cher")}>
            Get artist Cher
          </button>
        )}
        {this.state.loggedIn && (
          <button onClick={() => this.getSong("Hero")}>Get Songs</button>
        )}
        {this.state.loggedIn && (
          <button onClick={() => this.getAlbums("Stoney")}>Get Albums</button>
        )}
        {this.state.loggedIn && (
          <button onClick={() => this.getPlaylists("Fight")}>
            Get Playlists
          </button>
        )}
      </div>
    );
  }
}

export default App;
