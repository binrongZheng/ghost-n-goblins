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
        
        //el pj
        pj.hasKey = true;
        pj.celebrating = true;
        pj.with_cloth = true;
        pj.isKill = 2;
        pj.body.velocity.x = 0; //per si estavem corrent quan l'ha pillat
        pj.animations.stop();
        pj.frame = 40;
        
        //la porta
        var door = key.level.door;
        door.animations.play('open');
        door.animations.currentAnim.onComplete.add (function(){door.open = true;}.bind(door),door);
        
        //tornem el pj a normal
        key.game.time.events.add(2000, function () {
            pj.celebrating = false;
        }.bind(this), this);
        key.kill();                               
        
    });
}