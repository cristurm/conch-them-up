class Bullet {
	constructor (_newType, _newX, _newY) {
		this.type = _newType;
		this.initPos = _newX;
		this.posX = _newX;
		this.posY = _newY;
		this.size = 5;
		this.speed = 10;
	}

	update () {
		this.posX += this.speed;

		if (this.posX > CANVAS.width){
			GAMEMASTER.vanishSkill(this);
		}
	}

	draw () {
		CANVAS.gameDrawRectangle("#fff", this.posX, this.posY, this.size, this.size);
	}
}

class MachineGun {
	constructor (_gameMaster) {
		this.gameMaster = _gameMaster;

		this.currentTime = _gameMaster.date.getTime();
		this.lastShotTime = _gameMaster.date.getTime();
		this.bulletDelay = 150;

		this.bullets = [];
		this.canShoot = true;
	}

	emptyGun () {
		this.bullets = [];
	}

	shoot (_bulletType, _bulletX, _bulletY) {
		this.canShoot = false;
		this.lastShotTime = this.gameMaster.date.getTime();

		this.bullets.push(new Bullet(_bulletType, _bulletX, _bulletY));
	}

	vanishBullet (_bullet) {
		const index = this.bullets.indexOf(_bullet);
		this.bullets.splice(index, 1);
	}

	update (_character) {
		this.bullets.forEach((_bullet) => {
			_bullet.update();
		})

		// Shoot!
		if (this.canShoot) {
			const bulletPosY = _character.posY + _character.charHeight * 0.5;
			const	bulletPosX = _character.posX + _character.charWidth * 0.5;

			this.shoot("thunder", bulletPosX, bulletPosY);
		}

		// Bullet Delay
		this.currentTime = this.gameMaster.date.getTime();
		const timeDelta = this.currentTime - this.lastShotTime;

		if (timeDelta > this.bulletDelay) {
			this.canShoot = true;
		}
	}

	draw () {
		this.bullets.forEach((_bullet) => {
			_bullet.draw();
		})
	}
}
