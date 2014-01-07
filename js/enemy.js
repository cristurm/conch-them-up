var Enemy = function () {
	return {
		init: function (_type, _posY) {
			this.type = _type;
			this.bullets = GL.bullets;
			this.auxIndex = 0;
			this.healthBarColor = "#32CD32";
			
			switch (_type) {
				case "big" :
					this.size = 50;
					this.color = "#cd1b62";
					this.speed = 1;
					this.health = 5;
					this.points = 500;
					break;
				case "small" :
					this.size = 25;
					this.color = "#9e2100";
					this.speed = 3;
					this.health = 1;	
					this.points = 100;
					break;
			}
			
			this.posX = 800;			
			this.posY = _posY < 10 ? 10 : _posY; // Add 10px spacing from the top if needed
			this.posY = _posY > (GC.height - this.size - 10) ? GC.height - this.size - 10 : this.posY; // Fix and add 10px spacing from the bottom if needed
			this.initialHealth = this.health;
			this.healthBarWidth = this.size;
			this.base = (this.posY + this.size) + 2;
		},
		
		move: function () {
			this.posX -= this.speed;
		},
		
		die: function () {
			this.health -= 1;			
		
			if (this.health <= 0) {
				var index = GL.enemies.indexOf(this);
				
				if (index >= 0) {
					GL.scoreUp(this.points);
					GL.enemies.splice(index, 1);
				}
			}
			
			this.healthBarWidth = (this.size / this.initialHealth) * this.health;
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
						
						var index = GL.skills.indexOf(skill);						
						GL.skills.splice(index, 1);
					}
				}
			}
		},
		
		draw: function () {
			GC.gameDrawRectangle(this.color, this.posX, this.posY, this.size, this.size);
			GC.gameDrawRectangle(this.healthBarColor, this.posX, this.base, this.healthBarWidth, 2);
		}
	}
}