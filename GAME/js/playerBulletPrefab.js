var platformer = platformer || {};

platformer.playerBulletPrefab=function(game,x,y,_bullet_type, _level){
    this.bullet_type=_bullet_type;
    
    this.dmg;
    this.level = _level;
    
    switch(this.bullet_type){
        case 0: Phaser.Sprite.call(this,game,x,y,'arma_lance');dmg = 100;
            break;
        case 1: Phaser.Sprite.call(this,game,x,y,'arma_daga'); dmg = 80;
            break;
        case 2: Phaser.Sprite.call(this,game,x,y,'arma_torcha'); dmg = 80;
            break;
    }
    //DIRECCIO
    this.direction = this.level.hero.scale.x;
    this.scale.x = this.direction;
    this.anchor.setTo(.5);   
    
    //FISIQUES
    game.physics.arcade.enable(this);
	//this.body.collideWorldBounds = true;
    this.body.allowGravity = false;
    
    this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
    
    //SO
    this.hitGrave = this.level.add.audio('hitGrave');
};

platformer.playerBulletPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.playerBulletPrefab.prototype.constructor=platformer.playerBulletPrefab;
platformer.playerBulletPrefab.prototype.update = function () {
    //MOVIMENT
    this.body.velocity.x = gameOptions.lanceSpeed * this.direction;
    
    //Colisions
    this.game.physics.arcade.collide (this, this.level.enemies,function (bullet, enemy){
        bullet.kill();
		if(!(enemy instanceof platformer.ghostPrefab)){		//si es un ghost, cridem el metode especial per saber d'on venia la bala
			enemy.kill();
		}else{
			if(bullet.x>enemy.x){
				enemy.kill();
			}else{
				//posar una explosió?
			}
		}
    });
    if (Phaser.Math.difference(this.position.x,platformer.tutorial.hero.position.x) > gameOptions.gameWidth/2){
        this.kill();
    }
    this.game.physics.arcade.collide (this, this.level.graves,function (bullet, enemy){
        bullet.level.explosions.add(new platformer.explosionPrefab(bullet.level.game,bullet.x,bullet.y,0));
        bullet.hitGrave.play();
        bullet.kill();              
    });
}