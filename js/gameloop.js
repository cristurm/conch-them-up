window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var GameLoop = function () {
	return {
		init: function () {
			var myself = this;
		
			this.counter = 0;
			this.auxIndex = 0;
			this.date = new Date();
			this.currentTime = this.date.getTime();
			this.pastTime = this.date.getTime();
			this.timerFlag = true;
			this.summonDifference = 0;
			this.score = 0;
		
			// game elements
			this.enemies = [];
			this.skills = [];
			this.mainChar = new Character();
			this.mainChar.init();
			
			// scene sprites
			this.bgPattern = '';
			this.bg = new Image();
			this.bg.src = 'img/grass_pattern.jpg';
			this.bg.onload = function(){
				myself.bgPattern = GC.gameGeneratePattern(myself.bg, 'repeat');
				myself.theLoop();
			};
			
			GC.uiUpdateScore(this.score);
		},
		
		scoreUp: function (_plusScore) {
			// Get this shit working.
			this.score += _plusScore;
			GC.uiUpdateScore(this.score);
		},
		
		summonEnemy: function () {
			var newEnemy = new Enemy(),
				randomY = Math.floor(Math.random() * GC.height),
				randomSize = Math.random() > 0.7 ? "big" : "small";
			
			newEnemy.init(randomSize, randomY);
			this.enemies.push(newEnemy);
		},
	
		theLoop: function () {
			var myself = this;		
			
			this.update();
			this.draw();
			
			requestAnimationFrame(function () {
				myself.theLoop()
			});
		},
		
		update: function () {			
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
					
					if (enemy.posX < -enemy.size){
						this.enemies.splice(this.auxIndex, 1);
					}
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
		},
		
		draw: function () {
			GC.clear();
			
			GC.gameDrawRectangle(this.bgPattern, 0, 0, GC.width, GC.height);
			
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
	}
}