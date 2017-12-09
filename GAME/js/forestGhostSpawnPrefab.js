var platformer = platformer || {};

platformer.forestGhostSpawnPrefab=function(game,x,y,_level){
	Phaser.Sprite.call(this,game,x,y,'');		//sprite invisible
    game.add.existing(this);
	
    this.level			= _level;
	this.game 			= game;
    this.spawning 		= false;						//el PJ està dintre del rang
	this.spawnPosX		= this.x+gameOptions.gameWidth+200;    //punt de referencia per spawnejar forestGhost (hi haurà un marge)
	this.aliveGhosts	= 0;							//quants ghosts queden vius (màxim de 3)
};

platformer.forestGhostSpawnPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.forestGhostSpawnPrefab.prototype.constructor=platformer.forestGhostSpawnPrefab;

platformer.forestGhostSpawnPrefab.prototype.update = function () {
	if(this.level.hero.x>this.x && !this.spawning && this.x > this.level.checkpoints[gameOptions.currentCheckpoint].x){			//comença a espawnejar fantasmes -------AQUEST ES EL BO
	//if(this.level.hero.x>this.x && !this.spawning){			//comença a espawnejar fantasmes
		this.spawning = true;
		this.level.game.time.events.add(100,this.spawnForGhost,this);
	}
	if(this.spawning && (this.level.hero.x > (this.spawnPosX))){	//si el jugador s'avança lo suficient, destruïm l'spawn
		this.spawning = false;
		this.destroy();
	}
	
};
platformer.forestGhostSpawnPrefab.prototype.spawnForGhost = function(){
	if(this.spawning){
		if(this.aliveGhosts < 3){
			this.level.enemies.add(new platformer.forestGhostPrefab(this.game,this.spawnPosX+this.game.rnd.integerInRange(-50,50),this,this.level));			//espawnegem un forestghost
			this.level.game.time.events.add(gameOptions.forestGhostSpawnTime,this.spawnForGhost,this);								//si encara no hem arribat a 3, espawnejarem un altre
			this.aliveGhosts++;
		} else{
			//si ja hi havien 3 forestGhosts, hem d'esperar una mica més
			this.level.game.time.events.add(gameOptions.ghostWaitTime,this.spawnForGhost,this);
		}
	}
};