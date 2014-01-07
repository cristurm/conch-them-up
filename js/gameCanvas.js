var GameCanvas = function () {
	return {
		init: function () {
			this.width = 800;
			this.height = 600;
			this.gameCanvas  = document.getElementById("conch-them-up");
			this.uiCanvas    = document.getElementById("ui");
			this.gameContext = this.gameCanvas.getContext("2d");
			this.uiContext   = this.uiCanvas.getContext("2d");
		},		
		
		gameDrawRectangle: function (_style, _posX, _posY, _width, _height) {
			this.gameContext.save();
			this.gameContext.fillStyle = _style;
			this.gameContext.fillRect(_posX, _posY, _width, _height);
		},
		
		gameGeneratePattern: function (_img, _repeat) {
			var pattern = this.gameContext.createPattern(_img, _repeat); 
			
			return pattern;
		},
		
		uiUpdateScore: function (_newScore) {
			var label = "Score: " + _newScore;
			
			this.uiContext.clearRect(0, 0, this.width, this.height);
			this.uiWriteText('14px Arial', 'white', label, 10, 20);
		},
		
		uiWriteText: function (_font, _style, _text, _posX, _posY) {
			console.log('uiWriteText', _text);
			
			this.uiContext.font = _font;
			this.uiContext.fillStyle = _style;
			this.uiContext.fillText(_text, _posX, _posY);
		},
		
		// Clear the Canvas
		clear: function () {
			this.gameContext.clearRect(0, 0, this.width, this.height);
		}
	}
}