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
			this.skill = [];
			this.lastSkill;
			this.skillBool = true;
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
			
			this.skillBool = false;
			this.skill.push(newSkill);
			this.lastSkill = this.skill[this.skill.length - 1];
		},
		
		update: function () {
			this.move();
			
			// Shoot!
			if (KB.isKeyDown("space") && this.skillBool) {
				this.shoot("thunder", this.posX, this.posY);
			}
			
			var index = 0;
			for (index = 0; index < this.skill.length; ++index) {
				if(this.skill[index]) {
					this.skill[index].update();
					
					if (this.skill[index].posX > GC.width){
						this.skill.splice(index, 1);
					}
				}
			}		
			
			// Bullet Delay			
			if (this.lastSkill) { 
				if (this.lastSkill.posX > this.lastSkill.initPos + 100){
					this.skillBool = true;
				}
			}
		},
		
		draw: function () {
			GC.drawRectangle(this.color, this.posX, this.posY, this.charWidth, this.charHeight);
			
			// Draw Skills
			var index = 0;
			for (index = 0; index < this.skill.length; ++index) {
				if(this.skill[index]) {
					this.skill[index].draw();
				}
			}
		}
	}
}