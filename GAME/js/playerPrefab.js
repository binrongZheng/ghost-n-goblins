var platformer = platformer || {};

platformer.playerPrefab = function (game,x,y, _level,_player_life,_cursors,_jump_key,_space,_with_cloth) {
    //INPUT VALUE
    this.player_life=_player_life;
	  this.level = _level;
    this.cursors = _cursors;
    this.jump_key = _jump_key;
    this.space = _space;
    this.with_cloth = _with_cloth;
    this.isKill=2;
    this.playerPos=[x,y];
    //SPRITE
	  Phaser.Sprite.call(this,game,x,y,'hero');
	  game.add.existing (this);
	  this.anchor.setTo(.5);
	//ARMADURA - GONE
    this.animations.add("removeArmadura", [33,39], 10, true);
    //PLAYER - WITH CLOTH
    this.animations.add('walk', [0,1,2,3],10,true);
    this.animations.add('stand', [4],10,false);
    this.animations.add('jump_up', [7],10,false);
    this.animations.add('jump_throw', [5],10,false);
    this.animations.add('ajupir', [6],10,false);
    this.animations.add('hurt', [7],10,false);
    this.animations.add('attack', [8,9,10,11,4],15,false);
    this.animations.add("climb", [12,15], 10, true);
    this.animations.add("climbstopleft", [12], 10, false);
    this.animations.add("climbstopright", [15], 10, false);
    this.animations.add("climbontop0", [14], 10, false);
    this.animations.add("climbontop1", [13], 10, false);

    //PLAYER - WITHOUT CLOTH
    this.animations.add('walk_N', [16,17,18,19],10,true);
    this.animations.add('stand_N', [20],10,false);
    this.animations.add('jump_up_N', [23],10,false);
    this.animations.add('jump_throw_N', [21],10,false);
    this.animations.add('ajupir_N', [22],10,false);
    this.animations.add('hurt_N', [7],10,false);
    this.animations.add('attack_N', [24,25,26,27,28],10,false);
    this.animations.add("climb_N", [28,31], 10, true);
    this.animations.add("climbstopleft_N", [28], 10, false);
    this.animations.add("climbstopright_N", [31], 10, false);
    this.animations.add("climbontop0_N", [30], 10, false);
    this.animations.add("climbontop1_N", [29], 10, false);
    //PLAYER - DIE
    this.animations.add("die", [33,34,33,34,33,34,33,34,35,36,37,37,37,37,37,38], 10, false);

    //AUDIO
    this.playerShoot = this.level.add.audio('player_Shoot');

	//physics
	  game.physics.arcade.enable(this);
  	this.body.collideWorldBounds = true;

    //Timer del dispar
    this.canShoot = true;
    this.timeCheck;
    this.shootWait = 250;
    //toca grave
    this.touchGrave=false;
    this.body.checkCollision.up = false;

    this.invincible = false;
    this.invincibleKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
};

platformer.playerPrefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.playerPrefab.prototype.constructor = platformer.playerPrefab;

