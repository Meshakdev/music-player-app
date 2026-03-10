// DOM Elements
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressBar = document.getElementById('progress');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const trackName = document.getElementById('trackName');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');
const playlistItems = document.querySelectorAll('.playlist-item');

// Player State
let isPlaying = false;
let currentTrackIndex = 0;
let isShuffle = false;
let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one

// Tracks data
const tracks = [
    {
        name: 'Summer Vibes',
        artist: 'Artist A',
        duration: 240,
        cover: 'https://via.placeholder.com/300?text=Summer+Vibes'
    },
    {
        name: 'Night Dreams',
        artist: 'Artist B',
        duration: 210,
        cover: 'https://via.placeholder.com/300?text=Night+Dreams'
    },
    {
        name: 'Electric Soul',
        artist: 'Artist C',
        duration: 260,
        cover: 'https://via.placeholder.com/300?text=Electric+Soul'
    },
    {
        name: 'Ocean Waves',
        artist: 'Artist D',
        duration: 220,
        cover: 'https://via.placeholder.com/300?text=Ocean+Waves'
    },
    {
        name: 'Mountain Echo',
        artist: 'Artist E',
        duration: 230,
        cover: 'https://via.placeholder.com/300?text=Mountain+Echo'
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateTrackDisplay();
    setDuration(tracks[currentTrackIndex].duration);
});

// Play/Pause functionality
playBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? '⏸️' : '▶️';
    simulatePlayback();
}

// Previous track
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    updateTrackDisplay();
    resetProgress();
    isPlaying = true;
    playBtn.textContent = '⏸️';
});

// Next track
nextBtn.addEventListener('click', playNextTrack);

function playNextTrack() {
    if (repeatMode === 2) {
        resetProgress();
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        updateTrackDisplay();
        resetProgress();
    }
    isPlaying = true;
    playBtn.textContent = '⏸️';
}

// Shuffle functionality
shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.opacity = isShuffle ? '1' : '0.5';
    shuffleBtn.style.color = isShuffle ? '#667eea' : '#fff';
});

// Repeat functionality
repeatBtn.addEventListener('click', () => {
    repeatMode = (repeatMode + 1) % 3;
    repeatBtn.style.opacity = repeatMode === 0 ? '0.5' : '1';
    repeatBtn.textContent = repeatMode === 2 ? '🔂' : '🔁';
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value;
    console.log('Volume set to:', volume);
});

// Update track display
function updateTrackDisplay() {
    const track = tracks[currentTrackIndex];
    trackName.textContent = track.name;
    artistName.textContent = track.artist;
    albumArt.src = track.cover;
    
    // Update playlist highlight
    playlistItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentTrackIndex);
    });
}

// Set duration
function setDuration(seconds) {
    durationSpan.textContent = formatTime(seconds);
}

// Reset progress
function resetProgress() {
    progressBar.style.width = '0%';
    currentTimeSpan.textContent = '0:00';
}

// Simulate playback
function simulatePlayback() {
    if (!isPlaying) return;
    
    const duration = tracks[currentTrackIndex].duration;
    let currentTime = 0;
    
    const interval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        
        currentTime++;
        const percentage = (currentTime / duration) * 100;
        progressBar.style.width = percentage + '%';
        currentTimeSpan.textContent = formatTime(currentTime);
        
        if (currentTime >= duration) {
            clearInterval(interval);
            playNextTrack();
            if (isPlaying) {
                simulatePlayback();
            }
        }
    }, 1000);
}

// Format time (seconds to mm:ss)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Playlist item click
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentTrackIndex = index;
        updateTrackDisplay();
        resetProgress();
        isPlaying = true;
        playBtn.textContent = '⏸️';
        simulatePlayback();
    });
});

console.log('Music Player initialized successfully!');
