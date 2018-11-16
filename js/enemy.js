class Enemy {
	constructor (_type, _posY) {
		this.type = _type;
		this.auxIndex = 0;
		this.healthBarColor = "#ff0000";
		this.healthBarBCANVASolor = "#ffffff";

		switch (_type) {
			case "big" :
				this.size = 50;
				this.color = "#cd1b62";
				this.speed = 1;
				this.health = 5;
				this.points = 500;
				this.penalty = 200;
				break;
			case "small" :
				this.size = 25;
				this.color = "#9e2100";
				this.speed = 3;
				this.health = 1;
				this.points = 100;
				this.penalty = 50;
				break;
		}

		this.posX = 800;
		this.posY = _posY < 10 ? 10 : _posY; // Add 10px spacing from the top if needed
		this.posY = _posY > (CANVAS.height - this.size - 10) ? CANVAS.height - this.size - 10 : this.posY; // Fix and add 10px spacing from the bottom if needed
		this.initialHealth = this.health;
		this.healthBarWidth = this.size;
		this.base = (this.posY + this.size) + 2;
	}

	move () {
		this.posX -= this.speed;
	}

	die () {
		this.health -= 1;
		this.healthBarWidth = (this.size / this.initialHealth) * this.health;

		if (this.health <= 0){
			GAMEMASTER.scoreUp(this.points);
			GAMEMASTER.vanishEnemy(this);
		}
	}

	kill () {
		GAMEMASTER.scoreDown(this.penalty);
		GAMEMASTER.vanishEnemy(this);
	}

	update () {
		this.move();

		this.auxIndex = 0;
		for (this.auxIndex = 0; this.auxIndex < GAMEMASTER.skills.length; this.auxIndex += 1) {
			if(GAMEMASTER.skills[this.auxIndex]) {
				var skill = GAMEMASTER.skills[this.auxIndex];

				if (((skill.posX + skill.size) > this.posX && skill.posX < (this.posX + this.size)) &&
					((skill.posY + skill.size) > this.posY && skill.posY < (this.posY + this.size))) {

					this.die();
					GAMEMASTER.vanishSkill(skill);
				}
			}
		}


		if (this.posX < (-this.size)){
			this.kill();
		}
	}

	draw () {
		CANVAS.gameDrawRectangle(this.color, this.posX, this.posY, this.size, this.size);
		CANVAS.gameDrawRectangle(this.healthBarBCANVASolor, this.posX, this.base, this.size, 2);
		CANVAS.gameDrawRectangle(this.healthBarColor, this.posX, this.base, this.healthBarWidth, 2);
	}
}
