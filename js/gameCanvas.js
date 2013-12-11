var GameCanvas = function () {
	return {
		init: function () {
			this.width = 800;
			this.height = 600;
			this.canvas = document.getElementById("conch-them-up");
			this.score = document.getElementById("score");
			this.context = this.canvas.getContext("2d");
		},
		
		updateScore: function (_newScore) {
			this.score.innerHTML = _newScore;
		},
		
		drawRectangle: function (_color, _posX, _posY, _width, _height) {
			this.context.save();
			this.context.fillStyle = _color;
			this.context.fillRect(_posX, _posY, _width, _height);
		},
		
		// Clear the Canvas
		clear: function () {
			this.context.clearRect(0, 0, this.width, this.height);
		}
	}
}