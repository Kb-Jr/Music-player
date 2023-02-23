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

    {
        name:'Forever',
        displayName: 'Forever',
        artist:'Lil Baby ft Fridayy',
    },
    
    {
        name:'Soweto',
        displayName: 'Soweto',
        artist:'Victony',
    },

    {
        name:'Wicked Games',
        displayName: 'Wicked Games',
        artist:'The Weekend',
    },

    {
        name:'Telephone',
        displayName: 'Telephone',
        artist:'Lady Gaga ft Beyonce',
    },
 ]



let isPlaying = false;

// function to play song
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
};

// function to pause song
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
};

// toggle between play and pause
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// function to load song details/song
function loadSong(song){

    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
    
};



let isShuffled = false;

// function to shuffle songs
function shuffleSongs(){
    isShuffled = true;
   
    shuffleBtn.classList.replace('fa-shuffle', 'fa-grip-lines');
    shuffleBtn.setAttribute('title', 'Shuffle');
    let randomSong = songs[Math.floor(Math.random() * songs.length)];

    function loadShuffled(){
        title.textContent = randomSong.displayName;
        artist.textContent = randomSong.artist;
        music.src = `music/${randomSong.name}.mp3`;
        image.src = `img/${randomSong.name}.jpg`;
    }

    loadShuffled();
    playSong();
      
};


// function to unshuffle songs
function unShuffleSongs(){
    isShuffled = false;
    shuffleBtn.classList.replace('fa-grip-lines', 'fa-shuffle');
    shuffleBtn.setAttribute('title', 'Un-Shuffle');
    
    let toPlay = songs[0];

    function loadUnShuffled(){
   
        title.textContent = toPlay.displayName;
        artist.textContent = toPlay.artist;
        music.src = `music/${toPlay.name}.mp3`;
        image.src = `img/${toPlay.name}.jpg`;       
        
    }

    loadUnShuffled();
    playSong();
   
};

var firstSong = songs.indexOf(songs[0]);

// function to set the next song to be played when shuffled
function nextSongs(){
    isShuffled = true;

    // generate random number
    function randomnumber(){
        let randomn = Math.floor(Math.random() * songs.length);

        firstSong = randomn;
    }
    
    randomnumber();
    loadSong(songs[firstSong]);
    playSong();
};


// function to set the previous song to be played when shuffled
function prevSongs(){
    isShuffled = true;

    // generate random number
    function randomnumber(){
        let randomn = Math.floor(Math.random() * songs.length);

        firstSong = randomn;       
    }
    
    randomnumber();
    loadSong(songs[firstSong]);
    playSong();
};



let songIndex = 0;

// function to set the next song to be played when not shuffled
function nextSong(){
    isShuffled = false;
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    };
    loadSong(songs[songIndex]);
    playSong();
};


// function to set the previous song to be played when not shuffled
function prevSong(){
    isShuffled = false;
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    };
    loadSong(songs[songIndex]);
    playSong();
};


// execute loadSong function
loadSong(songs[songIndex]);



// function to update progress bar
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

};

// function to set default volume
function setVolume(){
    music.volume = 0.4;
};

// function to increase volume
function increase(){
    music.volume+=0.1; 
};

// function to decrease volume
function decrease(){
    music.volume-=0.1;
};

// execute default volume on load
setVolume();



// event listeners on buttons to execute or toggle between functions
shuffleBtn.addEventListener('click', () => (isShuffled ? unShuffleSongs() : shuffleSongs()));
prevBtn.addEventListener('click', () => (isShuffled ? prevSongs() : prevSong()));
nextBtn.addEventListener('click', () => (isShuffled ? nextSongs() : nextSong()));
volumeUp.addEventListener('click', increase);
volumedown.addEventListener('click', decrease);
music.addEventListener('ended', () => (isShuffled ? nextSongs() : nextSong()));
music.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);