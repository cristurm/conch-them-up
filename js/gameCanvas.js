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

	// UI canvas
	uiUpdateScore (_newScore) {
		var label = "SCORE: " + _newScore;

		this.clear(this.uiContext);
		this.uiWriteText("bold 16px monospace", "white", label, 10, 20, "left");
		this.uiDrawScoreBar(GAMEMASTER.scoreBarColor, GAMEMASTER.scoreBarBCANVASolor, 10, 580, GAMEMASTER.scoreBarWidth, GAMEMASTER.scoreBarBGWidth, 10);
	}

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

	// Generic
	clear (_context) {
		_context.clearRect(0, 0, this.width, this.height);
	}
}
