var doc = document,
		canvas = doc.getElementById('colorpicker'),
		ctx = canvas.getContext('2d'),
		hexOutput = doc.querySelector('.output-hex'),
		rgbOutput = doc.querySelector('.output-rgb');

function rgbToHex(R,G,B) {
	return toHex(R)+toHex(G)+toHex(B);
}

function toHex(n) {
	var n = parseInt(n,10),
			hexNum = "0123456789ABCDEF".charAt((n-n%16)/16);
	if (isNaN(n)) {
		return "00";
	}
	n = Math.max(0,Math.min(n,255));
	var hexcode = hexNum + hexNum + hexNum  + hexNum + hexNum + hexNum;
	return "#" + hexcode;
}

function createSpan(colors) {
	var span = doc.createElement('span'),
	colorVal = colors.join(),
	bgColor = "rgb(" + colorVal + ")";
	console.log(bgColor);
	span.className = 'block';
	span.style.backgroundColor = bgColor;
	span.setAttribute('data-color', '#' + rgbToHex(colors[0], colors[1], colors[2]));
	canvas.appendChild(span);
}

function makeRectangles(colors) {
	var colorVal = colors.join(),
			bgColor = "rgb(" + colorVal + ")";
	for (var i = 0; i < 50; i++) {
		var x = 0,
				y = 0;
		ctx.fillStyle = bgColor;
		ctx.fillRect(x, y, 50, 50);
		x += 10;
		y += 10;
	}
}

function makeGrays() {
	var R = 0,
			G = 0,
			B = 0,
			x = 0,
			y = 0;

	for (var i = 0; i < 256; i++) {
		var rgb = R + ', ' + G + ', ' + B,
				bgColor = "rgb(" + rgb + ")"; 
		ctx.fillStyle = bgColor;
		ctx.fillRect(x, y, 700, 1);
		R++;
		G++;
		B++;
		y++;
	}
}

function makeReds() {
	var r = 0,
	g = 0,
	b = 0;

	for (var i = 0; i < 256; i++) {
		var colorArray = [r, g, b];
		g++;
		b++;
		createSpan(colorArray);
	}
}

function makeGreens() {
	var r = 0,
	g = 0,
	b = 0;

	for (var i = 0; i < 256; i++) {
		var colorArray = [r, g, b];
		r++;
		b++;
		createSpan(colorArray);
	}
}

function makeBlues() {
	var r = 0,
	g = 0,
	b = 0;

	for (var i = 0; i < 256; i++) {
		var colorArray = [r, g, b];
		r++;
		g++;
		createSpan(colorArray);
	}
}

function getPosition(evt) {
	var x = evt.pageX - this.offsetLeft,
			y = evt.pageY - this.offsetTop,
			imgData = ctx.getImageData(x, y, 1, 1).data,
			R = imgData[0],
			G = imgData[1],
			B = imgData[2],
			rgb = R + ', ' + G + ', ' + B;
	rgbOutput.value = rgb;
	hexOutput.value = toHex(rgb);
	// console.log(x, y);
}

canvas.addEventListener('click', getPosition, false);
makeGrays();
