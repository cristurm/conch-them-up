window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var GameLoop = function () {
	return {
		init: function () {		
			var gameLoop = this;
			
			this.counter = 0;
			this.auxIndex = 0;
			this.date = new Date();
			this.currentTime = this.date.getTime();
			this.pastTime = this.date.getTime();
			this.timerFlag = true;
			this.summonDifference = 0;
			
			// "initial" || "playing" || "paused" || "victory" || "gameOver"
			this.gameState = "initial";
			this.prevEscKeyDown = KB.isKeyDown("esc");
			
			// score controlling / viewing
			this.score = 0;
			this.scoreGoal = 1000;
			this.scoreBarColor = "#00ff00";
			this.scoreBarBGColor = "#ff9900";
			this.scoreBarBGWidth = GC.width - 20;
			this.scoreBarWidth = this.score;
		
			// game elements
			this.enemies = [];
			this.skills = [];
			this.mainChar = new Character();
			this.mainChar.init();
			
			// scene sprites
			this.bgPattern = '';
			this.bg = new Image();
			this.bg.src = 'img/grass_pattern.jpg';
			
			// begin! (only when all needed assets are loaded)
			this.bg.onload = function() {
				gameLoop.bgPattern = GC.gameGeneratePattern(gameLoop.bg, 'repeat');
				gameLoop.theLoop();
			};

			GC.uiUpdateScore(this.score);
		},
		
		scoreUp: function (_plusScore) {
			this.score += _plusScore;
			this.score = this.score > this.scoreGoal ? this.scoreGoal : this.score;
			
			this.scoreBarWidth = (this.scoreBarBGWidth / this.scoreGoal) * this.score;
			
			GC.uiUpdateScore(this.score);
		},

		scoreDown: function (_minusScore) {
			this.score -= _minusScore;
			this.score = this.score < 0 ? 0 : this.score;
			
			this.scoreBarWidth = (this.scoreBarBGWidth / this.scoreGoal) * this.score;
			
			GC.uiUpdateScore(this.score);
		},
		
		summonEnemy: function () {
			var newEnemy = new Enemy(),
				randomY = Math.floor(Math.random() * GC.height),
				randomSize = Math.random() > 0.7 ? "big" : "small";
			
			newEnemy.init(randomSize, randomY);
			this.enemies.push(newEnemy);
		},

		vanishEnemy: function  (_enemy) {
			var enemyIndex = this.enemies.indexOf(_enemy);
			this.enemies.splice(enemyIndex, 1);
		},
	
		theLoop: function () {
			var gameLoop = this;		
			
			this.update();
			this.draw();
			
			requestAnimationFrame(function () {
				gameLoop.theLoop();
			});
		},
		
		update: function () {
			if (this.gameState == "initial") {
				if (KB.isKeyDown("space") == true) {
					this.gameState = "playing";
					GC.clear(GC.uiContext);
					GC.uiUpdateScore(this.score);
				}

			} else if (this.gameState == "playing") {
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
						
						if (skill.posX > GC.width){
							this.skills.splice(this.auxIndex, 1);
						}
					}
				}
			}
			
			// Pause / Unpause			
			/*
			prevEscKeyDown is used to detect if the esc key was previously pressed (hold),
			we must treat it so the game on pause/unpause like crazy due to processing speed 
			*/
			if (KB.isKeyDown("esc") == true && this.prevEscKeyDown !== true) {
				this.gameState = this.gameState == "playing" ? "paused" : "playing";
				GC.clear(GC.uiContext);
				GC.uiUpdateScore(this.score);
			}

			if (this.prevEscKeyDown !== KB.isKeyDown("esc")) {
				this.prevEscKeyDown = KB.isKeyDown("esc");
			}
		},
		
		draw: function () {
			if (this.gameState == "initial") {
				GC.clear(GC.uiContext);

				// Draw Background Pattern
				GC.gameDrawRectangle(this.bgPattern, 0, 0, GC.width, GC.height);

				GC.uiWriteText("38px 'Press Start 2P'", 'white', 'Conch Them Up!', GC.width * 0.5, GC.height * 0.5 - 10, 'center');
				GC.uiWriteText("bold 20px Arial", 'white', 'Press SPACEBAR do begin', GC.width * 0.5, GC.height * 0.5 + 20, 'center');
			} else if (this.gameState == "playing") {
				// Clear Game Canvas
				GC.clear(GC.gameContext);
				
				// Draw Background Pattern
				GC.gameDrawRectangle(this.bgPattern, 0, 0, GC.width, GC.height);

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
			} else if (this.gameState == "paused") {
				GC.uiWriteText("38px 'Press Start 2P'", 'white', 'PAUSED', GC.width * 0.5, GC.height * 0.5, 'center');
			}
		}
	}
}