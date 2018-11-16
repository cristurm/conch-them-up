class KeyboardManager {
	constructor (gameMaster) {
		this.pressedKeys = {};
	}

	updatePressedKeys (_keyCode, _status) {
		var key;

		switch (_keyCode) {
			case 32 :
				key = 'SPACE';
				break;

			case 27 :
				key = 'ESC'
				break;

			default :
				key = String.fromCharCode(_keyCode);
				break;
		}

		this.pressedKeys[key] = _status;
	}

	isKeyDown (_key) {
		return this.pressedKeys[_key.toUpperCase()];
	}
}
