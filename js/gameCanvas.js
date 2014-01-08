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
		
		// GAME canvas
		gameDrawRectangle: function (_style, _posX, _posY, _width, _height) {
			//this.gameContext.save();
			this.gameContext.fillStyle = _style;
			this.gameContext.fillRect(_posX, _posY, _width, _height);
		},
		
		gameGeneratePattern: function (_img, _repeat) {
			var pattern = this.gameContext.createPattern(_img, _repeat); 
			
			return pattern;
		},
		
		// UI canvas
		uiUpdateScore: function (_newScore) {		
			var label = "Score: " + _newScore;
			
			this.clear(this.uiContext);
			this.uiWriteText('14px Arial', 'white', label, 10, 20);
			this.uiDrawScoreBar(GL.scoreBarColor, GL.scoreBarBGColor, 10, 580, GL.scoreBarWidth, GL.scoreBarBGWidth, 10);
		},
		
		uiDrawScoreBar: function (_style, _bgStyle, _posX, _posY, _width, _bgWidth, _height) {
			this.uiContext.fillStyle = _bgStyle;
			this.uiContext.fillRect(_posX, _posY, _bgWidth, _height);
			
			this.uiContext.fillStyle = _style;
			this.uiContext.fillRect(_posX, _posY, _width, _height);
		},
		
		uiWriteText: function (_font, _style, _text, _posX, _posY) {			
			this.uiContext.font = _font;
			this.uiContext.fillStyle = _style;
			this.uiContext.fillText(_text, _posX, _posY);
		},
		
		// Generic
		clear: function (_context) {
			_context.clearRect(0, 0, this.width, this.height);
		}
	}
}