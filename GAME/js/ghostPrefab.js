var platformer = platformer || {};

platformer.ghostPrefab=function(game,x,y,_level){
    this.startX	= x;
    this.level	= _level;
    Phaser.Sprite.call(this,game,x,y,'ghost');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
	//físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity 	= false;
	this.body.velocity.x = -gameOptions.ghostSpeed;
	this.body.immovable = true;
    
    this.animations.add('ghostFly', [0,1,2,3],5,true);
    this.animations.play('ghostFly');
    //Quan mor, sumem punts i afegim una explosió
    this.events.onKilled.add(this.ghostPoints, this);
};

platformer.ghostPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.ghostPrefab.prototype.constructor=platformer.ghostPrefab;

platformer.ghostPrefab.prototype.update = function () {
    if(Phaser.Math.difference(this.x,platformer.tutorial.hero.x) < gameOptions.gameWidth/2){
    }
    
    if(this.alive){
        this.y += Math.sin((this.x-this.startX)/gameOptions.crowXoffset)*gameOptions.crowYoffset;
        //Si surt de la pantalla, es mor
        if(this.x < (platformer.tutorial.hero.x-gameOptions.gameWidth/2)){
            this.destroy();
        }
    }
};
platformer.ghostPrefab.prototype.ghostPoints = function () {
    this.level.hud.updateScore(100);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,1));
};
platformer.ghostPrefab.prototype.killGhostFrom = function (xBulletPosition) {
	//no l'he pogut utilitzar des del playerBullet :(
    if(xBulletPosition > this.x){
	   this.kill();
	}
};