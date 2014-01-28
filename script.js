var doc = document,
		canvas = doc.getElementById('colorpicker'),
		ctx = canvas.getContext('2d'),
		hexOutput = doc.getElementsByName('output-hex')[0],
		rgbOutput = doc.getElementsByName('output-rgb')[0],
		redOutput = doc.getElementsByName('output-red')[0],
		greenOutput = doc.getElementsByName('output-green')[0],
		blueOutput = doc.getElementsByName('output-blue')[0],
		redInput = doc.getElementsByName('input-red')[0],
		greenInput = doc.getElementsByName('input-green')[0],
		blueInput = doc.getElementsByName('input-blue')[0],
		colorInputs = doc.querySelectorAll('.input');

function toHex(n) {
	var hex = n.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(R,G,B) {
	return '#' + toHex(R)+toHex(G)+toHex(B);
}

var ColorPicker = {

	init: function() {
		var cp = this,
				i = 0,
				len = colorInputs.length;

		for (i; i < len; i++) {
			colorInputs[i].addEventListener('change', cp.makeGradient.bind(cp), false);
		}

		canvas.addEventListener('mousemove', function(evt){
			var mousePos = cp.getPosition(this, evt);
			cp.getImgData(mousePos.x, mousePos.y, 1, 1);
		}, false);

		cp.makeGradient();
	},

	getPosition: function(canvasElement, evt) {
		var rect = canvasElement.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	},

	getImgData: function(mouseX, mouseY, sizeX, sizeY) {
		var imgData = ctx.getImageData(mouseX, mouseY, sizeX, sizeY),
				r = imgData.data[0],
				g = imgData.data[1],
				b = imgData.data[2],
				rgb = r + ', ' + g + ', ' + b;
		rgbOutput.value = rgb;
		hexOutput.value = rgbToHex(r, g, b);
	},

	getColors: function() {
		var red = redInput.value,
				green = greenInput.value,
				blue = blueInput.value,
				rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
		redOutput.value = red;
		greenOutput.value = green;
		blueOutput.value = blue;
		return rgb;
	},

	makeGradient: function() {
		var gradient = ctx.createLinearGradient(0, 0, 700, 256),
		colorStart = this.getColors();
		gradient.addColorStop(0, colorStart);
		gradient.addColorStop(1, '#ffffff');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, 700, 256);
	}

};

ColorPicker.init();