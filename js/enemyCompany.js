class Enemy {
	constructor (_company, _type, _posY) {
		this.company = _company;
		this.type = _type;
		this.healthBarColor = "#ff0000";
		this.healthBarBCANVASolor = "#ffffff";

		switch (_type) {
			case "big" :
				this.size = 50;
				this.color = "#cd1b62";
				this.speed = 1;
				this.health = 5;
				this.points = 500;
				this.penalty = -200;
				break;
			case "small" :
				this.size = 25;
				this.color = "#9e2100";
				this.speed = 3;
				this.health = 1;
				this.points = 100;
				this.penalty = -50;
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
			this.company.removeEnemy(this, this.points);
		}
	}

	kill () {
		this.company.removeEnemy(this, this.penalty);
	}

	update () {
		this.move();

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
	constructor (_gameMaster) {
		this.gameMaster = _gameMaster;

		this.enemies = [];
		this.lastEnemySpawnTime = _gameMaster.date.getTime();
		this.timerFlag = true;
		this.enemiesDelay = 1000;
	}

	clearField () {
		this.enemies = [];
	}

	removeEnemy (_enemy, _points) {
		var enemyIndex = this.enemies.indexOf(_enemy);

		this.enemies.splice(enemyIndex, 1);
		this.gameMaster.updateScore(_points);
	}

	summonEnemy () {
		const randomY = Math.floor(Math.random() * CANVAS.height);
		const randomSize = Math.random() > 0.7 ? "big" : "small";
		const newEnemy = new Enemy(this, randomSize, randomY);

		this.enemies.push(newEnemy);
		this.lastEnemySpawnTime = this.gameMaster.date.getTime();
	}

	update () {
		const currentTime = this.gameMaster.date.getTime();
		const timePastSinceLastEnemyWasSummoned = currentTime - this.lastEnemySpawnTime;

		this.enemies.forEach((_enemy) => {
			this.gameMaster.getBullets().forEach((_bullet) => {
				const isBulletOnEnemyXAxis = (_bullet.posX + _bullet.size) > _enemy.posX && _bullet.posX < (_enemy.posX + _enemy.size);
				const isBulletOnEnemyYAxis = (_bullet.posY + _bullet.size) > _enemy.posY && _bullet.posY < (_enemy.posY + _enemy.size);

				if (isBulletOnEnemyXAxis && isBulletOnEnemyYAxis) {
						_enemy.die();
						this.gameMaster.removeBullet(_bullet);
				}
			});
		})

		if (timePastSinceLastEnemyWasSummoned > this.enemiesDelay) {
			this.summonEnemy();
		}

		this.enemies.forEach(_enemy => _enemy.update());
	}

	draw () {
		this.enemies.forEach(_enemy => _enemy.draw());
	}
}
