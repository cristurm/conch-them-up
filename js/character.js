class Character {
	constructor (gameMaster) {
		this.gameMaster = gameMaster;

		this.posX = 50;
		this.posY = CANVAS.height * 0.5;
		this.size = 20;
		this.color = "#fae715";
		this.speed = 5;
		this.charWidth = this.size;
		this.charHeight = this.size * 2;
		this.lastSkill;
		this.skillsBool = true;
		this.currentTime = gameMaster.date.getTime();
		this.pastTime = gameMaster.date.getTime();
		this.shootDifference = 0;
		this.skillDelay = 150;
	}

	move () {
		// up
		if (KEYBOARD.isKeyDown("w") && this.posY > 10) {
			this.posY -=  this.speed;
		}

		// down
		if (KEYBOARD.isKeyDown("s") && this.posY < CANVAS.height - this.charHeight - 10) {
			this.posY += this.speed;

		}

		// right
		if (KEYBOARD.isKeyDown("d") && this.posX < CANVAS.width - this.charWidth - 10) {
			this.posX += this.speed;
		}

		// left
		if (KEYBOARD.isKeyDown("a") && this.posX > 10) {
			this.posX -= this.speed;
		}
	}

	shoot (_skillType, _skillX, _skillY) {
		this.skillsBool = false;
		this.pastTime = this.gameMaster.date.getTime();

		var newSkill = new Skill();
		newSkill.init(_skillType, _skillX, _skillY);
		this.gameMaster.skills.push(newSkill);
		this.lastSkill = this.gameMaster.skills[this.gameMaster.skills.length - 1];
	}

	update () {
		this.move();

		// Shoot!
		if (KEYBOARD.isKeyDown("space") && this.skillsBool) {
			var skillPosY = this.posY + this.charHeight * 0.5,
				skillPosX = this.posX + this.charWidth * 0.5;

			this.shoot("thunder", skillPosX, skillPosY);
		}

		// Bullet Delay
		this.currentTime = this.gameMaster.date.getTime();
		this.shootDifference = this.currentTime - this.pastTime;

		if (this.shootDifference > this.skillDelay) {
			this.skillsBool = true;
		}
	}

	draw () {
		CANVAS.gameDrawRectangle(this.color, this.posX, this.posY, this.charWidth, this.charHeight);
	}
}
