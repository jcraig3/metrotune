window.AudioContext = window.AudioContext || window.webkitAudioContext;

//audio context elements
var audioContext;
var analyser;
var source;
var constraints = { audio: true };
var bufferLength = 2048;
var buffer = new Float32Array(bufferLength);
const dataArray = new Uint8Array(bufferLength);

//variables
var started = false;
var testPitch = null;
var pitchInt = null;
var pitchArray = {
  C: 262,
  D: 294,
  E: 330,
  F: 350,
  G: 392,
  A: 440,
  B: 494,
  Cve: 523,
};
var answered = false;

window.onload = function () {
  getRandFreq();
  console.log(testPitch);
};

function refNoteDown(buttonFreq) {
  if (started == false) {
    if (audioContext == null) {
      audioContext = new window.AudioContext();
    }
    started = true;
  }
  playRef(buttonFreq);
}

function refNoteUp() {
  oscillator.disconnect();
}

function playRef(buttonFreq) {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  reffrequency = buttonFreq;
  oscillator.frequency.value = buttonFreq; //frequency value in HZ
  oscillator.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime);
}

function getRandFreq() {
  pitchInt = getRandomInt(1, 8);
  if (pitchInt == 1) {
    testPitch = pitchArray.C;
  } else if (pitchInt == 2) {
    testPitch = pitchArray.D;
  } else if (pitchInt == 3) {
    testPitch = pitchArray.E;
  } else if (pitchInt == 4) {
    testPitch = pitchArray.F;
  } else if (pitchInt == 5) {
    testPitch = pitchArray.G;
  } else if (pitchInt == 6) {
    testPitch = pitchArray.A;
  } else if (pitchInt == 7) {
    testPitch = pitchArray.B;
  } else if (pitchInt == 8) {
    testPitch = pitchArray.Cve;
  }
  console.log(testPitch);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

//if answered correctly, get a new freq
// otherwise, light up red and don't progress
function checkNext() {
  if (answered) {
    getRandFreq();
  }
}

//check to see if interval is correct when btn is clicked
function checkInt() {}
