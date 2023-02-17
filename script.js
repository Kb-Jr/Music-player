const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prgressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music object
 const songs = [
    {
        name:'No Role Modelz',
        displayName: 'No role modelz',
        artist:'J Cole',
    },
    {
        name:'Back to sleep',
        displayName: 'Back to sleep',
        artist:'Chris Brown',
    },
    {
        name:'Malibu',
        displayName: 'Malibu',
        artist:'Miley Cyrus',
    },

 ]

let isPlaying = false;


function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
};

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
};

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
    

};

let songIndex = 0;


function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    };
    loadSong(songs[songIndex]);
    playSong();
}


function prevSong(){
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    };
    loadSong(songs[songIndex]);
    playSong();
}


loadSong(songs[songIndex]);


function updateProgress(e){
    if (isPlaying){
        const {duration, currentTime} = e.srcElement;
        console.log(duration, currentTime);

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
       
    }
};

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgress);