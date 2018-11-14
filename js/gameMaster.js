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

		// score controlling / viewing
		this.score = 0;
		this.scoreGoal = 1000;
		this.scoreBarColor = "#00ff00";
		this.scoreBarBCANVASolor = "#ff9900";
		this.scoreBarBGWidth = CANVAS.width - 20;
		this.scoreBarWidth = this.score;

		// game elements
		this.enemies = [];
		this.skills = [];
		this.mainChar = new Character(this);

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

	scoreUp (_plusScore) {
		this.score += _plusScore;
		this.score = this.score > this.scoreGoal ? this.scoreGoal : this.score;

		this.scoreBarWidth = (this.scoreBarBGWidth / this.scoreGoal) * this.score;

		CANVAS.uiUpdateScore(this.score);
	}

	scoreDown (_minusScore) {
		this.score -= _minusScore;

		if (this.score < 0) {
			this.gameState = "gameOver";
			this.score = 0;
		}

		this.scoreBarWidth = (this.scoreBarBGWidth / this.scoreGoal) * this.score;

		CANVAS.uiUpdateScore(this.score);
	}

	summonEnemy () {
		var newEnemy = new Enemy(),
			randomY = Math.floor(Math.random() * CANVAS.height),
			randomSize = Math.random() > 0.7 ? "big" : "small";

		newEnemy.init(randomSize, randomY);
		this.enemies.push(newEnemy);
	}

	vanishEnemy  (_enemy) {
		var enemyIndex = this.enemies.indexOf(_enemy);
		this.enemies.splice(enemyIndex, 1);
	}

	vanishSkill (_skill) {
		var skillIndex = this.skills.indexOf(_skill);
		this.skills.splice(skillIndex, 1);
	}

	reset () {
		this.score = 0;
		this.enemies = [];
		this.skills = [];
		this.mainChar = new Character();
		this.mainChar.init();
	}

	/* UPDATE METHODS */
	initialStateUpdate () {
		if (KEYBOARD.isKeyDown("space") == true) {
			this.gameState = "playing";
			CANVAS.clear(CANVAS.uiContext);
			CANVAS.uiUpdateScore(this.score);
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

		// Update skills
		this.auxIndex = 0;
		for (this.auxIndex = 0; this.auxIndex < this.skills.length; this.auxIndex += 1) {
			if(this.skills[this.auxIndex]) {
				var skill = this.skills[this.auxIndex];

				skill.update();
			}
		}
	}

	togglePauseStateUpdate () {
		// Pause / Unpause
		/*
		prevEscKeyDown is used to detect if the esc key was previously pressed (on hold),
		we must treat it so the game won't pause/unpause like crazy due to processing spee.
		*/
		if (KEYBOARD.isKeyDown("esc") == true && this.prevEscKeyDown !== true) {
			this.gameState = this.gameState == "playing" ? "paused" : "playing";
			CANVAS.clear(CANVAS.uiContext);
			CANVAS.uiUpdateScore(this.score);
		}

		if (this.prevEscKeyDown !== KEYBOARD.isKeyDown("esc")) {
			this.prevEscKeyDown = KEYBOARD.isKeyDown("esc");
		}
	}

	gameOverStateUpdate () {
		if (KEYBOARD.isKeyDown("space") == true) {
			this.reset();
			this.gameState = "playing";
			CANVAS.clear(CANVAS.uiContext);
			CANVAS.uiUpdateScore(this.score);
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
		CANVAS.clear(CANVAS.uiContext);

		// Draw Background Pattern
		CANVAS.gameDrawRectangle(this.bgPattern, 0, 0, CANVAS.width, CANVAS.height);

		CANVAS.uiWriteText("38px 'Press Start 2P'", "white", "Conch Them Up!", CANVAS.width * 0.5, CANVAS.height * 0.5 - 10, "center");
		CANVAS.uiWriteText("bold 20px monospace", "white", "Press SPACEBAR do begin", CANVAS.width * 0.5, CANVAS.height * 0.5 + 20, "center");
	}

	playingStateDraw () {
		// Clear Game Canvas
		CANVAS.clear(CANVAS.gameContext);

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

		// Draw Skills
		this.auxIndex = 0;
		for (this.auxIndex = 0; this.auxIndex < this.skills.length; this.auxIndex += 1) {
			if(this.skills[this.auxIndex]) {
				this.skills[this.auxIndex].draw();
			}
		}
	}

	gameOverStateDraw () {
		CANVAS.clear(CANVAS.uiContext);

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