platformer.playerPrefab.prototype.update = function () {

    this.touchGrave=false;
	  this.game.physics.arcade.collide(this, this.level.platform_collision);
    this.game.physics.arcade.collide(this,this.level.graves, this.touch, null, this);
    this.game.physics.arcade.collide (this, this.level.water, this.PlayerDie, null, this);

    //colisions
	this.game.physics.arcade.collide (this, this.level.enemies, this.killPlayer, null, this);
	this.game.physics.arcade.collide (this, this.level.enemyProjectiles, this.killPlayer, null, this);


	this.body.velocity.x = 0;

	//INVENCIBILITAT
	if(this.invincibleKey.isDown){
        this.invincible = !this.invicible;
    }

    //WITH CLOTH ANIMATION
        if(this.with_cloth==true){

            //ATTACK
            if (this.space.isDown){
                this.animations.play('attack');
                if (this.canShoot)
                    this.shoot();
            }
            //AJUPIR
            else if (this.cursors.down.isDown && this.body.blocked.down||this.cursors.down.isDown && this.touchGrave==true ){
                this.animations.play('ajupir');
                //this.body.setSize(0,);
            }
            //MOVEMENT LEFT/RIGHT with or without JUMP
            else if (this.cursors.left.isDown){
                if(this.body.blocked.down||this.touchGrave==true){
                    this.body.velocity.x = -gameOptions.playerSpeed;
                    this.animations.play('walk');
                    this.scale.x = -1;
                }
                if(this.jump_key.isDown&&!this.body.blocked.down&&this.touchGrave==false){
                    this.animations.play('jump_throw');
                    this.scale.x = -1;
                    this.body.velocity.x = -gameOptions.playerSpeed;
                }
            }
            else if (this.cursors.right.isDown ){
                if(this.body.blocked.down||this.touchGrave==true){
                    this.body.velocity.x =+gameOptions.playerSpeed;
                    this.animations.play('walk');
                    this.scale.x=1;
                }
                if(this.jump_key.isDown&&!this.body.blocked.down&&this.touchGrave==false){
                    this.animations.play('jump_throw');
                    this.scale.x = 1;
                    this.body.velocity.x =+gameOptions.playerSpeed;
                }
            }
            else if(!this.body.blocked.down&&this.touchGrave==false){
                this.animations.play('jump_up');
            }
                 //STAND
            else if(this.body.blocked.down||this.touchGrave==true){
                this.animations.play('stand');
            }

            //JUMP
            if (this.jump_key.isDown && this.body.blocked.down && this.jump_key.downDuration(250)||this.jump_key.isDown && this.touchGrave==true && this.jump_key.downDuration(250)){
                this.body.velocity.y = -gameOptions.playerJumpForce;
            }

        }

     else if(this.isKill!=0){
            //ATTACK
            if (this.space.isDown && this.canShoot){
                this.animations.play('attack_N');
                if (this.canShoot)
                    this.shoot();
            }
            //AJUPIR
            else if (this.cursors.down.isDown && this.body.blocked.down||this.cursors.down.isDown && this.touchGrave==true ){
                this.animations.play('ajupir_N');
            }
            //JUMP
            if (this.jump_key.isDown && this.body.blocked.down && this.jump_key.downDuration(250)||this.jump_key.isDown && this.touchGrave==true && this.jump_key.downDuration(250)){
                this.body.velocity.y = -gameOptions.playerJumpForce;
            }
            //MOVEMENT LEFT/RIGHT with or without JUMP
            else if (this.cursors.left.isDown){
                if(this.body.blocked.down||this.touchGrave==true){
                    this.body.velocity.x = -gameOptions.playerSpeed;
                    this.animations.play('walk_N');
                    this.scale.x = -1;
                }
                if(this.jump_key.isDown&&!this.body.blocked.down&&this.touchGrave==false){
                    this.animations.play('jump_throw_N');
                    this.scale.x = -1;
                    this.body.velocity.x = -gameOptions.playerSpeed;
                }
            }
            else if (this.cursors.right.isDown ){
                if(this.body.blocked.down||this.touchGrave==true){
                    this.body.velocity.x =+gameOptions.playerSpeed;
                    this.animations.play('walk_N');
                    this.scale.x=1;
                }
                if(this.jump_key.isDown&&!this.body.blocked.down&&this.touchGrave==false){
                    this.animations.play('jump_throw_N');
                    this.scale.x = 1;
                    this.body.velocity.x =+gameOptions.playerSpeed;
                }
            }
            else if(!this.body.blocked.down&&this.touchGrave==false){
                this.animations.play('jump_up_N');
            }
                 //STAND
            else if(this.body.blocked.down||this.touchGrave==true){
                this.animations.play('stand_N');
            }
        }
    else if(this.isKill==0) {
        this.animations.play('die');

    }

    //timer del dispar
    if (!this.canShoot && platformer.tutorial.game.time.now - this.timeCheck > this.shootWait){
        this.canShoot = true;
    }


}
platformer.playerPrefab.prototype.shoot = function () {
    //crear arma
    this.newProjectile = new platformer.playerBulletPrefab(platformer.game,platformer.tutorial.hero.position.x+20,platformer.tutorial.hero.position.y,0, this.level);
    //afegir a l'array d'armes
    platformer.tutorial.projectiles.add(this.newProjectile);
    //posem el contador al temps actual per no deixar disparar a lo loco
    this.canShoot = false;
    this.timeCheck = platformer.tutorial.game.time.now;
    //so de dispar
    this.playerShoot.play();
}
platformer.playerPrefab.prototype.touch = function (hero,grave) {
    if(hero.body.touching.down&&grave.body.touching.up)
    this.touchGrave=true;
}
platformer.playerPrefab.prototype.showArmourGone = function(hero,enemy){

  if(hero.x>enemy.x){ var span = 16; }
  else var span = -16;

  var armourGone = this.game.add.sprite(this.x+span,  this.y-32, "armaduraGone");
  armourGone.anchor.setTo(0.5);
  var anim = armourGone.animations.add("armourGone", [0,1,2,3,3], 14, false);
  anim.play("armourGone");
  anim.killOnComplete = true;
}
platformer.playerPrefab.prototype.killPlayer = function (hero,enemy) {
    if(!this.invincible){
        if(this.with_cloth==true)   this.showArmourGone(hero,enemy);
        this.with_cloth=false;
        this.isKill--;
        if(this.with_cloth==false&&this.isKill==0){
            lastLife=this.player_life;
            this.player_life--;
            if(this.player_life<lastLife) {
                //play so of died
                hero.reset(this.playerPos[0],this.playerPos[1]);
                this.with_cloth=true;
                this.isKill=2;
            }
        }
        if(this.player_life==0){
            this.killOnComplete=true;
            if(this.killOnComplete){
            this.game.state.start('mainMenu');
            this.level.themeMusic.stop();
            }
        }
    }
}
platformer.playerPrefab.prototype.PlayerDie = function (hero,water) {
    //setTimeout(endGame,1000);
    if(!this.invincible){
    if(hero.body.touching.down&&water.body.touching.up){
        //play so of died
        lastLife=this.player_life;
        this.player_life--;
        if(this.player_life<lastLife) {
            //play so of died
            hero.reset(this.playerPos[0],this.playerPos[1]);
            this.with_cloth=true;
            this.isKill=2;
        }

        if(this.player_life==0){
            this.killOnComplete=true;
            if(this.killOnComplete){
            this.game.state.start('mainMenu');
            this.level.themeMusic.stop();
            }
        }
    }
  }
}
