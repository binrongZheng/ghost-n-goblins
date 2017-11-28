var platformer = platformer || {};

platformer.crowPrefab=function(game,x,y,_level){
    this.startX	= x;
    this.level	= _level;
    Phaser.Sprite.call(this,game,x,y,'crow');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
    this.hp = 80;
    
    this.aggro	= false; 	//si el corb ens "ha vist"
    this.flying	= false; 	//si el corb està volant

	//físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity 	= false;
	this.body.immovable = true;
    
    this.animations.add('crowAggro', [0,1,2,3],3,true);
    this.animations.add('crowFly',	 [4,5,6,7],6,true);
    
    //si el corb mor, sumem punts i afegim una explosio
    this.events.onKilled.add(platformer.crowPrefab.crowPoints, this);
};

platformer.crowPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.crowPrefab.prototype.constructor=platformer.crowPrefab;

platformer.crowPrefab.prototype.update = function () {
    //Si apareix per pantalla, es torna aggro
    if(Phaser.Math.difference(this.x,platformer.tutorial.hero.x) < gameOptions.gameWidth/2 && this.aggro == false){ //només mirem la distancia horitzontal
        this.aggro = true;
        this.animations.play('crowAggro');
    }
    
    if(this.alive){
        //Si està aggro comença l'animació
        if(this.aggro == true && this.animations.currentFrame.index == 3){ //no arriba a mostrar el frame de la boca oberta...
            this.animations.play('crowFly');
            this.flying = true;
            this.body.velocity.x = -gameOptions.crowSpeed;
        }
        //Si s'ha acabat l'animació, volarà
        if(this.flying == true){
            this.y += Math.sin((this.x-this.startX)/gameOptions.crowXoffset)*gameOptions.crowYoffset;
        }
        //Si surt de la pantalla, es mor
        if(this.flying == true && this.x < (platformer.tutorial.hero.x-gameOptions.gameWidth/2)){
            this.destroy();
        }
    }
};

platformer.crowPrefab.crowPoints = function () {
    this.level.hud.updateScore(50);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,0, this.level));
};