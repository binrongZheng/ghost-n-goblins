var platformer = platformer || {};

platformer.forestGhostPrefab=function(game,x,y,_level){
    this.level	= _level;
    Phaser.Sprite.call(this,game,x,y,'forestGhost'); //posar el spritesheet que toqui
    game.add.existing(this);
	this.anchor.setTo(.5);
    
	this.randomX	= game.rnd.realInRange(-1.5,1.5);	//per fer que apareixi en una altura random

	//Físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity 	= false;
	//this.body.velocity.x 	= -gameOptions.foresGhostSpeed;
	this.body.immovable 	= true;
    		
    //animacions
    this.animations.add('fly', [0,1],8,true);
    this.animations.play('fly');
    
    //Quan mor, sumem punts i afegim una explosió
    this.events.onKilled.add(this.forestGhostPoints, this);
};

platformer.forestGhostPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.forestGhostPrefab.prototype.constructor=platformer.forestGhostPrefab;

platformer.forestGhostPrefab.prototype.update = function () {
    //es mor quan surt de la pantalla?
    
};

platformer.forestGhostPrefab.prototype.forestGhostPoints = function () {
	this.level.hud.updateScore(100);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,1, this.level));
};