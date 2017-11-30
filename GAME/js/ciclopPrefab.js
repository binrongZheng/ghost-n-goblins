var platformer = platformer || {};

platformer.ciclopPrefab=function(game,x,y,_level){
    Phaser.Sprite.call(this,game,x,y,'ciclop',0);
    game.add.existing(this);
	this.anchor.setTo(.5);
	this.scale.x= -1;
    
	this.level			= _level;
	this.walking		= false;
	this.aggro			= false; 	//si està aggro, ens atacarà
	this.hp				= 900;
	this.jumping		= false;
	
	//animacions
	this.animations.add('walk1', [2,0,1],4,true);
	this.animations.add('walk2', [3,4,5],4,true);
	this.animations.add('jump', [7,8],3,false);
	
    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity			= true;
    this.body.immovable				= true;
	
	this.events.onKilled.add(platformer.ciclopPrefab.ciclopPoints, this);
};

platformer.ciclopPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.ciclopPrefab.prototype.constructor=platformer.ciclopPrefab;

platformer.ciclopPrefab.prototype.update = function () {
	this.game.physics.arcade.collide(this, this.level.platform_collision, this.changeFrameAfterJump,null,this);
	this.game.physics.arcade.collide(this, this.level.hero);
	if(!this.aggro && Phaser.Math.difference(this.x,platformer.tutorial.hero.x) < (gameOptions.gameWidth/2)-this.width/2){
		this.aggro = true;
		this.level.game.time.events.add(500,this.getAngry,this);
	}
	if(this.aggro){
		//girem el ciclop si fa falta
		if(this.scale.x == -1 && platformer.tutorial.hero.x > this.x){
		   this.scale.x =1;
		} else if(this.scale.x == 1 && platformer.tutorial.hero.x < this.x){
		   this.scale.x =-1;
		}
	}
};

//Canvia el frame per després del salt
platformer.ciclopPrefab.prototype.changeFrameAfterJump = function () {
	if(this.aggro && this.jumping){
		this.jumping = false;
		this.animations.stop();
		this.frame = 4;
		this.body.velocity.x = 0;
	}
};

//Només es crida quan et veu per primer cop
platformer.ciclopPrefab.prototype.getAngry = function () {
	this.frame = 9;
	this.level.game.time.events.add(900,function(){this.frame=0},this);		//treure el frame
	this.level.game.time.events.add(1600,this.pursue,this);					//perseguir el jugador
};

platformer.ciclopPrefab.prototype.pursue = function () {
	if(Phaser.Math.difference(this.x,platformer.tutorial.hero.x) > 150){		//caminar
		this.body.velocity.x = this.scale.x*gameOptions.ciclopWalkSpeed;		//scale-> la direcció cap on ha d'anar
		this.animations.play('walk1');
		//console.log("walk");
		this.level.game.time.events.add(500,this.pursue,this);
	} else { 																	//saltar
		this.body.velocity.x = this.scale.x*gameOptions.ciclopWalkSpeed/2;		
		this.body.velocity.y = -580;
		this.animations.play('jump');
		this.jumping = true;
		//console.log("jump");
		this.level.game.time.events.add(1500,this.pursue,this);
	}
};

platformer.ciclopPrefab.ciclopPoints = function () {
    this.level.hud.updateScore(gameOptions.ciclopPoints);
	this.level.hud.spawnPoints(this.x-30, this.y, gameOptions.ciclopPoints);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,1, this.level));
};