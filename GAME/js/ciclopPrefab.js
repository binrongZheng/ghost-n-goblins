var platformer = platformer || {};

platformer.ciclopPrefab=function(game,x,y,_level){
    Phaser.Sprite.call(this,game,x,y,'ciclop');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
	this.level			= _level;
	this.walking = false;
	
	//animacions
	this.animations.add('walk1', [1,0,2],8,true);
	this.animations.add('walk2', [3,4,5],8,true);
	this.animations.add('jump', [7,8],3,false);
	
    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity			= true;
    this.body.immovable				= true;
};

platformer.ciclopPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.ciclopPrefab.prototype.constructor=platformer.ciclopPrefab;

platformer.ciclopPrefab.prototype.update = function () {
	this.game.physics.arcade.collide(this, this.level.hero);
	
};