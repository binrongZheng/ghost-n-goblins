var platformer = platformer || {};

platformer.zombiePrefab=function(game,x,y,_level){
    Phaser.Sprite.call(this,game,x,y,'zombie');
    game.add.existing(this);    
	this.anchor.setTo(.5);
    this.scale.setTo(2);
    
    
    //LA DIRECCIO
    this.rng = game.rnd.integerInRange (0,5);
    if (this.rng == 5)
        this.direction = 1;
    else
        this.direction = -1;
    
    this.scale.x *= this.direction;    
    
    //ANIMACIONS
    this.animations.add('walk', [0,1,2],5,true);
    this.animations.add('spawn', [9,8,7,6,5,4],5,false);
    this.animations.add('deSpawn', [4,5,6,7,8,9],5,false);
    this.animations.play('spawn');    
	
	//SPAWN
    this.isSpawning = true;
	this.animations.currentAnim.onComplete.add (function(){this.isSpawning = false;this.animations.play('walk');},this);
	
    this.level = _level;
    
    //FISIQUES
    game.physics.arcade.enable(this);
    
    //AUDIO
    this.bornSound = this.level.add.audio('zombieBorn');
    this.deathSound = this.level.add.audio('enemyDeath');
    this.bornSound.play();
    
    //quan mor
    this.events.onKilled.add(this.die, this);
};

platformer.zombiePrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.zombiePrefab.prototype.constructor=platformer.zombiePrefab;
platformer.zombiePrefab.prototype.update = function () {
    
    //colisions terra
    this.game.physics.arcade.collide(this, platformer.tutorial.platform_collision); 
    
    //MOVIMENT
    if (!this.isSpawning){        
        this.body.velocity.x = gameOptions.zombieSpeed * this.direction;
    }    
    
   if (Phaser.Math.difference(this.position.x,platformer.tutorial.hero.position.x) > 300 && !this.isSpawning){
        this.body.velocity.x = 0;
        this.animations.stop('walk');
        this.animations.play('deSpawn');
       this.animations.currentAnim.onComplete.add (function(){this.kill();},this);
    }
    
        
};
platformer.zombiePrefab.prototype.die = function () {
    this.deathSound.play();
    this.level.hud.updateScore(100);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,0));
    
};
