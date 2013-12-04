var Character = function () {
	return {
		init: function () {
			this.posX = 50;
			this.posY = GC.height * 0.5;
			this.size = 20;
			this.color = "#6495ED";
			this.speed = 5;
			
			this.charWidth = this.size;
			this.charHeight = this.size * 2;
			this.bullets = [];
			this.lastSkill;
			this.bulletsBool = true;
		},
		
		move: function () {
			// up
			if (KB.isKeyDown("w")) {
				if (this.posY > 10) { 
					this.posY -=  this.speed; 
				}
			}
			
			// down
			if (KB.isKeyDown("s")) {
				if (this.posY < GC.height - this.charHeight - 10) { 
					this.posY += this.speed; 
				}
				
			}
			
			// right
			if (KB.isKeyDown("d")) {
				if (this.posX < GC.width - this.charWidth - 10) { 
					this.posX += this.speed; 
				}
			}
			
			// left
			if (KB.isKeyDown("a")) {
				if (this.posX > 10) { 
					this.posX -= this.speed; 
				}
			}
		},
		
		shoot: function (_skillType, _skillX, _skillY) {
			var newSkill = new Skill();
			newSkill.init(_skillType, _skillX, _skillY);
			
			this.bulletsBool = false;
			this.bullets.push(newSkill);
			this.lastSkill = this.bullets[this.bullets.length - 1];
		},
		
		update: function () {
			this.move();
			
			// Shoot!
			if (KB.isKeyDown("space") && this.bulletsBool) {
				var skillPosY = this.posY + this.charHeight * 0.5,
					skillPosX = this.posX + this.charWidth * 0.5;
					
				this.shoot("thunder", skillPosX, skillPosY);
			}
			
			// Update Bullets
			var index = 0;
			for (index = 0; index < this.bullets.length; ++index) {
				if(this.bullets[index]) {
					this.bullets[index].update();
					
					if (this.bullets[index].posX > GC.width){
						this.bullets.splice(index, 1);
					}
				}
			}		
			
			// Bullet Delay	
			if (this.lastSkill) { 
				if (this.lastSkill.posX > this.lastSkill.initPos + 100){
					this.bulletsBool = true;
				}
			}
		},
		
		draw: function () {
			GC.drawRectangle(this.color, this.posX, this.posY, this.charWidth, this.charHeight);
			
			// Draw Bullets
			var index = 0;
			for (index = 0; index < this.bullets.length; ++index) {
				if(this.bullets[index]) {
					this.bullets[index].draw();
				}
			}
		}
	}
}