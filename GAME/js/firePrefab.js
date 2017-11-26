var platformer = platformer || {};

platformer.firePrefab=function(game,x,y, _level){
    
    Phaser.Sprite.call(this,game,x,y,'foc');
    this.game.add.existing(this);    
    this.anchor.setTo(.5);
    this.scale.setTo(1.5);
    
    this.level = _level;
    
    //ANIMACIONS
    this.animations.add('idle', [0,1],10,true);
    this.animations.play('idle');
    
    //Temps de vida i canviant de tamany
    this.game.time.events.add(1000, function() {
        this.scale.setTo(1);
        this.y += this.height/4;
        this.game.time.events.add(500, function() {
            this.kill();
        }.bind(this),this);        
    }.bind(this), this);
    
    //FISIQUES
    game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
        
        
}
platformer.firePrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.firePrefab.prototype.constructor=platformer.firePrefab;
platformer.firePrefab.prototype.update = function () {
    this.game.physics.arcade.overlap (this, this.level.enemies,function (bullet, enemy){
        console.log(enemy.hp);
        if(!(enemy instanceof platformer.ghostPrefab)){		//els fantasmes ni agua
	       enemy.hp -= 1;
           if(enemy.hp <= 0)
            enemy.kill();
		   }
        });
}