var Skill = function () {
	return {
		init: function (_newType, _newX, _newY) {
			//attributes
			this.type = _newType;
			this.initPos = _newX;
			this.posX = _newX;
			this.posY = _newY;
			this.size = 5;
			this.speed = 10;
		},

		update: function () {
			this.posX += this.speed;

			if (this.posX > CANVAS.width){
				GAMEMASTER.vanishSkill(this);
			}
		},

		draw: function () {
			CANVAS.gameDrawRectangle("#fff", this.posX, this.posY, this.size, this.size);
		}
	}
}
