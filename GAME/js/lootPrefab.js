var platformer = platformer || {};

platformer.lootPrefab = function(game,x,y,_level, _insideJar){
        
    this.level = _level;
    this.game = game;
    
       
    this.isWeapon = false;
    this.isArmor = false;
    
    
    //ESTA DINS DEL POT?
    this.insideJar = _insideJar;
    if (this.insideJar){
        Phaser.Sprite.call(this,this.game,x,y,'jar');
        game.add.existing(this);
    }
    else{
        this.chooseType(x,y);
    }
     
            
    //FISIQUES
    this.game.physics.arcade.enable(this);
	this.body.allowGravity = false;
    
     //AUDIO
    this.putArmourSound = this.level.add.audio('putArmour');
    this.lootPickUp = this.level.add.audio('lootPickUp');
    this.weaponPickUp = this.level.add.audio('weaponPickUp');
}
platformer.lootPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.lootPrefab.prototype.constructor=platformer.lootPrefab;
platformer.lootPrefab.prototype.update = function(){
    
    
    if (this.insideJar){
        this.game.physics.arcade.overlap (this, this.level.projectiles,function (boti, bala){                                           
            boti.chooseType(boti.x+boti.width/2,boti.y+boti.height/2);
            bala.kill();
            boti.insideJar = false;
        });
    }
    else{
        this.game.physics.arcade.overlap (this, this.level.hero,function (boti, pj){
        
            if (boti.isArmor && !boti.level.hero.with_cloth){
                boti.level.hero.with_cloth = true;
                boti.putArmourSound.play();
            }
            else if (boti.isWeapon){
                boti.level.hero.weaponType = boti.randomWeapon;
				boti.level.hud.changeWeapon(boti.level.hero.weaponType); //actualitzem el hud amb la nova arma
                boti.weaponPickUp.play();
            }
            else {
                boti.level.hud.updateScore(boti.numPoints);
                boti.level.hud.spawnPoints(boti.x-20, boti.y-20, boti.numPoints);
                boti.lootPickUp.play();
            }
            boti.kill();
                                     
        
        });
    }    
    
}

platformer.lootPrefab.prototype.chooseType = function (posX,posY) {
    //TIPUS DE BOTÍ
    this.loopType = Math.floor(Math.random()*50);   
    if (this.loopType == 0){ //molt poques possibilitats de tenir armadura
        Phaser.Sprite.call(this,this.game,posX,posY,'armorPickUp');
        this.game.add.existing(this);    
        this.anchor.setTo(.5);
        this.scale.setTo(2);
        this.numPoints = 400;

        this.isArmor = true;
    }
    else{        
        this.loopType = Math.floor(Math.random()*9);
        this.loopType = 6;
        if (this.loopType == 0 || this.loopType == 1 || this.loopType == 2 || this.loopType == 3 ||this.loopType == 4 ||this.loopType == 5){ // 70% possibilitats
            Phaser.Sprite.call(this,this.game,posX,posY,'coin');
            this.game.add.existing(this);    
            this.anchor.setTo(.5);
            this.scale.setTo(2);
            this.animations.add('idle', [0,1,2,3],10,true);
            this.animations.play('idle');
            this.numPoints = 200;
        }
        else if (this.loopType == 6) {
            this.randomWeapon = this.level.hero.weaponType;
            while (this.randomWeapon == this.level.hero.weaponType)
                this.randomWeapon = Math.floor(Math.random()*3);          
            switch(this.randomWeapon){
                case 0: Phaser.Sprite.call(this,this.game,posX,posY-10,'arma_lance');
                        this.game.add.existing(this);
                        break;
                case 1: Phaser.Sprite.call(this,this.game,posX,posY-10,'arma_daga');
                        this.game.add.existing(this);
                        break;
                case 2: Phaser.Sprite.call(this,this.game,posX,posY-10,'arma_torcha');
                        this.game.add.existing(this);
                        break;
            }
            this.isWeapon = true;
        }
        else if (this.loopType == 7 || this.loopType == 8){ // 20% possibilitats
            Phaser.Sprite.call(this,this.game,posX,posY,'moneyBag');
            this.game.add.existing(this);    
            this.anchor.setTo(.5);
            this.scale.setTo(2);
            this.numPoints = 500;
        }    
        else if (this.loopType == 9){ // 10% possibilitats
            Phaser.Sprite.call(this,this.game,posX,posY,'crown');
            this.game.add.existing(this);    
            this.anchor.setTo(.5);
            this.scale.setTo(2);
            this.animations.add('idle', [0,1,2,3],10,true);
            this.numPoints = 5000;
        }       
    }      
}