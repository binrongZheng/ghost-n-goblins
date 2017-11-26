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
	this.body.velocity.x = -gameOptions.crowSpeed; //TO DO-´-----------------------
    
    this.animations.add('ghostFly', [0,1,2,3],5,true);
    this.animations.play('ghostFly');
    //si el corb mor, sumem punts i afegim una explosio
    //this.events.onKilled.add(platformer.crowPrefab.ghostPoints, this);
};

platformer.ghostPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.ghostPrefab.prototype.constructor=platformer.ghostPrefab;

platformer.ghostPrefab.prototype.update = function () {
    if(Phaser.Math.difference(this.x,platformer.tutorial.hero.x) < gameOptions.gameWidth/2 && this.aggro == false){ //només mirem la distancia horitzontal
        this.aggro = true;
        this.animations.play('crowAggro');
    }
    
    if(this.alive){
        //Si s'ha acabat l'animació, volarà
        this.y += Math.sin((this.x-this.startX)/gameOptions.crowXoffset)*gameOptions.crowYoffset;
        //Si surt de la pantalla, es mor
        if(this.x < (platformer.tutorial.hero.x-gameOptions.gameWidth/2)){
            this.destroy();
        }
    }
};