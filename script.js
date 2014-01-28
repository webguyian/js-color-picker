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
colorInputs = doc.querySelectorAll('.input'),
swatches = doc.querySelector('.swatches'),
instructions = doc.querySelector('.instructions'),
addInstructions = instructions.innerHTML,
removeInstructions = 'Remove a swatch by double-clicking on it.',
counter = 0;

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

		canvas.addEventListener('mousemove', function(evt) {
			cp.getImgData(1, 1, evt);
		}, false);

		canvas.addEventListener('click', function(evt) {
			var imgData = cp.getImgData(1, 1, evt);
			cp.addColor(imgData);
		}, false)

		cp.makeGradient();
	},

	getPosition: function(canvasElement, evt) {
		var rect = canvasElement.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	},

	getImgData: function(sizeX, sizeY, evt) {
		var mousePos = this.getPosition(canvas, evt),
		imgData = ctx.getImageData(mousePos.x, mousePos.y, sizeX, sizeY),
		r = imgData.data[0],
		g = imgData.data[1],
		b = imgData.data[2],
		rgb = r + ', ' + g + ', ' + b;
		rgbOutput.value = rgb;
		hexOutput.value = rgbToHex(r, g, b);
		return rgb;
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
	},

	displayInstructions: function(counter) {
		return counter ? instructions.innerHTML = removeInstructions : instructions.innerHTML = addInstructions;
	},

	addColor: function(colorData) {
		var cp = this,
		newSwatch = doc.createElement('div');
		counter++;
		this.displayInstructions(counter);
		newSwatch.className = 'swatch';
		newSwatch.style.backgroundColor = 'rgb(' + colorData + ')';
		newSwatch.setAttribute('data-rgb', colorData);
		newSwatch.onmouseover = function() { cp.displayColor(this); };
		newSwatch.ondblclick = function() { cp.removeColor(this); };
		swatches.appendChild(newSwatch);
		return newSwatch;
	},

	removeColor: function(swatch) {
		swatch.parentNode.removeChild(swatch);
		counter--;
		this.displayInstructions(counter);
		return null;
	},

	displayColor: function(swatch) {
		var swatchColor = swatch.dataset.rgb.split(','),
		rgbColors = [];
		for (var i = 0; i < 3; i++) {
			var color = parseInt(swatchColor[i], 10);
			rgbColors.push(color);
		}
		rgbOutput.value = swatch.dataset.rgb;
		hexOutput.value = rgbToHex(rgbColors[0], rgbColors[1], rgbColors[2]);
	}

};

ColorPicker.init();