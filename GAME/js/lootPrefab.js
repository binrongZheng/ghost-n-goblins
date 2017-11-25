var platformer = platformer || {};

platformer.lootPrefab = function(game,x,y,_level){
    Phaser.Sprite.call(this,game,x,y,'key');
    game.add.existing(this);
    
    this.level = _level;
        
    //FISIQUES
    game.physics.arcade.enable(this);
	this.body.allowGravity = false;
}
platformer.lootPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.lootPrefab.prototype.constructor=platformer.lootPrefab;
platformer.lootPrefab.prototype.update = function(){
    
    this.game.physics.arcade.overlap (this, this.level.hero,function (boti, pj){
        //fer switch amb el que toqui
        boti.kill();                               
        
    });
}