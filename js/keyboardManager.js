var KeyboardManager = function () {
	return {
		init: function () {
			this.pressedKeys = {};
			
			this.bindEvents();
		},
		
		updatePressedKeys: function (_event, _status) {
			var keyCode = _event.keyCode,
				key;
			
			switch (keyCode) {
				case 32 :
					key = 'SPACE';
					break;
				
				default :
					key = String.fromCharCode(keyCode);
					break;
			}

			this.pressedKeys[key] = _status;
		},
		
		isKeyDown: function (_key) {
			return this.pressedKeys[_key.toUpperCase()];
		},
		
		bindEvents: function () {
			var myself = this;
			
			document.addEventListener('keydown', function(_event) {
				myself.updatePressedKeys(_event, true);
			});

			document.addEventListener('keyup', function(_event) {
				myself.updatePressedKeys(_event, false);
			});

			window.addEventListener('blur', function() {
				myself.pressedKeys = {};
			});
		}
	}
}