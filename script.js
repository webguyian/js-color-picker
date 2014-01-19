var doc = document,
canvas = doc.getElementById('colorpicker'),
ctx = canvas.getContext('2d'),
hexOutput = doc.getElementsByName('output-hex')[0],
rgbOutput = doc.getElementsByName('output-rgb')[0],
redOutput = doc.querySelector('.output-red'),
greenOutput = doc.querySelector('.output-green'),
blueOutput = doc.querySelector('.output-blue'),
colorInputs = doc.querySelectorAll('.input'),
redInput = doc.getElementsByName('input-red')[0],
greenInput = doc.getElementsByName('input-green')[0],
blueInput = doc.getElementsByName('input-blue')[0];

var colorpicker = {

	init: function() {
		for (var i = 0; i < colorInputs.length; i++) {
			colorInputs[i].addEventListener('change', this.updateValues, false);
		}
		canvas.addEventListener('mousemove', this.getPosition, false);
		makeGradient();
	},

	updateValues: function() {
		var target = this.dataset.target,
		output = doc.querySelector('.output-' + target);
		output.innerHTML = this.value;
		makeGradient();
		return this.value;
	},

	getPosition: function(evt) {
		var x = evt.pageX - this.offsetLeft,
		y = evt.pageY - this.offsetTop,
		coordinates = [];
		coordinates.push(x);
		coordinates.push(y);
		cp.returnImageData(coordinates);
		return coordinates;
	}
};

function rgbToHex(R,G,B) {
	return '#' + toHex(R)+toHex(G)+toHex(B);
}

function toHex(n) {
	var hex = n.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function makeGradient() {
	var r = redInput.value,
			g = greenInput.value,
			b = blueInput.value,
			rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')',
			gradient = ctx.createLinearGradient(0, 0, 700, 256);
	gradient.addColorStop(0, rgb);
	gradient.addColorStop(1, 'white');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 700, 256);
}

function returnImageData(mousePosition) {
		var coordinates = mousePosition,
				x = coordinates[0],
				y = coordinates[1],
				imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
				red = imgData[0],
				green = imgData[1],
				blue = imgData[2],
				rgb = red + ', ' + green + ', ' + blue;
		rgbOutput.value = rgb;
		hexOutput.value = rgbToHex(red, green, blue);
		return rgb;
	}

colorpicker.init();

