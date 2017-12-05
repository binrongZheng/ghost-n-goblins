var platformer = platformer || {};

//serà el propi enemic qui posi la velocitat adecuada a la bullet
platformer.enemyBulletPrefab=function(game,x,y,_enemyBullet_type,velX,velY){
    this.enemyBullet_type=_enemyBullet_type;

    switch(this.enemyBullet_type){
        case 0: Phaser.Sprite.call(this,game,x,y,'ull');
            break;
        //case 1: Phaser.Sprite.call(this,game,x,y,'foc');
            //break;
    }
    //potser s'haurà d'afegir en un group............
    this.animations.add('ullAnim', [0,1,2,3],10,true);

    game.add.existing(this);
    this.anchor.setTo(.5);
    this.checkWorldBounds=true;
    this.outOfBoundsKill=true;

    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity = false;

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
  this.game.physics.arcade.collide (this, platformer.tutorial.hero,function (bullet, hero){
      hero.killPlayer(hero, bullet);
      bullet.kill();
  });


}
