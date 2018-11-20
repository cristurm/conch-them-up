class ScoreManager {
  constructor (_gameMaster) {
    this.gameMaster = _gameMaster;

    this.score = 0;
		this.goal = 1000;
		this.scoreBarBGWidth = CANVAS.width - 20;
		this.scoreBarWidth = this.score;
  }

  resetScore () {
    this.score = 0;
    this.goal = 1000;
  }

  updateScore (_points) {
    const newScore = this.score + _points;
		this.score = newScore > this.goal ? this.goal : newScore;

    if (this.score < 0) {
      this.gameMaster.endGame();
		}

		this.scoreBarWidth = (this.scoreBarBGWidth / this.goal) * this.score;

		this.updateScoreUI();
  }

  updateScoreUI () {
		const label = "SCORE: " + this.score;

		CANVAS.uiClearContext();
		CANVAS.uiWriteText("bold 16px monospace", "white", label, 10, 20, "left");
		CANVAS.uiDrawScoreBar("#00ff00", "#ff9900", 10, 580, this.scoreBarWidth, this.scoreBarBGWidth, 10);
	}
}
