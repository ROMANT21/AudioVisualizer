const button1 = document.getElementById('button1');
let audio1 = new Audio('The Beatles - Come Together.mp3');
const audioContext = new AudioContext();

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.Height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser

container.addEventListener('click', function(){
    audio1.play();
    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);


    const barWidth = canvas.width / bufferLength;
    let barHeight;
    let x;
    
    function animate(){
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i  = 0; i < bufferLength; i++){
            barHeight = dataArray[i] / 2;
            ctx.fillStyle = 'white';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
        requestAnimationFrame(animate);
    }
    animate();
});