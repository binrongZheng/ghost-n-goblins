var platformer = platformer || {};

platformer.lootPrefab = function(game,x,y,_level, _lootType){
    Phaser.Sprite.call(this,game,x,y,'key');
    game.add.existing(this);
    
    this.level = _level;
    
    this.loopType = _lootType;
    //TIPUS DE BOTÍ
    switch(this.bullet_type){
        case 0: Phaser.Sprite.call(this,game,x,y,'arma_lance');dmg = 100;
            break;
        case 1: Phaser.Sprite.call(this,game,x,y,'arma_daga'); dmg = 80;
            break;
        case 2: Phaser.Sprite.call(this,game,x,y,'arma_torcha'); dmg = 80;
            break;
    }    
        
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