var platformer = platformer || {};

platformer.forestGhostPrefab=function(game,x,y,_level){
    this.level	= _level;
    Phaser.Sprite.call(this,game,x,y,'forestGhost');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
	this.randomX	= game.rnd.realInRange(-1.5,1.5);	//per fer que apareixi en una altura random
    this.hp = 80;

	//Físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity 	= false;
	this.body.immovable 	= true;
    		
    //animacions
    this.animations.add('fly', [0,1],8,true);
    this.animations.add('turning', [3,4],8,false);
    this.animations.add('spawn', [8,7,6,5],6,false);
    this.animations.add('shooting', [2],8,false);
    this.animations.play('spawn');
    
	//quan ha acabat l'animació de l'spawn, comença a moure's
	this.events.onAnimationComplete.add(this.startMoving,this); 
	
    //Quan mor, sumem punts i afegim una explosió
    this.events.onKilled.add(this.forestGhostPoints, this);
};

platformer.forestGhostPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.forestGhostPrefab.prototype.constructor=platformer.forestGhostPrefab;

platformer.forestGhostPrefab.prototype.update = function () {
    //mentres està fent spawn
	//es mor quan s'allunya suficient de la pantalla (poden entrar i sortir)
    
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