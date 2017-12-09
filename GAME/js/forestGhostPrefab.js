var platformer = platformer || {};

platformer.forestGhostPrefab=function(game,x,_level){
    Phaser.Sprite.call(this,game,x,100,'forestGhost');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
    this.y              = game.rnd.realInRange(360,100);	                        //per fer que apareixi en una altura random
    this.level          = _level;
    this.hp             = 80;
    this.goal           = this.x + 200;
    this.shootPos       = 0;
    this.states         = {Spawning:1, chasing:2, changingDir1:3, changingDir2:4, shooting:5};
    this.currentState   = this.states.Spawning;
    this.dir            = -1;                                                        //-1 -> esquerra, 1-> dreta
    this.verticalDist   = 50;
    this.verticalSpeed  = this.verticalDist/0.5;                                    //0.5-> temps que triga a donar la volta
    this.willShoot      = game.rnd.integerInRange(1,10) > 4 ? true : false;        //Si dispararà o no
    this.hasShot        = false;
    this.shootVertical  = false;
    
	//Físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity 	= false;
	this.body.immovable 	= true;
    		
    //Animacions
    this.animations.add('fly',      [0,1],                  8,true);
    this.animations.add('turning1',	[3,4],                  8,false);
    this.animations.add('turning2',	[4,3],		            8,false);
    this.animations.add('spawn',	[8,7,6,5],	            6,false);
    this.animations.add('shooting',	[0,1,0,1,2,2,2],        8,false);
    this.animations.play('spawn');
    
	//Quan ha acabat l'animació de l'spawn, comença a moure's
	this.events.onAnimationComplete.add(this.startMoving,this); 
	
    //Quan mor, sumem punts i afegim una explosió
    this.events.onKilled.add(this.forestGhostPoints, this);
};

platformer.forestGhostPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.forestGhostPrefab.prototype.constructor=platformer.forestGhostPrefab;

platformer.forestGhostPrefab.prototype.update = function () {
	if(this.currentState == this.states.chasing){
       if((this.dir < 0 && this.x < this.goal) || (this.dir > 0 && this.x > this.goal)){
           this.currentState = this.states.changingDir1;
    	   this.animations.play('turning1');
           this.body.acceleration.x = -this.dir*350;
           if(this.y < 360){
               this.body.velocity.y = this.game.rnd.integerInRange(1,10)>4 ? this.verticalSpeed : -this.verticalSpeed;
           }
            this.dir *=-1;
       } else{
           this.shootIfPossible();
       }
    }
    if(this.currentState == this.states.shooting){
        if(!this.hasShot && this.animations.frame == 2){
            if(this.shootVertical){
                var bala = new platformer.enemyBulletPrefab(this.game,this.x,this.y,0,0,gameOptions.eyeSpeed, this.level);
                //var bala = new platformer.enemyBulletPrefab(this.game,this.x,this.y,0,0,30, this.level);
            }else{
                var bala = new platformer.enemyBulletPrefab(this.game,this.x,this.y,0,this.dir*gameOptions.eyeSpeed,0, this.level);
                //var bala = new platformer.enemyBulletPrefab(this.game,this.x,this.y,0, 30,0, this.level);
            }
            this.hasShot = true;
        }
        if(this.animations.currentAnim.isFinished){
            this.willShoot = false;
            this.currentState = this.states.chasing;
            this.animations.play('fly');
            this.body.velocity.x = gameOptions.foresGhostSpeed*this.dir;
        }
    }
    
    if(this.currentState == this.states.changingDir1){
       if(this.animations.currentAnim.isFinished){
           this.animations.play('turning2');
           this.scale.x *= -1;
           this.currentState = this.states.changingDir2;
       }
    }
    if(this.currentState == this.states.changingDir2){
       if(this.animations.currentAnim.isFinished){
        this.body.velocity.y = 0;
        this.body.acceleration.x = 0;
        this.animations.play('fly');
        this.setNewGoal(this);
        this.setNewShootPos(this);
        this.body.velocity.x = gameOptions.foresGhostSpeed*this.dir;
        this.currentState = this.states.chasing;
        this.hasShot = false;
        this.willShoot = this.game.rnd.integerInRange(1,10) > 2 ? true : false;
       }
    }
    
    if(this.y >= 360){
        this.body.velocity.y = 0;
    }
	
	//Es destrueix quan s'allunya suficient de la pantalla (poden entrar i sortir)
    if(this.alive && this.x < (this.level.hero.x-gameOptions.gameWidth*1.3)){
		this.destroy();
	}
};

//Mètode que es crida just després d'acabar el spawn
platformer.forestGhostPrefab.prototype.startMoving = function () {
	if(this.animations.currentAnim.name == "spawn"){
		this.body.velocity.x 	= -gameOptions.foresGhostSpeed;
		this.animations.play('fly');
        this.currentState = this.states.chasing;
        this.setNewGoal();
        this.setNewShootPos();
	}
};

platformer.forestGhostPrefab.prototype.forestGhostPoints = function () {
	this.level.hud.updateScore(100);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,0, this.level));
};

platformer.forestGhostPrefab.prototype.setNewGoal = function(){
    this.goal = this.x + this.dir*this.game.rnd.realInRange(gameOptions.gameWidth/4, gameOptions.gameWidth*1.2);
};

platformer.forestGhostPrefab.prototype.setNewShootPos = function(){
    //this.shootPos = this.level.hero.x + this.game.rnd.realInRange(-gameOptions.gameWidth/2, gameOptions.gameWidth/2);
    this.shootPos = this.game.rnd.realInRange(this.x, this.goal);
};

platformer.forestGhostPrefab.prototype.isFacingPlayer = function(){
    return ( (this.dir < 0 && this.x > this.level.hero.x) ||
        (this.dir > 0 && this.x < this.level.hero.x) );
};

platformer.forestGhostPrefab.prototype.shootIfPossible = function(){
    if(this.willShoot && !this.hasShot && this.isFacingPlayer() &&
       (this.dir < 0 && this.x < this.shootPos || this.dir > 0 && this.x > this.shootPos) )
    {
        this.body.velocity.x = 0;
        this.animations.play('shooting');
        this.currentState = this.states.shooting;
        if(this.y > 310){
            this.shootVertical = false;
        }else{
            this.shootVertical = this.game.rnd.integerInRange(1,10) > 5 ? true : false;
        }
    }
};