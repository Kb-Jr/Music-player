const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const shuffleBtn = document.getElementById('shuffle-icon');
const volumeUp = document.getElementById('increase');
const volumedown = document.getElementById('decrease');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music object
 let songs = [
    
    {
        name:'Bad Influence',
        displayName: 'Bad Influence',
        artist:'Omah Lay',
    },

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
    {
        name:'Grand Piano',
        displayName: 'Grand Piano',
        artist:'Nicki Minaj',
    },

    {
        name:'Contour',
        displayName: 'Contour',
        artist:'Joeboy',
    },
    {
        name:'Higher',
        displayName: 'Higher',
        artist:'Rihanna',
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


let isShuffled = false;



function shuffleSongs(){
    isShuffled = true;
   
    shuffleBtn.classList.replace('fa-shuffle', 'fa-grip-lines');
    let randomSong = songs[Math.floor(Math.random() * songs.length)];

    function loadShuffled(){
        title.textContent = randomSong.displayName;
        artist.textContent = randomSong.artist;
        music.src = `music/${randomSong.name}.mp3`;
        image.src = `img/${randomSong.name}.jpg`;
    }

    loadShuffled();
    playSong();
      
}


function unShuffleSongs(){
    isShuffled = false;
    shuffleBtn.classList.replace('fa-grip-lines', 'fa-shuffle');
    
    let toPlay = songs[0];

    function loadUnShuffled(){
   
        title.textContent = toPlay.displayName;
        artist.textContent = toPlay.artist;
        music.src = `music/${toPlay.name}.mp3`;
        image.src = `img/${toPlay.name}.jpg`;       
        
    }

    loadUnShuffled();
    playSong();
   
}


var firstSong = songs.indexOf(songs[0]);
var randomss = Math.floor(Math.random() * songs.length);


function nextSongs(){
    isShuffled = false;
    firstSong++;
    if (firstSong > songs.length - 1) {
        firstSong = 0;
    };
    
    loadSong(songs[firstSong]);
    playSong();
}


function prevSongs(){
    isShuffled = false;
    firstSong--;
    if (firstSong < 0) {
        firstSong = songs.length - 1;
    };
    loadSong(songs[firstSong]);
    playSong();
}


shuffleBtn.addEventListener('click', () => (isShuffled ? unShuffleSongs() : shuffleSongs()));



let songIndex = 0;

function nextSong(){
    isShuffled = true;
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    };
    loadSong(songs[songIndex]);
    playSong();
}


function prevSong(){
    isShuffled = true;
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

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
          

        if (durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currenMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeEl.textContent = `${currenMinutes}:${currentSeconds}`;
        
    }
};


function setProgress(e){

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX/width) * duration;

}


function setVolume(){
    music.volume = 0.4;
};


function increase(){
    if (music.volume < 1){
        music.volume+=0.1;
    }

    else if (music.volume = 1){
        music.volume +=0;
    }

};

function decrease(){
    music.volume-=0.1;
    
}

setVolume();


prevBtn.addEventListener('click', () => isShuffled ? prevSong() : prevSongs());
nextBtn.addEventListener('click', () => isShuffled ? nextSong() : nextSongs());
volumeUp.addEventListener('click', increase);
volumedown.addEventListener('click', decrease);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);