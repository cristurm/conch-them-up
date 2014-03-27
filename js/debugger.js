var Debugger = function () {
	return {
		init: function () {
			this.debugArea = document.getElementById("debugger");
			this.clearButton = document.getElementById("clear");
			
			this.bindEvents();
		},
	
		log: function (_string) {
			if (this.debugArea.innerHTML.length < 5000) {
				var prevHTML = this.debugArea.innerHTML;
				this.debugArea.innerHTML = "<p>" + _string + "</p>" + prevHTML;
			} else {
				this.debugArea.innerHTML = "<p>" + _string + "</p>";
			}			
		},
		
		bindEvents: function () {
			var debug = this;
			
			this.clearButton.addEventListener('click', function() {
				debug.debugArea.innerHTML = "";
			});
		}
	}
}