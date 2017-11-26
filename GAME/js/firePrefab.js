var platformer = platformer || {};

platformer.firePrefab=function(game,x,y){
    
    Phaser.Sprite.call(this,game,x,y,'foc');
    this.game.add.existing(this);    
    this.anchor.setTo(.5);
    this.scale.setTo(1.5);
    
    //ANIMACIONS
    this.animations.add('idle', [0,1],10,true);
    this.animations.play('idle');
    
    
    this.game.time.events.add(1500, function() {
        this.scale.setTo(1);
        this.y += this.height/4;
        this.game.time.events.add(750, function() {
            this.kill();
        }.bind(this),this);        
    }.bind(this), this)
}
platformer.firePrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.firePrefab.prototype.constructor=platformer.firePrefab;
platformer.firePrefab.prototype.update = function () {
    
}