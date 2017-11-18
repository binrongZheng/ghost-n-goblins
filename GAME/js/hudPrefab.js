var platformer = platformer || {};


platformer.hudPrefab=function(game,x,y){
	this.playerName = platformer.game.add.bitmapText(10, 0, 'gngFont', 'PLAYER 1', 18);
	this.topScore = platformer.game.add.bitmapText(200, 0, 'gngFont', 'TOP SCORE', 18);
	this.scoreText = platformer.game.add.bitmapText(10, 17, 'gngFont', '0', 18); 
	this.topScoreText = platformer.game.add.bitmapText(200, 17, 'gngFont', '1000', 18); 
	//ponemos el anchor a la derecha
	this.scoreText.anchor.x=1;
	this.topScoreText.anchor.x=1;
	//alineamos los textos
	this.scoreText.right = this.playerName.right;
	this.topScoreText.right = this.topScore.right;
	
	this.playerName.fixedToCamera = true;
	this.topScore.fixedToCamera = true;
    this.scoreText.fixedToCamera = true;
	this.topScoreText.fixedToCamera = true;
	
    this.score = 0;
    this.vides = 0;
    this.time = 0;

	Phaser.Sprite.call(this,game,x,y,'hud');
	
    game.add.existing(this);
    this.anchor.setTo(.5);
};


platformer.hudPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.hudPrefab.prototype.constructor=platformer.hudPrefab;

platformer.hudPrefab.prototype.updateScore = function(newScore){
	this.score += newScore;
	this.scoreText.text = this.score;
}