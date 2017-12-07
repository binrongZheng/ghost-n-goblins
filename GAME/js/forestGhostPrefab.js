var platformer = platformer || {};

platformer.forestGhostPrefab=function(game,x,y,_level){
    this.level	= _level;
    Phaser.Sprite.call(this,game,x,y,'forestGhost');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
	this.randomX	= game.rnd.realInRange(-1.5,1.5);	//per fer que apareixi en una altura random
    this.hp 		= 80;
	//this.goal 	= this.x - game.rnd.realInRange(100,gameOptions.gameWidth);
	this.goal 		= this.x - 200;
	
	//Estats
	this.changingDir = false;	//quan estem canviant de direcció

	//Físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity 	= false;
	this.body.immovable 	= true;
    		
    //Animacions
    this.animations.add('fly', 		[0,1],		8,true);
    this.animations.add('turning',	[3,4],		8,false);
    this.animations.add('spawn',	[8,7,6,5],	6,false);
    this.animations.add('shooting',	[2],		8,false);
    this.animations.play('spawn');
    
	//Quan ha acabat l'animació de l'spawn, comença a moure's
	this.events.onAnimationComplete.add(this.startMoving,this); 
	
    //Quan mor, sumem punts i afegim una explosió
    this.events.onKilled.add(this.forestGhostPoints, this);
};

platformer.forestGhostPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.forestGhostPrefab.prototype.constructor=platformer.forestGhostPrefab;

platformer.forestGhostPrefab.prototype.update = function () {
	if((this.body.velocity.x < 0 && this.x < this.goal) || (this.body.velocity.x > 0 && this.x > this.goal)){
		//pillar un nou goal
		this.goal = this.x+200; //HARDCODED -- CANVIAR SEGONS EN QUINA DIRECCIO ANEM
    	this.animations.play('turning');
		//this.body.velocity.x *= -1;
		this.body.velocity.x = 0;
		this.events.onAnimationComplete.add(function(){
			this.changingDir = true;
			this.scale.x *= -1;
    		this.animations.play('turning');
    		this.animations.currentAnim.reverse();
			
		},this); 
	}
	
	//es destrueix quan s'allunya suficient de la pantalla (poden entrar i sortir)
    if(this.alive && this.x < (this.level.hero.x-gameOptions.gameWidth*1.4)){
		this.destroy();
	}
};

platformer.forestGhostPrefab.prototype.startMoving = function () {
	if(this.animations.currentAnim.name == "spawn"){
		this.body.velocity.x 	= -gameOptions.foresGhostSpeed;
		this.animations.play('fly');
	}
};


platformer.forestGhostPrefab.prototype.forestGhostPoints = function () {
	this.level.hud.updateScore(100);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,0, this.level));
};