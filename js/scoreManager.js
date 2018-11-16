class ScoreManager {
  constructor (_gameMaster) {
    this.gameMaster = _gameMaster;

    this.score = 0;
		this.scoreGoal = 1000;
		this.scoreBarBGWidth = CANVAS.width - 20;
		this.scoreBarWidth = this.score;
  }

  resetScore () {
    this.score = 0;
    this.scoreGoal = 1000;
  }

  scoreUp (_plusScore) {
		this.score += _plusScore;
		this.score = this.score > this.scoreGoal ? this.scoreGoal : this.score;

		this.scoreBarWidth = (this.scoreBarBGWidth / this.scoreGoal) * this.score;

		this.updateScoreUI();
	}

  scoreDown (_minusScore) {
		this.score -= _minusScore;

		if (this.score < 0) {
      this.gameMaster.endGame();
		}

		this.scoreBarWidth = (this.scoreBarBGWidth / this.scoreGoal) * this.score;

		this.updateScoreUI();
	}

  updateScoreUI () {
		const label = "SCORE: " + this.score;

		CANVAS.uiClearContext();
		CANVAS.uiWriteText("bold 16px monospace", "white", label, 10, 20, "left");
		CANVAS.uiDrawScoreBar("#00ff00", "#ff9900", 10, 580, this.scoreBarWidth, this.scoreBarBGWidth, 10);
	}
}
