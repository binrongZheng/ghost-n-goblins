var platformer = platformer || {};

//serà el propi enemic qui posi la velocitat adecuada a la bullet
platformer.enemyBulletPrefab=function(game,x,y,_enemyBullet_type,velX,velY, _level,vertical=false){	//vertical es un parametre opcional
    this.enemyBullet_type=_enemyBullet_type;

    switch(this.enemyBullet_type){
        case 0: Phaser.Sprite.call(this,game,x,y,'ull'); this.animations.add('ullAnim', [0,1,2,3],10,true);
            break;
        case 1: Phaser.Sprite.call(this,game,x,y,'bossBullet'); this.scale.setTo(2);
            break;
		case 2: Phaser.Sprite.call(this,game,x,y,'forestGhostProj');
			if(velX > 0)
				this.scale.x *= -1;
			if(vertical)
				this.angle = -90;
            break;
    }


    game.add.existing(this);
    this.anchor.setTo(.5);
    this.checkWorldBounds=true;
    this.outOfBoundsKill=true;

    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity = false;

	this.level = _level;

    //animació
    if(this.enemyBullet_type ==0){
        this.animations.play('ullAnim');
    }
    if(velX>0){ //girar el projectil si va cap a la dreta
       this.scale.x =-1;
    }
    //velocitat constant
    this.body.velocity.x = velX;
    this.body.velocity.y = velY;
};


platformer.enemyBulletPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.enemyBulletPrefab.prototype.constructor=platformer.enemyBulletPrefab;


platformer.enemyBulletPrefab.prototype.update = function () {
  this.game.physics.arcade.collide (this, this.level.hero,function (bullet, hero){
      hero.killPlayer(hero, bullet);
      bullet.kill();
  });


}
