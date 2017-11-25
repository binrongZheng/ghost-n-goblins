var platformer = platformer || {};

platformer.lootPrefab = function(game,x,y,_level, _hasPot){
    Phaser.Sprite.call(this,game,x,y,'key');
    game.add.existing(this);
    
    this.level = _level;
        
    //TIPUS DE BOTÍ
    this.loopType = Math.floor(Math.random()*9);
    console.log(this.loopType);
    if (this.loopType == 0 || this.loopType == 1 || this.loopType == 2 || this.loopType == 3 ||this.loopType == 4){ // 50% possibilitats
        Phaser.Sprite.call(this,game,x,y,'coin');
        game.add.existing(this);    
	    this.anchor.setTo(.5);
        this.animations.add('idle', [0,1,2,3],10,true);
        this.animations.play('idle');
        this.numPoints = 200;
    }
    else if (this.loopType == 5 || this.loopType == 6){ // 20% possibilitats
        Phaser.Sprite.call(this,game,x,y,'moneyBag');
        game.add.existing(this);    
	    this.anchor.setTo(.5);
        this.numPoints = 500;
    }
    else if (this.loopType == 7 || this.loopType == 8){ // 20% possibilitats
        Phaser.Sprite.call(this,game,x,y,'armorPickUp');
        game.add.existing(this);    
	    this.anchor.setTo(.5);
        this.numPoints = 400;
    }
   else if (this.loopType == 9){ // 10% possibilitats
        Phaser.Sprite.call(this,game,x,y,'crown');
        game.add.existing(this);    
	    this.anchor.setTo(.5);
        this.animations.add('idle', [0,1,2,3],10,true);
        this.numPoints = 5000;
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