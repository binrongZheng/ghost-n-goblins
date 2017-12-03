var platformer = platformer || {};

platformer.finalBossPrefab =function(game,x,y){
    
    Phaser.Sprite.call(this,game,x,y,'finalBoss',0);
    game.add.existing(this);
	this.anchor.setTo(.5);
	this.scale.setTo(2);
    
    this.game = game;
    
    //animacions
    this.animations.add('walk', [0,1,2,1],4,true);
    this.animations.play('walk');
    
    //físiques
    game.physics.arcade.enable(this);
    this.body.allowGravity			= false;
    this.body.immovable				= true;
    
    this.body.velocity.x = -gameOptions.finalBossSpeed;
    
    this.game.time.events.loop(Phaser.Timer.SECOND*2,this.shoot,this);
    
}
platformer.finalBossPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.finalBossPrefab.prototype.constructor=platformer.finalBossPrefab;
platformer.finalBossPrefab.prototype.update = function(){}
platformer.finalBossPrefab.prototype.shoot = function (){
    var bala = new platformer.enemyBulletPrefab(this.game,this.x,this.y+20,1,-120,75);
    
}