var platformer = platformer || {};

platformer.plantaPrefab=function(game,x,y){
    Phaser.Sprite.call(this,game,x,y,'planta');
    game.add.existing(this);
	this.anchor.setTo(.5);
    
    this.shot	= false;
    this.aggro	= false;	//si ens pot atacar o no
	
    this.hp = 80;
    
    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity	= false;
    this.body.immovable		= true;
    
    this.animations.add('plantaAnim', [0,1,2,3],3,true);
    this.animations.play('plantaAnim');

	//Quan mor, sumem punts i afegim una explosió
    this.events.onKilled.add(platformer.plantaPrefab.plantaPoints, this);
};

platformer.plantaPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.plantaPrefab.prototype.constructor=platformer.plantaPrefab;

platformer.plantaPrefab.prototype.update = function () {
    //girem la planta si fa falta
    if(this.scale.x==1 && platformer.tutorial.hero.x>this.x){                                                       //planta mirant a la esquerra pero enemic a la dreta
       this.scale.x =-1;
    } else if(this.scale.x==-1 && platformer.tutorial.hero.x<this.x){                                               //planta mirant a la dreta pero enemic a la esquerra
       this.scale.x =1;
    }
    
    if(this.animations.currentFrame.index == 0){
        this.shot = false;
    }
    
    //depenent de la distancia podrà disparar o no
    if(Phaser.Math.difference(this.x,platformer.tutorial.hero.x) < gameOptions.gameWidth/2 && this.aggro == false){ //només mirem la distancia horitzontal
       this.aggro = true;
    }else if(Phaser.Math.difference(this.x,platformer.tutorial.hero.x) > gameOptions.gameWidth/2 && this.aggro == true){
       this.aggro = false;
    }
    
    //dispar (només quan shot és false, estem al frame 3 i el jugador està dintre del rang)
    if(this.animations.currentFrame.index == 3 && this.shot == false && this.aggro == true){
        this.shot = true;
        //mirar la velocitat que pilla
        var bulletDir = new Phaser.Point(platformer.tutorial.hero.x-this.x,platformer.tutorial.hero.y-this.y);
        bulletDir.normalize().multiply(gameOptions.eyeSpeed,gameOptions.eyeSpeed);
        var bala = new platformer.enemyBulletPrefab(this.game,this.x,this.y,0,bulletDir.x,bulletDir.y);
        
    }
};
platformer.plantaPrefab.prototype.die = function () {
    this.kill();
};
platformer.plantaPrefab.plantaPoints = function () {
    this.level.hud.updateScore(100);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,1));
};