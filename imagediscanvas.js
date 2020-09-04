const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];



let mouse = {
	x: null,
	y: null,
    radius: 90
}
window.addEventListener('mousemove', 
	function(event){
		mouse.x = event.x + canvas.clientLeft;
		mouse.y = event.y + canvas.clientTop;
});

function drawImage(){
    let imageWidth = png.width || png.naturalWidth;
    let imageHeight = png.height || png.naturalHeight;
    const data = c.getImageData(0, 0, imageWidth, imageHeight);
    c.clearRect(0,0,canvas.width, canvas.height);
    class Particle {
        constructor(x, y, color, size){
            this.x = x + canvas.width-png.width,
            this.y = y + canvas.height/2-png.width,
            this.color = color,
            this.size = 2,
            this.baseX = x + canvas.width/2-png.width*2,
            this.baseY = y + canvas.height/2-png.width*2,
            this.density = ((Math.random() * 50) + 10);
        }
        draw() {
            c.beginPath();
            c.fillRect(this.x, this.y, this.size*3, this.size *3);
            c.closePath();
            c.fill();
        }
        update() {
            c.fillStyle = this.color;
            
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            
            var maxDistance = 100;
            var force = (maxDistance - distance) / maxDistance;

            
            if (force < 0) force = 0;

            let directionX = (forceDirectionX * force * this.density) * 0.9;
            let directionY = (forceDirectionY * force * this.density) * 0.9;

            if (distance < mouse.radius + this.size){
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX ) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.x -= dx/5;
                } if (this.y !== this.baseY) {
                    let dx = this.x - this.baseX;
                    let dy = this.y - this.baseY;
                    this.y -= dy/5;
                }
            }
            this.draw();
        }
    }
    function init(){
        particleArray = [];

        for (var y = 0, y2 = data.height; y < y2; y++) {
            for (var x = 0, x2 = data.width; x < x2; x++) {
                if (data.data[(y * 4 * data.width) + (x * 4) + 3] > 128) {
                    let positionX = x;
                    let positionY = y;
                    let color = "rgb("+data.data[(y * 4 * data.width)+ (x * 4)]+","+data.data[(y * 4 * data.width)+ (x * 4) +1]+","+data.data[(y * 4 * data.width)+ (x * 4) +2]+")";

                    particleArray.push(new Particle(positionX*4, positionY*4, color));

                }
            }
        }
        
    }
    function animate(){
        requestAnimationFrame(animate);
        c.fillStyle = 'rgba(255,255,255,.1)';
        c.fillRect(0,0,innerWidth,innerHeight);
	    
	
	    for (let i = 0; i < particleArray.length; i++){
            particleArray[i].update();
	    }
    }
    init();
    animate();

    window.addEventListener('resize',
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		init();
	});
}


var png = new Image();
png.src = "data:image/png;base64,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";

window.addEventListener('load', (event) => {
    
    c.drawImage(png, 0, 0);
    drawImage();
});