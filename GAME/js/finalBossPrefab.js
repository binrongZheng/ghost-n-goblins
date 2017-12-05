var platformer = platformer || {};

platformer.finalBossPrefab =function(game,x,y, _level){

    Phaser.Sprite.call(this,game,x,y,'finalBoss',0);
    game.add.existing(this);
	this.anchor.setTo(.5);
	this.scale.x = 2.3;
    this.scale.y = 2;

    this.game = game;
    this.level = _level;
    
    //animacions
    this.animations.add('walk', [0,1,2,1],4,true);
    this.animations.play('walk');

    this.hp = 2000;

    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity			= false;
    this.body.immovable				= true;
    this.body.setSize(this.width/4, this.height/2, this.width/8,0);

   //mort
    this.events.onKilled.add(platformer.finalBossPrefab.death, this);


}
platformer.finalBossPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.finalBossPrefab.prototype.constructor=platformer.finalBossPrefab;
platformer.finalBossPrefab.prototype.update = function(){

    //COLISIONS
    this.game.physics.arcade.overlap (this, this.level.hero,function (boss, heroe){
        if (heroe.isKill > 0)
            heroe.killPlayer(boss,heroe);
    });
    this.game.physics.arcade.overlap (this, this.level.projectiles,function (boss, bala){
        if (boss.hp > 0)
            boss.hp -= bala.dmg;
        bala.kill();
    });

    if (this.hp <= 0)
        this.kill();


}
platformer.finalBossPrefab.prototype.shoot = function (){
    var bala = new platformer.enemyBulletPrefab(this.game,this.x,this.y+20,1,-120,75, this.level);

}
platformer.finalBossPrefab.death = function () {
    this.level.hud.updateScore(gameOptions.bossPoints);
	this.level.hud.spawnPoints(this.x-30, this.y, gameOptions.bossPoints);
	this.level.explosions.add(new platformer.explosionPrefab(this.level.game,this.x,this.y,1, this.level));
    this.level.win = true;
    this.game.time.events.remove(this.shootEvent);
    this.destroy();
};
platformer.finalBossPrefab.prototype.activate = function () {

    this.body.velocity.x = -gameOptions.finalBossSpeed;
    this.shootEvent = this.game.time.events.loop(Phaser.Timer.SECOND*1,this.shoot,this);

}
