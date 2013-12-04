window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var GameLoop = function () {
	return {
		init: function () {
			this.ctx;
			this.xPosition = 0;
			this.yPosition = 0;
			
			// game elements
			this.mainChar = new Character();
			
			this.mainChar.init();
			
			this.gl();
		},
	
		gl: function () {
			var myself = this;		
			
			this.update();
			this.draw();
			
			requestAnimationFrame(function () {
				myself.gl()
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