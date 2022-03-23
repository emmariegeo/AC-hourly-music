// Date/Time global variables
let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
let second = now.getSeconds();
const OPTIONS = { weekday: 'long' };
let weekday = new Intl.DateTimeFormat('en-US', OPTIONS).format(now);
let hourPos = (hour * 360) / 12 + (minute * (360 / 60)) / 12;
let minutePos = (minute * 360) / 60 + (second * (360 / 60)) / 60;
let secondPos = (second * 360) / 60;
let weather = 'sunny';

// Document objects
const SONG_TITLE = document.getElementById('songTitle');
const WEEKDAY = document.getElementById('weekDay');
//const CLOCK_BTN = document.getElementById('new-Clock');
const FWD_BTN = document.getElementById('forward');
const BACK_BTN = document.getElementById('backward');
const RESET_BTN = document.getElementById('reset');
const RAIN_BTN = document.getElementById('rainy');
const SUN_BTN = document.getElementById('sunny');
const SNOW_BTN = document.getElementById('snowy');
const MUSIC = document.querySelector('audio');
const BODY = document.querySelector('body');
const HOUR_HAND = document.querySelector('#hour');
const MINUTE_HAND = document.querySelector('#minute');
const SECOND_HAND = document.querySelector('#second');

// Utility Lists
const SKY_COLORS = [
  '#000334',
  '#1e1a42',
  '#000a40',
  '#04114b',
  '#0e114b',
  '#1b4067',
  '#86beab',
  '#b7cef9',
  '#7abcfd',
  '#55a5ff',
  '#60b3ff',
  '#5eb7ff',
  '#4697fe',
  '#3b83ff',
  '#4c8eff',
  '#82b6ff',
  '#95c1ff',
  '#adacf4',
  '#ff9870',
  '#151d51',
  '#001759',
  '#000c46',
  '#010940',
  '#1f193f',
  '#1a143a',
];
const CLOCK_COLORS = ['clockGreen.svg', 'clockBlue.svg'];

// Music
let songID = hour * 3;

// Get Hourly Animal Crossing Music
async function getMusic() {
  try {
    setInterval(loadMusic, 1000);
    MUSIC.loop = 'true';
    MUSIC.setAttribute("autoplay", true);
  } catch (error) {
    // Handle error here
    alert(error);
  }
}

// Update Date and Time
function updateTime() {
  now = new Date();
  hour = now.getHours();
  minute = now.getMinutes();
  second = now.getSeconds();
  weekday = new Intl.DateTimeFormat('en-US', OPTIONS).format(now);
  if (WEEKDAY.innerText != weekday) {
    updateWeekDay();
  }
}
const runClock = () => {
  // Change position by time
  hourPos = hourPos + 3 / 360;
  minutePos = minutePos + 6 / 60;
  secondPos = secondPos + 6;
  if (minutePos == 0 || minutePos == 360) {
    updateTime();
  }

  // Rotate each clock hand
  HOUR_HAND.style.transform = `rotate(${hourPos}deg)`;
  MINUTE_HAND.style.transform = `rotate(${minutePos}deg)`;
  SECOND_HAND.style.transform = `rotate(${secondPos}deg)`;
};
// Pick music and update songID
function pickMusic() {
  if (weather == 'sunny') {
    songID = hour * 3 + 3;
  }
  if (weather == 'rainy') {
    songID = hour * 3 + 1;
  } else if (weather == 'snowy') {
    songID = hour * 3 + 2;
  }
}

// Pick music and load song if not currently playing
function loadMusic() {
  getBackground();
  pickMusic();
  if (MUSIC.currentSrc != `https://acnhapi.com/v1/hourly/${songID}`) {
    MUSIC.src = `https://acnhapi.com/v1/hourly/${songID}`;
    updateSongTitle();
  }
}

// Update song title
function updateSongTitle() {
  MUSIC.setAttribute('title', songID);
  let amPm = 'AM';
  let hourSmall = hour % 12;
  if (hourSmall == 0) {
    hourSmall = 12;
  }
  if (hour > 11) {
    amPm = 'PM';
  }
  SONG_TITLE.innerText = `${weather}: ${hourSmall} ${amPm}`;
}

// update weekday text
function updateWeekDay() {
  WEEKDAY.innerText = weekday;
}

// change background based on time of day
function getBackground() {
  if (hour == 23) {
    BODY.style.background =
      'linear-gradient(' + SKY_COLORS[hour - 1] + ', ' + SKY_COLORS[hour] + ')';
  } else if (hour < 12) {
    BODY.style.background =
      'linear-gradient(' + SKY_COLORS[hour] + ', ' + SKY_COLORS[hour + 1] + ')';
  } else {
    BODY.style.background =
      'linear-gradient(' + SKY_COLORS[hour + 1] + ', ' + SKY_COLORS[hour] + ')';
  }
}

// Define Event Listeners
const forwardClock = () => {
  if (hour < 23) {
    hour += 1;
  } else {
    hour = 0;
  }
  hourPos += 30;
  console.log(hour);
  getMusic();
  getBackground();
};

const backwardClock = () => {
  if (hour > 0) {
    hour -= 1;
  } else {
    hour = 23;
  }
  hourPos -= 30;
  console.log(hour);
  getMusic();
  getBackground();
};

const resetClock = () => {
  updateTime();
  hourPos = (hour * 360) / 12 + (minute * (360 / 60)) / 12;
  minutePos = (minute * 360) / 60 + (second * (360 / 60)) / 60;
  secondPos = (second * 360) / 60;
};
const playSunny = () => {
  SUN_BTN.classList.add('weather-button-clicked', 'no-hover');
  RAIN_BTN.classList.remove('weather-button-clicked', 'no-hover');
  SNOW_BTN.classList.remove('weather-button-clicked', 'no-hover');
  weather = 'sunny';
  songID = hour * 3 + 3;
  MUSIC.src = `https://acnhapi.com/v1/hourly/${songID}`;
  updateSongTitle();
};
const playRainy = () => {
  RAIN_BTN.classList.add('weather-button-clicked', 'no-hover');
  SUN_BTN.classList.remove('weather-button-clicked', 'no-hover');
  SNOW_BTN.classList.remove('weather-button-clicked', 'no-hover');
  weather = 'rainy';
  songID = hour * 3 + 1;
  MUSIC.src = `https://acnhapi.com/v1/hourly/${songID}`;
  updateSongTitle();
};
const playSnowy = () => {
  SNOW_BTN.classList.add('weather-button-clicked', 'no-hover');
  SUN_BTN.classList.remove('weather-button-clicked', 'no-hover');
  RAIN_BTN.classList.remove('weather-button-clicked', 'no-hover');
  weather = 'snowy';
  songID = hour * 3 + 2;
  MUSIC.src = `https://acnhapi.com/v1/hourly/${songID}`;
  updateSongTitle();
};

// Attach Event Listeners
FWD_BTN.addEventListener('click', forwardClock);
BACK_BTN.addEventListener('click', backwardClock);
RESET_BTN.addEventListener('click', resetClock);
RAIN_BTN.addEventListener('click', playRainy);
SUN_BTN.addEventListener('click', playSunny);
SNOW_BTN.addEventListener('click', playSnowy);

// On Load
getMusic();
getBackground();
setInterval(getBackground, 20000);
updateWeekDay();
setInterval(runClock, 1000);
