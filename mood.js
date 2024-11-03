// Selecting HTML elements
const moodSelect = document.getElementById('moodImage');
const showMoodBtn = document.getElementById('show-mood-btn');
const randomMoodBtn = document.getElementById('random-mood-btn');
const moodDisplay = document.getElementById('mood-display');
const saveMoodBtn = document.getElementById('save-mood-btn');
const diaryList = document.getElementById('diary-list');
const moodMusicPlayer = document.getElementById('mood-music');
const nextTrackBtn = document.getElementById('next-track-btn');
const prevTrackBtn = document.getElementById('prev-track-btn');
const currentTrackDisplay = document.getElementById('current-track');

// Theme Switcher Elements
const lightModeBtn = document.getElementById('light-mode-btn');
const darkModeBtn = document.getElementById('dark-mode-btn');
const whiteModeBtn = document.getElementById('white-mode-btn');

// Define mood data for images and music playlists
const moodData = {
    happy: { image: 'moodImages/happy.gif', music: [{ title: 'Happy Song 1', url: 'c:\Users\basil\AppData\Local\Packages\5319275A.WhatsAppDesktop_cv1g1gvanyjgm\TempState\AUD-20241103-WA0001.mp3' }, { title: 'Happy Song 2', url: 'moodMusic/happy 2.m4a' }] },
    sad: { image: 'moodImages/sad.gif', music: [{ title: 'Sad Song 1', url: 'moodMusic/sad 1.m4a' }, { title: 'Sad Song 2', url: 'moodMusic/sad 2.m4a' }] },
    angry: { image: 'moodImages/angry.gif', music: [{ title: 'Angry Song 1', url: 'moodMusic/angry1.mp3' }, { title: 'Angry Song 2', url: 'moodMusic/angry2.mp3' }] },
    surprised: { image: 'moodImages/surprised.gif', music: [{ title: 'Surprised Song 1', url: 'moodMusic/surprice 1.m4a' }, { title: 'Surprised Song 2', url: 'moodMusic/surprised2.mp3' }] },
    love: { image: 'moodImages/love.gif', music: [{ title: 'Love Song 1', url: 'moodMusic/love 1.m4a' }, { title: 'Love Song 2', url: 'moodMusic/love2.mp3' }] },
    pwollimood: { image: 'moodImages/pwollimood.gif', music: [{ title: 'Pwollimood Song 1', url: 'moodMusic/pwollimood1.mp3' }, { title: 'Pwollimood Song 2', url: 'moodMusic/pwollimood2.m4a' }] },
};

let lastDisplayedMood = null;
let currentTrackIndex = 0;
let currentPlaylist = [];

// Function to Set Theme
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Event Listeners for Theme Buttons
lightModeBtn.addEventListener('click', () => setTheme('light'));
darkModeBtn.addEventListener('click', () => setTheme('dark'));
whiteModeBtn.addEventListener('click', () => setTheme('white'));

// Load saved theme on page load
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

// Function to display mood image and load playlist
function displayMood(mood) {
    const moodInfo = moodData[mood];
    if (moodInfo) {
        moodDisplay.innerHTML = `<img src="${moodInfo.image}" alt="${mood} mood"><p>Your mood: ${mood}</p>`;
        currentPlaylist = moodInfo.music;
        currentTrackIndex = 0;
        playCurrentTrack();
        lastDisplayedMood = mood;
    }
}

// Function to play the current track
function playCurrentTrack() {
    if (currentPlaylist.length > 0) {
        const track = currentPlaylist[currentTrackIndex];
        moodMusicPlayer.src = track.url;
        currentTrackDisplay.textContent = `Now Playing: ${track.title}`;
        moodMusicPlayer.play();
    }
}

// Advance to the next track, looping if at the end
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
    playCurrentTrack();
}

// Move to the previous track, looping to the end if at the beginning
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    playCurrentTrack();
}

// Event listeners for track navigation
nextTrackBtn.addEventListener('click', nextTrack);
prevTrackBtn.addEventListener('click', prevTrack);

// Auto-play next track when the current one ends
moodMusicPlayer.addEventListener('ended', nextTrack);

// Event listeners for mood buttons
showMoodBtn.addEventListener('click', () => displayMood(moodSelect.value));
randomMoodBtn.addEventListener('click', () => displayMood(Object.keys(moodData)[Math.floor(Math.random() * Object.keys(moodData).length)]));

// Save last displayed mood to diary
saveMoodBtn.addEventListener('click', () => {
    if (lastDisplayedMood) {
        const entry = { date: new Date().toLocaleDateString(), mood: lastDisplayedMood };
        const diary = JSON.parse(localStorage.getItem('moodDiary')) || [];
        diary.push(entry);
        localStorage.setItem('moodDiary', JSON.stringify(diary));
        displayMoodDiary();
    } else {
        alert("No mood displayed to save.");
    }
});

// Function to display mood diary
function displayMoodDiary() {
    const diary = JSON.parse(localStorage.getItem('moodDiary')) || [];
    diaryList.innerHTML = '';
    diary.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.date}: ${entry.mood}`;
        diaryList.appendChild(listItem);
    });
}

// Load and display mood diary on page load
window.addEventListener('load', displayMoodDiary);
