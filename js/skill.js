class Skill {
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
