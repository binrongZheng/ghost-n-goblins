var platformer = platformer || {};

platformer.finalBossPrefab =function(level,x,y){
    
    Phaser.Sprite.call(this,game,x,y,'ciclop',0);
    game.add.existing(this);
	this.anchor.setTo(.5);
	this.scale.x= -1;
    
    this.level = level;
}
platformer.finalBossPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.finalBossPrefab.prototype.constructor=platformer.finalBossPrefab;
platformer.finalBossPrefab.prototype.update = function(){}