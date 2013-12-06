var Enemy = function () {
	return {
		init: function (_type, _posY) {
			this.type = _type;
			this.bullets = GL.bullets;
			this.auxIndex = 0;
			
			switch (_type) {
				case "big" :
					this.size = 50;
					this.color = "#8B0000";
					this.speed = 1;
					this.posX = 800;
					this.posY = _posY > (GC.height - this.size) ? GC.height - this.size : _posY;
					
					break;
				case "small" :
					this.size = 25;
					this.color = "#CD5C5C";
					this.speed = 3;
					this.posX = 800;
					this.posY = _posY > (GC.height - this.size) ? GC.height - this.size : _posY;
					
					break;
			}
		},
		
		move: function () {
			this.posX -= this.speed;
		},
		
		die: function () {
			var index = GL.enemies.indexOf(this);
			
			if (index >= 0) {
				GL.enemies.splice(index, 1);
			}
			
			DEBUG.log('enemy down! ' + index);
		},
		
		update: function () {
			this.move();
			
			this.auxIndex = 0;
			for (this.auxIndex = 0; this.auxIndex < GL.skills.length; this.auxIndex += 1) {
				if(GL.skills[this.auxIndex]) {
					var skill = GL.skills[this.auxIndex];
					
					if (((skill.posX + skill.size) > this.posX && skill.posX < (this.posX + this.size)) &&
						((skill.posY + skill.size) > this.posY && skill.posY < (this.posY + this.size))) {
						
						this.die();
					}
				}
			}
		},
		
		draw: function () {
			GC.drawRectangle(this.color, this.posX, this.posY, this.size, this.size);
		}
	}
}