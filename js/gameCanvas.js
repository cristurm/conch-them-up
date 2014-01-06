var GameCanvas = function () {
	return {
		init: function () {
			this.width = 800;
			this.height = 600;
			this.canvas = document.getElementById("conch-them-up");
			this.context = this.canvas.getContext("2d");
		},
		
		updateScore: function (_newScore) {
			//this.score.innerHTML = _newScore;
			
			this.writeText('14px Arial', 'white', 'blah', 10, 10);
		},
		
		drawRectangle: function (_style, _posX, _posY, _width, _height) {
			this.context.save();
			this.context.fillStyle = _style;
			this.context.fillRect(_posX, _posY, _width, _height);
		},
		
		generatePattern: function (_img, _repeat) {
			var pattern = this.context.createPattern(_img, _repeat); 
			
			return pattern;
		},
		
		writeText: function (_font, _style, _text, _posX, _posY) {
			console.log('writeText', _text);
			
			this.context.font = _font;
			this.context.fillStyle = _style;
			this.context.fillText(_text, _posX, _posY);
		},
		
		// Clear the Canvas
		clear: function () {
			this.context.clearRect(0, 0, this.width, this.height);
		}
	}
}