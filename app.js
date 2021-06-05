const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 1000;
let titleElement = document.querySelector('#title');
titleMeasurements = titleElement.getBoundingClientRect();
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10
}

// Measure title element

class Particle {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 +1;
        this.weight = Math.random() *1 + 1; 
        this.directionX = -2;
    }

    update(){
        if(this.y > canvas.height){
            this.y = 0 - this.size;
            this.weight = Math.random() *1 + 1;
            this.x = Math.random() * canvas.width*1.3;
        }
        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX;

        // check for collision between each particle and element
        if (
            this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ) {
            this.y -=3;
            this.weight *=-0.4;
        }
    }

    draw(){
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init(){
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++){
        particlesArray.push(new Particle(
            Math.random()* window.innerWidth, 
            Math.random() * window.innerHeight
        ));
    }
}
init();

function animate(){
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < numberOfParticles; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 10
    }
    init();
})