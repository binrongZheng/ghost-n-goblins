var platformer = platformer || {};

platformer.ghostSpawnPrefab=function(game,x,y,_level){
	Phaser.Sprite.call(this,game,x,y,'');
    game.add.existing(this);
	//Modo discípulo de radev: ¡¡¡¡¡ACTIVADO!!!!!
	
	
    this.level			= _level;
	this.game 			= game;
    this.spawning 		= false;	//si està espawnejant fantasmes (PJ dintre del rang)
	this.spawnedGhosts 	= 0;		//quants fantasmes ha spawnejat (màxim de 3 per tongada)
	this.spawnPosX		= this.x+gameOptions.gameWidth;
	this.spawnPosY		= 232;
	
    
	//FALTA PER AFEGIR AL GAMEOPTIONS
	this.timeForSpawn 	= 400;	//ms
	this.spawnWaitTime 	= 2000;	//ms
};

platformer.ghostSpawnPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.ghostSpawnPrefab.prototype.constructor=platformer.ghostSpawnPrefab;

platformer.ghostSpawnPrefab.prototype.update = function () {
    //if(Phaser.Math.difference(this.x,platformer.tutorial.hero.x) < gameOptions.gameWidth/2){}
    
	if(this.level.hero.x>this.x && !this.spawning){			//comença a espawnejar fantasmes
		console.log("ghost spawn");
		this.spawning = true;
		this.level.game.time.events.add(100,this.spawnAghost,this);
	}
	if(this.spawning && this.level.hero.x>this.spawnPosX){	//si el jugador s'avança lo suficient, destruïm l'spawn
		console.log("destroying");
		this.spawning = false;
		this.destroy();
	}
	
};
platformer.ghostSpawnPrefab.prototype.spawnAghost = function(){
	if(this.spawning){
		this.spawnedGhosts++;
		this.level.enemies.add(new platformer.ghostPrefab(this.game,this.spawnPosX,this.spawnPosY,this.level));		//espawnegem un fantasma
		console.log("spawning");
		
		if(this.spawnedGhosts < 3){
			this.level.game.time.events.add(this.timeForSpawn,this.spawnAghost,this);								//si encara no hem arribat a 3, espawnejarem un altre
		} else{
			//cridem evento següent tongada
			this.spawnedGhosts = 0;
			this.level.game.time.events.add(this.spawnWaitTime,this.spawnAghost,this);
		}
	}
}