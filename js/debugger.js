var Debugger = function () {
	return {
		init: function () {
			this.debugArea = document.getElementById("debugger");
		},
	
		log: function (_string) {
			if (this.debugArea.innerHTML.length < 5000) {
				var prevHTML = this.debugArea.innerHTML;
				this.debugArea.innerHTML = "<p>" + _string + "</p>" + prevHTML;
			} else {
				this.debugArea.innerHTML = "<p>" + _string + "</p>";
			}			
		}
	}
}