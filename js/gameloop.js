window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var GameLoop = function () {
	return {
		init: function () {
			this.enemies = [];
			this.counter = 0;
			this.date = new Date();
		
			// game elements
			this.mainChar = new Character();
			this.mainChar.init();
			
			this.theLoop();
		},
		
		summonEnemy: function () {
			var newEnemy = new Enemy();
			newEnemy.init("#f00", 800, 300, 10, 2);
			
			this.enemies.push(newEnemy);
			
			console.log(this.enemies);
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
		},
		
		draw: function () {
			GC.clear();
			
			this.mainChar.draw();
		}
	}
}