import { SpotifyApi } from "../src/index";
import AuthorizationCodeWithPKCEStrategy from "../src/auth/AuthorizationCodeWithPKCEStrategy";
import { table } from "console";
import DataTable from "datatables.net-dt";


const implicitGrantStrategy = new AuthorizationCodeWithPKCEStrategy(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_REDIRECT_TARGET,
    ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private, user-read-playback-state, user-modify-playback-state',
'user-read-currently-playing', 'playlist-read-private', 'playlist-read-collaborative', 'user-top-read', 'user-read-recently-played',
'streaming']
);

const spotify = new SpotifyApi(implicitGrantStrategy);
const profile = await spotify.currentUser.profile();

console.log(profile);

// User Profile
document.getElementById("displayName")!.innerText = profile.display_name;
if (profile.images[0]) {
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[0].url;
    document.getElementById("avatar")!.appendChild(profileImage);
}
document.getElementById("id")!.innerText = profile.id;
document.getElementById("email")!.innerText = profile.email;
document.getElementById("uri")!.innerText = profile.uri;
document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
document.getElementById("url")!.innerText = profile.href;
document.getElementById("url")!.setAttribute("href", profile.href);
document.getElementById("imgUrl")!.innerText = profile.images[0]?.url ?? '(no profile image)';



// TOP TRACKS
const userPlaylists = await spotify.currentUser.playlists.playlists();
const topTracks = await spotify.currentUser.topItems("tracks");

console.table(topTracks.items.map((item) => ({
    name: item.name,
    artists: item.artists,
    album: item.album,
    popularity: item.popularity,
    trackid: item.id
})));




// const topTable = new table(topTracks.items.map((item) => ({
//     name: item.name,
//     artists: item.artists,
//     album: item.album,
//     popularity: item.popularity,
//     trackid: item.id
// })));

const trackData = topTracks.items.map((item) => ({
    name: item.name,
    artists: item.artists,
    album: item.album.name,
    popularity: item.popularity,
    trackid: item.id
}));


let topTable = new DataTable('#myTable', {
    // config options...
    data: trackData,
    columns: [
        { data: 'name' },
        { data: 'artists[, ]' },
        { data: 'album' },
        { data: 'popularity' },
        { data: 'trackid' }
    ]
});




let list  = document.getElementById("myList");

topTracks.items.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item.name;
    list?.appendChild(li);
    
});



//const track1 = await spotify.tracks.audioFeatures(topTracks.items[0].id);


document.getElementById("trackName")!.innerText = topTracks.items[0].name;
const trackImg = new Image(500, 500);
trackImg.src = topTracks.items[0].album.images[0].url;
document.getElementById("trackImg")!.appendChild(trackImg);





