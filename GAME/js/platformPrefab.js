var platformer = platformer || {};

platformer.platformPrefab=function(game,x,y,_level){
    Phaser.Sprite.call(this,game,x,y,'moving_platform');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
	this.level	= _level;
    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity	= false;
    this.body.immovable		= true;
};

platformer.platformPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.platformPrefab.prototype.constructor=platformer.platformPrefab;

platformer.platformPrefab.prototype.update = function () {
    
	
	
};