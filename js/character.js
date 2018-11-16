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

	update () {
		this.move();
	}

	draw () {
		CANVAS.gameDrawRectangle(this.color, this.posX, this.posY, this.charWidth, this.charHeight);
	}
}
