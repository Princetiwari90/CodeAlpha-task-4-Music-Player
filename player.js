const background = document.querySelector('#background'); 
const thumbnail = document.querySelector('#thumbnail'); 
const song = document.querySelector('#song'); 

const songArtist = document.querySelector('.song-artist'); 
const songTitle = document.querySelector('.song-title'); 
const progressBar = document.querySelector('#progress-bar'); 
let pPause = document.querySelector('#play-pause'); 

songIndex = 0;
songs = ['./assets/music/karan aujla.mp3', './assets/music/sidhu.mp3', './assets/music/arijit singh.mp3']; 
thumbnails = ['./assets/images/tauba tauba.png', './assets/images/sidhu moose wala.png', './assets/images/arijit pic.png']; 
songArtists = ['karan aujla', 'sidhu', 'arijit singh']; 
songTitles = ["husan tera tauba", "devil", "dil sambhal ja jra"]; 

let playing = true;
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
        thumbnail = document.querySelector('#thumbnail');

        pPause.src = "./assets/icons/pause.png"
        thumbnail.style.transform = "scale(1.15)";
        
        song.play();
        playing = false;
    } else {
        pPause.src = "./assets/icons/play.png"
        thumbnail.style.transform = "scale(1)"
        
        song.pause();
        playing = true;
    }
}

song.addEventListener('ended', function(){
    nextSong();
});
 
function nextSong() {
    songIndex++;
    if (songIndex > 2) {
        songIndex = 0;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 2;
    };
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "NaN:NaN") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

function changeProgressBar() {
    song.currentTime = progressBar.value;
};