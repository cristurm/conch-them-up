window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

class GameMaster {
	constructor () {
		var gameMaster = this;

		this.counter = 0;
		this.auxIndex = 0;
		this.date = new Date();
		this.currentTime = this.date.getTime();
		this.pastTime = this.date.getTime();
		this.timerFlag = true;
		this.summonDifference = 0;

		// "initial" || "playing" || "paused" || "victory" || "gameOver"
		this.gameState = "initial";
		this.prevEscKeyDown = KEYBOARD.isKeyDown("esc");

		// game elements
		this.enemies = [];
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

	summonEnemy () {
		const randomY = Math.floor(Math.random() * CANVAS.height);
		const randomSize = Math.random() > 0.7 ? "big" : "small";
		const newEnemy = new Enemy(randomSize, randomY);

		this.enemies.push(newEnemy);
	}

	vanishEnemy  (_enemy) {
		var enemyIndex = this.enemies.indexOf(_enemy);
		this.enemies.splice(enemyIndex, 1);
	}

	vanishSkill (_bullet) {
		this.machinegun.vanishBullet(_bullet);
	}

	reset () {
		this.enemies = [];
		this.machinegun.emptyMachinegun();
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
		this.mainChar.update();

		// Summon Enemies Randomly
		this.date = new Date();
		this.currentTime = this.date.getTime();
		this.summonDifference = this.currentTime - this.pastTime;

		if (this.timerFlag) {
			this.pastTime = this.date.getTime();
			this.timerFlag = false;
		} else {
			if (this.summonDifference > 1000) {
				this.summonEnemy();

				this.timerFlag = true;
			}
		}

		// Update Enemies
		this.auxIndex = 0;
		for (this.auxIndex = 0; this.auxIndex < this.enemies.length; this.auxIndex += 1) {
			if(this.enemies[this.auxIndex]) {
				var enemy = this.enemies[this.auxIndex];

				enemy.update();
			}
		}

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

		// Draw Main Character
		this.mainChar.draw();

		// Draw Enemies
		this.auxIndex = 0;
		for (this.auxIndex = 0; this.auxIndex < this.enemies.length; this.auxIndex += 1) {
			if(this.enemies[this.auxIndex]) {
				this.enemies[this.auxIndex].draw();
			}
		}

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
