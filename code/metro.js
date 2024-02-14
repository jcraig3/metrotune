window.AudioContext = window.AudioContext || window.webkitAudioContext;

//html elements
var bpm, minus, plus, click, input, submit, beatPB, beatTracker;

//variables
var playing = false;
var tempo = 120;
var beats = 4;
var audioContext = null;

window.onload = function () {
  //assign vars to html elements
  bpm = document.getElementById("bpm");
  minus = document.getElementById("minus");
  plus = document.getElementById("plus");
  click = document.getElementById("click");
  input = document.getElementById("input");
  submit = document.getElementById("submit");
  beatPB = document.getElementById("beatPB");
  beatTracker = document.getElementById("beatTracker");

  //set up page
  console.log("LOADED DAWG");
  bpm.textContent = "BPM: " + tempo;
  input.value = tempo;
  beatPB.textContent = "BPB: " + beats;
  beatTracker.textContent = "--";
};

function start() {
  if (playing == false) {
    if (audioContext == null) {
      audioContext = new window.AudioContext();
    }
    playing = true;
    click.className = "clicking";
    click.textContent = "STOP";
  } else if (playing == true) {
    playing = false;
    click.className = "stopped";
    click.textContent = "PLAY";
  }
}

//add 1 beat to BPM
function add() {
  console.log("added dude");
  tempo++;
  updateBPM();
}

//subtract 1 beat from BPM
function sub() {
  console.log("subbed brotha");
  tempo--;
  updateBPM();
}

//update BPM text content
function updateBPM() {
  bpm.textContent = "BPM: " + tempo;
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
}

//update beat per bar count text
function updateBeatPB() {
  beatPB.textContent = "BPB: " + beats;
}

//update BPM with tempo input
function enter() {
  checkTempo();
  if (input.value <= 1015 && input.value >= 1) {
    tempo = input.value;
    updateBPM();
  }
}

//make sure tempo input is valid
function checkTempo() {
  if (input.value > 1015 || input.value < 1) {
    throw new Error("Your number isn't in the range bruh");
  }
}
