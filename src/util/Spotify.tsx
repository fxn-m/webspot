let accessToken = '';
// create constant variables for client ID and redirect URI.
const CLIENT_ID: string = 'e221dd36279d4db3ad6b956231058320';
let REDIRECT_URI: string;
if (window.location.href.includes('localhost')) {
  REDIRECT_URI = 'localhost:3000/WebSpot';
} else {
  REDIRECT_URI = 'https://fxn-m.com/webspot/';}

const Spotify = {
  getAccessToken() {

    /*
    Step 1: Check if the user’s access token is already set. If it is, return the value saved to access token.
    */

    if (accessToken) {
      return accessToken;
    }

    /* 
    Step 2: If the access token is not already set, check the URL to see if it has just been obtained.
    Check for access token match
    Check for expires in match
    match() method returns an array of all matches or null if no match is found 
    */
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    /*
    If there is an access token match, set the accessToken variable to the value of the first element in the array returned by the match() method
    If there is an expires in match, set the expiresIn variable to the value of the first element in the array returned by the match() method
    */
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', '', '/WebSpot');
    }

    /*
    Step 3: The access token variable is empty and is not in the URL.
    */
    if (!accessToken && !accessTokenMatch) {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`
    }
  },

  async search(term: string): Promise<any> {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      method: 'GET'
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    })) || [];
  },

  async savePlaylist(playlistName: string, trackURIs: string[]): Promise<any>{
    // check if values are saved to the args, if not return
    if (!playlistName || !trackURIs) {
      return 
    }

    // create access token variable
    const accessToken = this.getAccessToken();

    // headers variable
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    // get current user ID
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      method: 'GET',  
      headers: headers,
    })
    const jsonResponse = await response.json();
    const userID = jsonResponse.id;
  
    // post new playlist with playlistName
    const response2 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: playlistName})
    })
    const jsonResponse2 = await response2.json();
    const playlistID = jsonResponse2.id;
    
    // post track uris to the new playlist, referencing the users account ID and the playlist ID
    const response3 = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({uris: trackURIs}),
      
    })  
  }

};

export default Spotify;
