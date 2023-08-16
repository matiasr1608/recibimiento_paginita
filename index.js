
var bottom, space, sample;

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas(canvas,context) {
	bottom = window.innerHeight;
	sample = Math.round(window.innerWidth / 20);
	space = Math.round(window.innerWidth / sample);
	canvas.width = window.innerWidth;
	canvas.height = bottom;
	drawStuff(context);
}
window.addEventListener("load", (event) => {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    resizeCanvas(canvas,context);

});


function drawStuff(context) {
	var j = 1;
	var k = j;
	var red, green, blue;
	
	//loop
	setInterval(function() {
		j++;
		if (j > (sample / 60 * 100)){
			j = 0;
		}
		k = j;
		drawWave(k);
	}, 50)
	
	function drawWave(k) {
		//clearing canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		//drawing each line
		for (var i = sample; i > 0; i--) {
			var pos = (space * i) - (space / 2);
			var length = (bottom / 5 * 3) - (Math.sin((k / sample) * 1.2 * Math.PI) * (bottom / 5));
			color(i - 1);
			context.beginPath();
			context.moveTo(pos, bottom);
			context.lineTo(pos, length);
			context.strokeStyle = "rgb(" + red + "," + green + "," + blue + ")";
			context.lineWidth = 2;
			context.lineCap = "round";
			context.stroke();
			context.closePath();
			k++;
		}
		
		//coloring each line
		function color(index) {
			var range = (sample / 6)
			var step = 255 / range;
			var start = 5;
			var order, sector;
			if (index < range) {
				order = start;
				sector = 0;
			} else if (index < range * 2) {
				order = start + 1;
				sector = 1;
			} else if (index < range * 3) {
				order = start + 2;
				sector = 2;
			} else if (index < range * 4) {
				order = start + 3;
				sector = 3;
			} else if (index < range * 5) {
				order = start + 4;
				sector = 4;
			} else {
				order = start + 5;
				sector = 5;
			};
			
			if(order > 6){
				order -= 6; 
			}
			
			switch(order) {
				case 1:
					red = 255;
					blue = 0;
					green = Math.round(step * (index - (sector * range)));
					break;
				case 2:
					green = 255;
					blue = 0;
					red = 255 - Math.round(step * (index - (sector * range)));
					break;
				case 3:
					green = 255;
					red = 0;
					blue = Math.round(step * (index - (sector * range)));
					break;
				case 4:
					blue = 255;
					red = 0;
					green = 255 - Math.round(step * (index - (sector * range)));
					break;
				case 5:
					blue = 255;
					green = 0;
					red = Math.round(step * (index - (sector * range)));
					break;
				case 6:
					red = 255;
					green = 0;
					blue = 255 - Math.round(step * (index - (sector * range)));
					break;
			}
		}
	}
}