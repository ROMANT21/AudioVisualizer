// Create audio element set to location of audio file
let audio1 = new Audio();
audio1.src = 'tune.mp3';

// Gather container and canvas elements from html file
const container = document.getElementById('container');
const canvas = document.getElementById('canvas');

// Set canvas element equal to browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Needed to create audio source & analyzer
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioSource = null;
let analyser = null;

audio1.play();

// Create audio source & analyzer nodes
audioSource = audioCtx.createMediaElementSource(audio1);
analyser = audioCtx.createAnalyser();
// Create chain for audio to flow through
audioSource.connect(analyser); // Connect audio to anaylyzer
analyser.connect(audioCtx.destination); // Connect analyzer to speakers

analyser.fftSize = 128; // samples (data) per second
const bufferLength = analyser.frequencyBinCount; // Defined as: fftsize / 2
const dataArray = new Uint8Array(bufferLength); // Hold all data points collected from sound
const barWidth = canvas.width / bufferLength; // Determine size of bars across screen

function animate() {
  x = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);
  for (let i = 0; i < bufferLength; ++i) {
    barHeight = dataArray[i];
    ctx.fillStyle = 'white';
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
  }

  requestAnimationFrame(animate);
}
