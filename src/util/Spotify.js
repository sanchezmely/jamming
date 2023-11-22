let accessToken ="";
const clientID = "b9666d88291f441aa5b78a318235c721";
const redirectURI = "http://localhost:3000/";
const Spotify = {
 getAccessToken() {
    if (accessToken) {
         return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
        accessToken = urlAccessToken[1];
        const expiresIn = Number(urlExpiresIn[1]);
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
    } else {
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}
        &response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        window.location = redirect;
    }
  },

  search(term){
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: { Authorization: `Bearer ${accessToken}`},  
    })
    .then((response) => {
        return response.json();
    })
    .then((jsonResponse) => {
        if(!jsonResponse.tracks) {
            return [];
    }
        return jsonResponse.tracks.items.map(tracks => ({
            id:tracks.id,
            name: tracks.name,
            artist: tracks.artists[0].name,
            album: tracks.album.name,
            uri:tracks.uri,
        }));
    });
  },

  savePlaylistName(name, trackURIs) {
    if (!name || !trackURIs) {
        return;
    }

let accessToken = Spotify.getAccessToken();
const headers = { Authorization: `Bearer ${accessToken}`}

  },
};


export default Spotify;