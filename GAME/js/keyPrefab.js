var platformer = platformer || {};

platformer.keyPrefab = function(game,x,y,_level){
    Phaser.Sprite.call(this,game,x,y,'key');
    game.add.existing(this);
    
    this.animations.add('brillo', [0,1], 10, true);
    this.animations.play('brillo');
    
    this.level = _level;
    
    //MOVIMENT
    this.game.add.tween(this).to( { y: 350}, 6000, "Linear" , true, 0);
    
    //FISIQUES
    game.physics.arcade.enable(this);
	this.body.allowGravity = false;
}
platformer.keyPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.keyPrefab.prototype.constructor=platformer.keyPrefab;
platformer.keyPrefab.prototype.update = function(){
    
    this.game.physics.arcade.overlap (this, this.level.hero,function (key, pj){
        //activar animacio de la porta, segurament l'haurem de crear nosaltres
        pj.hasKey = true;
        key.kill();                               
        
    });
}