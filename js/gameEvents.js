var GameEvents = function () {
	return {
		bindEvents: function () {
			document.addEventListener('keydown', function(_event) {
				_event.preventDefault();
				KB.updatePressedKeys(_event.keyCode, true);
			});

			document.addEventListener('keyup', function(_event) {
				_event.preventDefault();
				KB.updatePressedKeys(_event.keyCode, false);
			});

			window.addEventListener("blur", function () {
				// In case the player switches windows/tabs
				KB.pressedKeys = {};

				if (GL.gameState == "playing") {
					GL.gameState = "paused";
				}
			});
		}
	}
}

var GC = new GameCanvas();
var KB = new KeyboardManager();
var GL = new GameLoop();
var GE = new GameEvents();

GC.init();
KB.init();
GL.init();

GE.bindEvents();