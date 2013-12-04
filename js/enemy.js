var Enemy = function () {
	return {
		init: function (_color, _posX, _posY, _size, _speed) {
			this.posX = _posX;
			this.posY = _posY;
			this.size = _size;
			this.color = _color;
			this.speed = _speed;
		},
		
		move: function () {
			this.posX -= this.speed;
		},
		
		update: function () {
			this.move();
		},
		
		draw: function () {
			GC.drawRectangle(this.color, this.posX, this.posY, this.size, this.size);
		}
	}
}