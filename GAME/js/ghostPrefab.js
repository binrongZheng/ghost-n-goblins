var platformer = platformer || {};

platformer.ghostPrefab=function(game,x,y,_level){
    this.startX	= x+game.rnd.integerInRange(-7,7);
    this.level	= _level;
    Phaser.Sprite.call(this,game,x,y,'ghost');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
	this.yScale		= game.rnd.realInRange(3.5,6);		//com més yScale, més recorregut vertical farà
	this.xScale		= game.rnd.realInRange(40,67);		//com més xScale, més "lent" anirà verticalment (la vel. hor. sempre és igual per a tots)
	this.randomX	= game.rnd.realInRange(-1.5,1.5);	//per fer que apareixi en una altura random

	//Físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity 	= false;
	this.body.velocity.x 	= -gameOptions.ghostSpeed;
	this.body.immovable 	= true;
    		
    this.animations.add('ghostFly', [0,1,2,3],5,true);
    this.animations.play('ghostFly');
    //Quan mor, sumem punts i afegim una explosió
    this.events.onKilled.add(this.ghostPoints, this);
};

platformer.ghostPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.ghostPrefab.prototype.constructor=platformer.ghostPrefab;

platformer.ghostPrefab.prototype.update = function () {
    if(this.alive){
        this.y += Math.sin(((this.x-this.startX)/this.xScale) + this.randomX)*this.yScale;
        //Si surt de la pantalla, es mor
        if(this.x < (this.level.hero.x-gameOptions.gameWidth/2)){
            this.destroy();
        }
    }
};
platformer.ghostPrefab.prototype.ghostPoints = function () {
	this.level.hud.updateScore(100);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,1, this.level));
    this.destroy();
};
platformer.ghostPrefab.prototype.killGhostFrom = function (xBulletPosition) {
	//no l'he pogut utilitzar des del playerBullet :(
    if(xBulletPosition > this.x){
	   this.kill();
	}
};