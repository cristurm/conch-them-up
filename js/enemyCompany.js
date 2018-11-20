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
			GAMEMASTER.scoreManager.scoreUp(this.points);
			GAMEMASTER.enemyCompany.vanishEnemy(this);
		}
	}

	kill () {
		GAMEMASTER.scoreManager.scoreDown(this.penalty);
		GAMEMASTER.enemyCompany.vanishEnemy(this);
	}

	update () {
		this.move();

		this.auxIndex = 0;
		for (this.auxIndex = 0; this.auxIndex < GAMEMASTER.machinegun.bullets.length; this.auxIndex += 1) {
			if(GAMEMASTER.machinegun.bullets[this.auxIndex]) {
				var bullet = GAMEMASTER.machinegun.bullets[this.auxIndex];

				if (((bullet.posX + bullet.size) > this.posX && bullet.posX < (this.posX + this.size)) &&
					((bullet.posY + bullet.size) > this.posY && bullet.posY < (this.posY + this.size))) {

					this.die();
					GAMEMASTER.vanishSkill(bullet);
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

class EnemyCompany {
	constructor () {
		this.enemies = [];
	}

	vanishEnemy (_enemy) {
		var enemyIndex = this.enemies.indexOf(_enemy);
		this.enemies.splice(enemyIndex, 1);
	}

	summonEnemy () {
		const randomY = Math.floor(Math.random() * CANVAS.height);
		const randomSize = Math.random() > 0.7 ? "big" : "small";
		const newEnemy = new Enemy(randomSize, randomY);

		this.enemies.push(newEnemy);
	}

	clearField () {
		this.enemies = [];
	}

	update () {
		this.enemies.forEach(_enemy => _enemy.update());
	}

	draw () {
		this.enemies.forEach(_enemy => _enemy.draw());
	}
}
