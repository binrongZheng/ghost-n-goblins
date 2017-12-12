var platformer = platformer || {};

platformer.platformPrefab=function(game,x,y,_level,marginLeft,marginRight){	//margins-> posició limit on canvia de sentit
    Phaser.Sprite.call(this,game,x,y,'moving_platform');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
	this.level			= _level;
	this.marginLeft 	= marginLeft;
	this.marginRight 	= marginRight;
	
    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity			= false;
    this.body.immovable				= true;
	this.body.checkCollision.down 	= false;
	this.body.velocity.x 			= -gameOptions.platformSpeed;
	this.body.setSize(this.body.width*0.5,this.body.height,this.body.width*0.25);
};

platformer.platformPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.platformPrefab.prototype.constructor=platformer.platformPrefab;

platformer.platformPrefab.prototype.update = function () {
	this.game.physics.arcade.collide(this, this.level.hero);
	
	if(this.x <= this.marginLeft){
		this.body.velocity.x = gameOptions.platformSpeed;
	}
	if(this.x >= this.marginRight){
		this.body.velocity.x = -gameOptions.platformSpeed;
	}
	//this.game.debug.body(this);
};