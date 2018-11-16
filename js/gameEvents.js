const BindGameEvents = () => {
	document.addEventListener('keydown', (_event) => {
		_event.preventDefault();
		KEYBOARD.updatePressedKeys(_event.keyCode, true);
	});

	document.addEventListener('keyup', (_event) => {
		_event.preventDefault();
		KEYBOARD.updatePressedKeys(_event.keyCode, false);
	});

	window.addEventListener("blur", () => {
		// In case the player switches windows/tabs
		KEYBOARD.pressedKeys = {};

		if (GAMEMASTER.gameState === "playing") {
			GAMEMASTER.gameState = "paused";
		}
	});
}
