var platformer = platformer || {};

platformer.ciclopPrefab=function(game,x,y,_level){
    Phaser.Sprite.call(this,game,x,y,'ciclop',0);
    game.add.existing(this);
	this.anchor.setTo(.5);
	this.scale.x= -1;
    
	this.level			= _level;
	this.walking 		= false;
	this.aggro 			= false; 	//si està aggro, ens atacarà
	this.hp = 500;
	
	//animacions
	this.animations.add('walk1', [2,0,1],8,true);
	this.animations.add('walk2', [3,4,5],8,true);
	this.animations.add('jump', [7,8],3,false);
	
	this.animations.play('walk1',3,true,true);
	
    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity			= true;
    this.body.immovable				= true;
	
	this.events.onKilled.add(platformer.ciclopPrefab.ciclopPoints, this);
};

platformer.ciclopPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.ciclopPrefab.prototype.constructor=platformer.ciclopPrefab;

platformer.ciclopPrefab.prototype.update = function () {
	this.game.physics.arcade.collide(this, this.level.platform_collision);
	this.game.physics.arcade.collide(this, this.level.hero);
	if(!this.aggro && this.x && Phaser.Math.difference(this.x,platformer.tutorial.hero.x) < gameOptions.gameWidth/2){
		this.aggro = true;
		//this.frame = 1;
	}
};

platformer.ciclopPrefab.ciclopPoints = function () {
    this.level.hud.updateScore(gameOptions.ciclopPoints);
	this.level.hud.spawnPoints(this.x-30, this.y, gameOptions.ciclopPoints);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,1, this.level));
};