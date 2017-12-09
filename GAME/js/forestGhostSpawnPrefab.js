var platformer = platformer || {};

/*
* Els fantasmes apareixen en series de 3. Un cop han aparegut els 3 fantasmes, s'espera 4 segons, i es repeteix el proces fins que el jugador avança el punt d'spawn.
* El temps que hi ha entre que apareix cada fantasma és aleatori entre dos valors.
*/
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
	//if(this.level.hero.x>this.x && !this.spawning && this.x > this.level.checkpoints[gameOptions.currentCheckpoint].x){			//comença a espawnejar fantasmes -------AQUEST ES EL BO
	if(this.level.hero.x>this.x && !this.spawning){			//comença a espawnejar fantasmes
        console.log("spawn will start");
		this.spawning = true;
		this.level.game.time.events.add(100,this.spawnForGhost,this);
	}
	if(this.spawning && (this.level.hero.x > (this.spawnPosX))){	//si el jugador s'avança lo suficient, destruïm l'spawn
        console.log("DESTROYING spawn FG");
		this.spawning = false;
		this.destroy();
	}
	
};
platformer.forestGhostSpawnPrefab.prototype.spawnForGhost = function(){
    console.log("spawning FG");
	if(this.spawning){
		//this.level.enemies.add(new platformer.ghostPrefab(this.game,this.spawnPosX,this.spawnPosY,this.level));		//espawnegem un fantasma
		if(this.aliveGhosts < 3){
    		console.log("actual spawn FG");
            //this.forestGhosts.add(new platformer.forestGhostPrefab(this.game,this.spawnPosX,this.level));		//espawnegem un fantasma
			this.level.enemies.add(new platformer.forestGhostPrefab(this.game,this.spawnPosX,this,this.level));
            //mirar com fer que tambe funcionnin amb les colisions (afegir al level.enemies d'alguna manera?)
			this.level.game.time.events.add(this.game.rnd.realInRange (gameOptions.minTimeGhostSpawn,gameOptions.maxTimeGhostSpawn),this.spawnForGhost,this);								//si encara no hem arribat a 3, espawnejarem un altre
			this.aliveGhosts++;
		} else{
			//cridem evento següent tongada
			this.level.game.time.events.add(gameOptions.ghostWaitTime,this.spawnForGhost,this);
		}
	}
};