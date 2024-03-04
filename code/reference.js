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

function start() {
  if (started == false) {
    if (audioContext == null) {
      audioContext = new window.AudioContext();
    }
    started = true;
  } else {
    console.log("already started dude");
  }
}

function refNoteDown(buttonFreq) {
  playRef(buttonFreq);
  changeRefHz();
}

function refNoteUp() {
  oscillator.disconnect();
}

//print refHZ to refhz span
function changeRefHz() {
  refhz.textContent = reffrequency;
}

function playRef(buttonFreq) {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  reffrequency = buttonFreq;
  oscillator.frequency.value = buttonFreq; //frequency value in HZ
  oscillator.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime);
}
