var platformer = platformer || {};

/*
* Els fantasmes apareixen en series de 3. Un cop han aparegut els 3 fantasmes, s'espera 4 segons, i es repeteix el proces fins que el jugador avança el punt d'spawn.
* El temps que hi ha entre que apareix cada fantasma és aleatori entre dos valors.
*/
platformer.ghostSpawnPrefab=function(game,x,y,_level){
	//Modo discípulo de radev: ¡¡¡¡¡ACTIVADO!!!!!
	Phaser.Sprite.call(this,game,x,y,'');		//unexisting sprite because yeas
    game.add.existing(this);
	
    this.level			= _level;
	this.game 			= game;
    this.spawning 		= false;						//si està espawnejant fantasmes (PJ dintre del rang)
	this.spawnedGhosts 	= 0;							//quants fantasmes ha spawnejat (màxim de 3 per tongada)
	this.spawnPosX		= this.x+gameOptions.gameWidth+200;
	this.spawnPosY		= gameOptions.ghostSpawnPosY;
};

platformer.ghostSpawnPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.ghostSpawnPrefab.prototype.constructor=platformer.ghostSpawnPrefab;

platformer.ghostSpawnPrefab.prototype.update = function () {
	if(this.level.hero.x>this.x && !this.spawning && this.x > this.level.checkpoints[gameOptions.currentCheckpoint].x){			//comença a espawnejar fantasmes
		this.spawning = true;
		this.level.game.time.events.add(100,this.spawnAghost,this);
	}
	if(this.spawning && (this.level.hero.x > (this.spawnPosX-gameOptions.distanceToStop))){	//si el jugador s'avança lo suficient, destruïm l'spawn
		this.spawning = false;
		this.destroy();
	}
	
};
platformer.ghostSpawnPrefab.prototype.spawnAghost = function(){
	if(this.spawning){
		this.spawnedGhosts++;
		this.level.enemies.add(new platformer.ghostPrefab(this.game,this.spawnPosX,this.spawnPosY,this.level));		//espawnegem un fantasma
		
		if(this.spawnedGhosts < 3){
			this.level.game.time.events.add(this.game.rnd.realInRange (gameOptions.minTimeGhostSpawn,gameOptions.maxTimeGhostSpawn),this.spawnAghost,this);								//si encara no hem arribat a 3, espawnejarem un altre
		} else{
			//cridem evento següent tongada
			this.spawnedGhosts = 0;
			this.level.game.time.events.add(gameOptions.ghostWaitTime,this.spawnAghost,this);
		}
	}
}