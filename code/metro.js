window.AudioContext = window.AudioContext || window.webkitAudioContext;

//html elements
var bpm, minus, plus, click, beatPB, beatTracker, bpmSlider;

//audio context elements
var audioContext;
var analyser;
var source;
var constraints = { audio: true };
var bufferLength = 2048;
var buffer = new Float32Array(bufferLength);
const dataArray = new Uint8Array(bufferLength);
var oscillator = null;

//variables
var playing = false;
var tempo = 120;
var beats = 4;
var currBeat = 1;

window.onload = function () {
  //assign vars to html elements
  bpm = document.getElementById("bpm");
  minus = document.getElementById("minus");
  plus = document.getElementById("plus");
  click = document.getElementById("click");
  beatPB = document.getElementById("beatPB");
  bpmSlider = document.getElementById("bpmSlider");
  beatTracker = document.getElementById("beatTracker");

  //set up page
  console.log("LOADED DAWG");
  bpmSlider.value = 120;
  bpm.textContent = "BPM: " + tempo;
  beatPB.textContent = "BPB: " + beats;
  beatTracker.textContent = "--";
};

function startMetronome() {
  if (playing == false) {
    if (audioContext == null) {
      audioContext = new window.AudioContext();
    }
    playing = true;
    click.className = "clicking";
    click.textContent = "STOP";
    play();
  } else if (playing == true) {
    playing = false;
    click.className = "stopped";
    click.textContent = "PLAY";
    stop();
  }
}

//play beats
function play() {
  metronome = setInterval(function () {
    //visual update
    beatTracker.textContent = currBeat;
    playSound();
    currBeat++;
    if (currBeat > beats) {
      currBeat = 1;
    }
  }, 60000 / tempo);
}

//play click sound
function playSound() {
  oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 550;
  oscillator.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.03);
  console.log("playing click bro");
}

// stop metronome
function stop() {
  clearInterval(metronome);
  currBeat = 1;
  beatTracker.textContent = "--";
}

//add 1 beat to BPM
function add() {
  console.log("added dude");
  tempo++;
  updateBPM();
  stopPlay();
}

//subtract 1 beat from BPM
function sub() {
  console.log("subbed brotha");
  tempo--;
  updateBPM();
  stopPlay();
}

//update BPM text content
function updateBPM() {
  bpm.textContent = "BPM: " + tempo;
}

//set slider value to bpm value
function updateSlider() {
  tempo = bpmSlider.value;
  updateBPM();
  stopPlay();
}

//add 1 to beat per bar count
function addBeat() {
  if (beats < 14) {
    console.log("added homeskillet");
    beats++;
  } else {
    beats += 0;
  }
  updateBeatPB();
  stopPlay();
}

//subtract 1 beat from beat per bar count
function subBeat() {
  if (beats > 1) {
    console.log("subbed bro");
    beats--;
  } else {
    beats -= 0;
  }
  updateBeatPB();
  stopPlay();
}

//update beat per bar count text
function updateBeatPB() {
  beatPB.textContent = "BPB: " + beats;
}

function stopPlay() {
  if (playing) {
    stop();
    play();
  }
}
