
const songImg = document.getElementById('song-img');
const song = document.getElementById('song');
const songArtist = document.getElementsByClassName('song-artist');
const songTitle = document.getElementsByClassName('song-name');
const progressBar = document.getElementById('progress-bar');
const pPause = document.getElementById('play-pause');

let playing =true;

pPause.onclick = playPause;
function playPause(){
    if(playing){
        pPause.src='../media/pause.png';
        song.play()
    } else{
        pPause.src="./media/play.png";
        song.pause()
    }
    playing=!playing;
}

function formatTime(seconds){
    let minutes=Math.floor(seconds/60);
    seconds=seconds%60;
    if(seconds<10){
        seconds=`0${seconds}`
    }
    return `${minutes}:${seconds}`
}
function updateProgressValue(){
    progressBar.max=song.duration;
    progressBar.value=song.currentTime;

    document.querySelector('.currentTime').innerHTML = formatTime(Math.floor(song.currentTime))
    if(document.querySelector('.durationTime').innerHTML == 'NaN:NaN'){
        document.querySelector('.durationTime').innerHTML = '0:00'
    } else {
        document.querySelector('.durationTime').innerHTML = formatTime(Math.floor(song.duration))
    }
}

setInterval(updateProgressValue,500);

function changeProgressBar(){
    song.currentTime=progressBar.value ;
}

progressBar.onchange=changeProgressBar;
import "./screens/IndexScreen.js";
import "./screens/LoginScreen.js";
import "./screens/RegisterScreen.js";
import "./screens/UploadScreen.js";
import "./screens/UserScreen.js";
import "./screens/PlaylistScreen.js";
import "./screens/UpPlaylistScreen.js";

import "./components/MusicContainer.js"
import "./components/MusicList.js";
import "./components/NavigationBar.js";
import "./components/InputWrapper.js";
import "./components/UploadWrapper.js";
import "./components/PlaylistContainer.js";
import "./components/PlaylistList.js";

import "./utils.js";
import "./router.js";
