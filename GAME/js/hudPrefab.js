var platformer = platformer || {};


platformer.hudPrefab=function(game,x,y){
	this.playerName = platformer.game.add.bitmapText(10, 0, 'gngFont', 'PLAYER 1', 18);
	this.topScore = platformer.game.add.bitmapText(200, 0, 'gngFont', 'TOP SCORE', 18);
	this.scoreText = platformer.game.add.bitmapText(10, 17, 'gngFont', '0', 18); 
	this.topScoreText = platformer.game.add.bitmapText(200, 17, 'gngFont', '1000', 18);
	this.timeText = platformer.game.add.bitmapText(10, 34, 'gngFont', 'TIME', 18);
	this.timerText = platformer.game.add.bitmapText(10, 51, 'gngFont', '2:00', 18);
	//ponemos el anchor a la derecha
	this.scoreText.anchor.x=1;
	this.topScoreText.anchor.x=1;
	//alineamos los textos
	this.scoreText.right = this.playerName.right;
	this.topScoreText.right = this.topScore.right;
	//los textos siempre estan fijos en la cámara
	this.playerName.fixedToCamera = true;
	this.topScore.fixedToCamera = true;
    this.scoreText.fixedToCamera = true;
	this.topScoreText.fixedToCamera = true;
	this.timeText.fixedToCamera = true;
	this.timerText.fixedToCamera = true;
	
    this.score = 0;
    this.vides = 0;
    this.time = 0;

	this.timer = game.time.create(false);
	this.timer.loop(1*1000+999,this.timerFinished,this); //milisegons
	this.timer.start();
	
	Phaser.Sprite.call(this,game,x,y,'hud');
    game.add.existing(this);
    this.anchor.setTo(.5);
};

platformer.hudPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.hudPrefab.prototype.constructor=platformer.hudPrefab;
platformer.hudPrefab.prototype.update=function(){
	//actualitzem el text del contador al hud
	this.timerText.setText(Math.floor(this.timer.duration/60000)+":"+Math.floor((this.timer.duration/1000)%60)); //min:seg
};

platformer.hudPrefab.prototype.updateScore = function(newScore){
	this.score += newScore;
	this.scoreText.text = this.score;
};
platformer.hudPrefab.prototype.timerFinished = function(){
	console.log("--TIME OVER--");
	this.timer.stop();
	//posar aquí que el jugador es mori
	
};
platformer.hudPrefab.prototype.resetTimer = function(){
	this.timer.stop();
	this.timer.loop(3*1000+999,this.timerFinished,this); //milisegons
	this.timer.start();
}