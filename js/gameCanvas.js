class GameCanvas {
	constructor () {
		this.width = 800;
		this.height = 600;
		this.gameCanvas  = document.getElementById("conch-them-up");
		this.uiCanvas    = document.getElementById("ui");
		this.gameContext = this.gameCanvas.getContext("2d");
		this.uiContext   = this.uiCanvas.getContext("2d");
	}

	// GAME canvas
	gameDrawRectangle (_style, _posX, _posY, _width, _height) {
		//this.gameContext.save();
		this.gameContext.fillStyle = _style;
		this.gameContext.fillRect(_posX, _posY, _width, _height);
	}

	gameGeneratePattern (_img, _repeat) {
		var pattern = this.gameContext.createPattern(_img, _repeat);

		return pattern;
	}

	gameClearContext () {
		this.clear(this.gameContext);
	}

	// UI canvas
	uiDrawScoreBar (_style, _bgStyle, _posX, _posY, _width, _bgWidth, _height) {
		this.uiContext.fillStyle = _bgStyle;
		this.uiContext.fillRect(_posX, _posY, _bgWidth, _height);

		this.uiContext.fillStyle = _style;
		this.uiContext.fillRect(_posX, _posY, _width, _height);
	}

	uiWriteText (_font, _style, _text, _posX, _posY, _align) {
		this.uiContext.font = _font;
		this.uiContext.fillStyle = _style;
		this.uiContext.textAlign = _align;
		this.uiContext.fillText(_text, _posX, _posY);
	}

	uiClearContext () {
		this.clear(this.uiContext);
	}

	// Generic
	clear (_context) {
		_context.clearRect(0, 0, this.width, this.height);
	}
}
