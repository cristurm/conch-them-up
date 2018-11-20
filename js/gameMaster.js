window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

class GameMaster {
	constructor () {
		var gameMaster = this;

		this.date = new Date();

		// "initial" || "playing" || "paused" || "victory" || "gameOver"
		this.gameState = "initial";
		this.prevEscKeyDown = KEYBOARD.isKeyDown("esc");

		// game elements
		this.enemyCompany = new EnemyCompany(this);
		this.mainChar = new Character(this);
		this.machinegun = new MachineGun(this);

		this.scoreManager = new ScoreManager(this);

		// scene sprites
		this.bgPattern = "";
		this.bg = new Image();
		this.bg.src = "img/grass_pattern.jpg";

		// begin! (only when all needed assets are loaded)
		this.bg.onload = function() {
			gameMaster.bgPattern = CANVAS.gameGeneratePattern(gameMaster.bg, "repeat");
			gameMaster.theLoop();
		};
	}

	theLoop () {
		var gameMaster = this;

		this.update();
		this.draw();

		requestAnimationFrame(function () {
			gameMaster.theLoop();
		});
	}

	endGame () {
		this.gameState = "gameOver";
	}

	increaseScore (_points) {
		this.scoreManager.scoreUp(_points);
	}

	decreaseScore (_penalty) {
		this.scoreManager.scoreDown(_penalty);
	}

	vanishBullet (_bullet) {
		this.machinegun.vanishBullet(_bullet);
	}

	getBullets () {
		return this.machinegun.bullets;
	}

	reset () {
		this.enemyCompany.clearField();
		this.machinegun.emptyGun();
		this.mainChar.rebirth();
		this.scoreManager.resetScore();
	}

	/* UPDATE METHODS */
	initialStateUpdate () {
		if (KEYBOARD.isKeyDown("space")) {
			this.gameState = "playing";
			this.scoreManager.updateScoreUI();
		}
	}

	playingStateUpdate () {
		this.date = new Date();

		this.mainChar.update();
		this.enemyCompany.update();
		this.machinegun.update(this.mainChar);
	}

	togglePauseStateUpdate () {
		// Pause / Unpause
		/*
		prevEscKeyDown is used to detect if the esc key was previously pressed (on hold),
		we must treat it so the game won't pause/unpause like crazy due to processing speed.
		*/
		if (KEYBOARD.isKeyDown("esc") && !this.prevEscKeyDown) {
			this.gameState = this.gameState === "playing" ? "paused" : "playing";
			this.scoreManager.updateScoreUI();
		}

		this.prevEscKeyDown = KEYBOARD.isKeyDown("esc");
	}

	gameOverStateUpdate () {
		if (KEYBOARD.isKeyDown("space")) {
			this.reset();
			this.gameState = "playing";
			this.scoreManager.updateScoreUI();
		}
	}

	update () {
		switch (this.gameState) {
			case "initial" :
				this.initialStateUpdate();
				break;

			case "playing" :
				this.playingStateUpdate();

			case "paused" :
				this.togglePauseStateUpdate();
				break;

			case "gameOver" :
				this.gameOverStateUpdate();
				break;
		}
	}

	/* DRAW METHODS */
	initialStateDraw () {
		CANVAS.uiClearContext();

		// Draw Background Pattern
		CANVAS.gameDrawRectangle(this.bgPattern, 0, 0, CANVAS.width, CANVAS.height);

		CANVAS.uiWriteText("38px 'Press Start 2P'", "white", "Conch Them Up!", CANVAS.width * 0.5, CANVAS.height * 0.5 - 10, "center");
		CANVAS.uiWriteText("bold 20px monospace", "white", "Press SPACEBAR do begin", CANVAS.width * 0.5, CANVAS.height * 0.5 + 20, "center");
	}

	playingStateDraw () {
		// Clear Game Canvas
		CANVAS.gameClearContext();

		// Draw Background Pattern
		CANVAS.gameDrawRectangle(this.bgPattern, 0, 0, CANVAS.width, CANVAS.height);

		this.mainChar.draw();
		this.enemyCompany.draw();
		this.machinegun.draw();
	}

	gameOverStateDraw () {
		CANVAS.uiClearContext();

		// Draw Background Pattern
		CANVAS.gameDrawRectangle(this.bgPattern, 0, 0, CANVAS.width, CANVAS.height);

		CANVAS.uiWriteText("38px 'Press Start 2P'", "black", "GAME OVER", CANVAS.width * 0.5, CANVAS.height * 0.5 - 10, "center");
		CANVAS.uiWriteText("bold 20px monospace", "black", "Press SPACEBAR do restart", CANVAS.width * 0.5, CANVAS.height * 0.5 + 20, "center");
	}

	draw () {
		switch (this.gameState) {
			case "initial" :
				this.initialStateDraw();
				break;

			case "playing" :
				this.playingStateDraw();
				break;

			case "paused" :
				CANVAS.uiWriteText("38px 'Press Start 2P'", "white", "PAUSED", CANVAS.width * 0.5, CANVAS.height * 0.5, "center");
				break;

			case "gameOver" :
				this.gameOverStateDraw();

		}
	}
}
