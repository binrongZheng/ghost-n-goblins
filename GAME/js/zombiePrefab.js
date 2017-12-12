var platformer = platformer || {};

platformer.zombiePrefab=function(game,x,y,_level){
    Phaser.Sprite.call(this,game,x,y,'zombie');
    game.add.existing(this);    
	this.anchor.setTo(.5);
    this.scale.setTo(2);
    
    this.hp = 80;
    
    //LA DIRECCIO
    this.rng = game.rnd.integerInRange (0,9);
    if (this.rng == 0)
        this.direction = 1;
    else
        this.direction = -1;
    
    this.scale.x *= this.direction;    
    
    //ANIMACIONS
    this.animations.add('walk', [0,1,2],5,true);
    this.animations.add('spawn', [9,8,7,6,5,4],10,false);
    this.animations.add('deSpawn', [4,5,6,7,8,9],5,false);
    this.animations.play('spawn');    
	
	//SPAWN
    this.isSpawning = true;
	this.animations.currentAnim.onComplete.add (function(){this.isSpawning = false;this.animations.play('walk');},this);
	
    this.level = _level;
    
    //FISIQUES
    game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.setSize(this.width/4*this.direction, this.height/6, this.direction*this.width/8, this.height/3);
       
    //AUDIO
    this.bornSound = this.level.add.audio('zombieBorn');    
    this.bornSound.play();
    
    //quan mor
    this.events.onKilled.add(this.die, this);
    
    //triar si tindrà boti
    this.dropsLoot = game.rnd.integerInRange(0,9);
    
    this.bury = false;
        
};

platformer.zombiePrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.zombiePrefab.prototype.constructor=platformer.zombiePrefab;
platformer.zombiePrefab.prototype.update = function () {
    
    //colisions terra
    this.level.game.physics.arcade.collide(this, this.level.platform_collision); 
    
    //MOVIMENT
    if (!this.isSpawning){        
        this.body.velocity.x = gameOptions.zombieSpeed * this.direction;
    }    
    
   if (Phaser.Math.difference(this.position.x,this.level.hero.position.x) > 300 && !this.isSpawning){
       this.bury = true; 
       this.body.velocity.x = 0;
        this.animations.stop('walk');
        this.animations.play('deSpawn');
       this.animations.currentAnim.onComplete.add (function(){this.kill();},this);
    }
    
    /*if (this.frame == 5) {
        this.body.setSize(this.width/4*this.direction, this.height/4, this.direction*this.width/8, this.height/4);
    }*/
    if (this.frame == 4){
        this.body.setSize(this.width/4*this.direction, this.height/2, this.direction*this.width/8, 0);
    }
    
    
     //this.level.game.debug.body(this);   
};
platformer.zombiePrefab.prototype.die = function () {    
    if (!this.bury) {
        this.level.hud.updateScore(100);
	    this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,0, this.level));
    }
    else this.bury = false;
    if (this.dropsLoot == 0){
        new platformer.lootPrefab(this.game, this.x, this.y, this.level, true);
    }
    this.destroy();
};
