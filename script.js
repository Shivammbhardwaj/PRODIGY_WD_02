let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const display = document.getElementById('displayMilliseconds');
const lapList = document.getElementById('laps');
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');

const startSound = document.getElementById('startSound');
const lapSound = document.getElementById('lapSound');

function startPause() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startPauseButton.textContent = 'Start';
    startPauseButton.style.backgroundColor = '#4CAF50';
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startPauseButton.textContent = 'Pause';
    startPauseButton.style.backgroundColor = '#f44336';
    playStartSound(); // Play start sound effect
  }
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  startPauseButton.textContent = 'Start';
  startPauseButton.style.backgroundColor = '#4CAF50';
  elapsedTime = 0;
  laps = [];
  lapList.innerHTML = '';
  display.textContent = formatTime(elapsedTime);
}

function lap() {
  if (timerInterval) {
    const lapTime = Date.now() - startTime;
    laps.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = laps.length + '. ' + formatTime(lapTime);
    lapList.prepend(lapItem);
    playLapSound(); // Play lap sound effect
  }
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  let ms = Math.floor(time % 1000);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  ms = pad(ms, 3);
  seconds = pad(seconds, 2);
  minutes = pad(minutes, 2);
  hours = pad(hours, 2);

  return `${hours}:${minutes}:${seconds}:${ms}`;
}

function pad(number, length) {
  return ('0'.repeat(length) + number).slice(-length);
}

function playStartSound() {
  startSound.currentTime = 0;
  startSound.play();
}

function playLapSound() {
  lapSound.currentTime = 0;
  lapSound.play();
}
