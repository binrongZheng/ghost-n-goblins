var platformer = platformer || {};

platformer.lootPrefab = function(game,x,y,_level, _hasPot){
    Phaser.Sprite.call(this,game,x,y,'key');
    game.add.existing(this);
    
    this.level = _level;
        
    //TIPUS DE BOTÍ
    this.loopType = Math.floor(Math.random()*50);
    if (this.loopType == 0){ //molt poques possibilitats de tenir armadura
        Phaser.Sprite.call(this,game,x,y,'armorPickUp');
        game.add.existing(this);    
	    this.anchor.setTo(.5);
        this.scale.setTo(2);
        this.numPoints = 400;
        
        this.isArmor = true;
    }
    else{
        this.isArmor = false;
        this.loopType = Math.floor(Math.random()*9);
        if (this.loopType == 0 || this.loopType == 1 || this.loopType == 2 || this.loopType == 3 ||this.loopType == 4 ||this.loopType == 5){ // 70% possibilitats
            Phaser.Sprite.call(this,game,x,y,'coin');
            game.add.existing(this);    
            this.anchor.setTo(.5);
            this.scale.setTo(2);
            this.animations.add('idle', [0,1,2,3],10,true);
            this.animations.play('idle');
            this.numPoints = 200;
        }
        else if (this.loopType == 6) {
            //WEAPOOON            
            this.kill();
        }
        else if (this.loopType == 7 || this.loopType == 8){ // 20% possibilitats
            Phaser.Sprite.call(this,game,x,y,'moneyBag');
            game.add.existing(this);    
            this.anchor.setTo(.5);
            this.scale.setTo(2);
            this.numPoints = 500;
        }    
        else if (this.loopType == 9){ // 10% possibilitats
            Phaser.Sprite.call(this,game,x,y,'crown');
            game.add.existing(this);    
            this.anchor.setTo(.5);
            this.scale.setTo(2);
            this.animations.add('idle', [0,1,2,3],10,true);
            this.numPoints = 5000;
        }       
    }   
    
        
    //FISIQUES
    game.physics.arcade.enable(this);
	this.body.allowGravity = false;
    
     //AUDIO
    this.putArmourSound = this.level.add.audio('putArmour');
    this.lootPickUp = this.level.add.audio('lootPickUp');
    this.weaponPickUp = this.level.add.audio('weaponPickUp');
}
platformer.lootPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.lootPrefab.prototype.constructor=platformer.lootPrefab;
platformer.lootPrefab.prototype.update = function(){
    
    this.game.physics.arcade.overlap (this, this.level.hero,function (boti, pj){
        
        if (boti.isArmor && !boti.level.hero.with_cloth){
            boti.level.hero.with_cloth = true;
            boti.putArmourSound.play();
        }
        else {
            boti.level.hud.updateScore(boti.numPoints);
            boti.level.hud.spawnPoints(boti.x-20, boti.y-20, boti.numPoints);
            boti.lootPickUp.play();
        }
        boti.kill();
                                     
        
    });
}