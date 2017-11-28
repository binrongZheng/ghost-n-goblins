var platformer = platformer || {};

platformer.playerPrefab = function (game,x,y, _level,_player_life,_cursors,_jump_key,_space,_with_cloth,player_have_life) {
    //INPUT VALUE
    this.playerHaveLife=player_have_life;
    this.player_life=_player_life;
	  this.level = _level;
    this.cursors = _cursors;
    this.jump_key = _jump_key;
    this.space = _space;
    this.with_cloth = _with_cloth;
    this.onLadder=false; //esta xoca amb ladder
    this.climbing=false; //no esta pujant
    this.climbingStopState=false;//esta stop de climb
    this.climbingLevel=0;//altura de ladder donde esta
    this.isKill=2;
    this.playerPos=[x,y];
    this.animationStop=false;
    this.hasKey = false;

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
    this.animations.add('attack', [8,9,10,11],15,false);
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
    this.animations.add('attack_N', [24,25,26,27],10,false);
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

    //Timer del dispar i tipus d'arma
    this.weaponType = 0;
    this.canShoot = true;
    this.timeCheck;
    this.shootWait = 250;
    //toca grave
    this.touchGrave=false;

    this.invincible = false;
    this.invincibleKey = game.input.keyboard.addKey(Phaser.Keyboard.I);
};

platformer.playerPrefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.playerPrefab.prototype.constructor = platformer.playerPrefab;

platformer.playerPrefab.prototype.update = function () {
    this.touchGrave=false;

	  this.game.physics.arcade.collide(this, this.level.platform_collision);
    this.game.physics.arcade.collide(this, this.level.graves, this.touch, null, this);
    this.game.physics.arcade.collide(this, this.level.movingPlatform, this.touch, null, this);	//utilizo lo mismo para la movingPlatform
    this.game.physics.arcade.collide (this, this.level.water, this.PlayerDie, null, this);

//collide with ladders
  //xoca amb ladders
  if(this.game.physics.arcade.overlap(this,this.level.ladders)){
    //si esta adalt
    if(this.y<=192){
      //si esta caminant
      if(this.body.blocked.down&&!this.cursors.down.isDown){  this.onLadder=true; this.climbing=false; }
      if(this.body.blocked.down&&this.cursors.down.isDown){   this.onLadder=true;  this.climbing=true; }
    }
    //si esta abaix
    else if(this.y>190){
      //collision down es true
      if(this.y>250) this.body.checkCollision.down=true;
      //si esta saltant no pujar
      if(!this.body.blocked.down&&this.climbingLevel==0){  this.onLadder=false; this.climbing=false;}
      //si esta pujant
      if(!this.body.blocked.down&&this.climbingLevel!=0){  this.onLadder=true; this.climbing=true;}
      //si esta baixant
      if(!this.body.blocked.down&&this.climbingLevel!=0&&this.cursors.down.isDown){  this.onLadder=true; this.climbing=true;}
      //si esta caminant i no pujar
      if(this.body.blocked.down&&!this.cursors.up.isDown){   this.onLadder=true; this.climbing=false;}
      //si esta ajupir
      if(this.body.blocked.down&&this.cursors.down.isDown){   this.climbingLevel=0; this.onLadder=false; this.climbing=false;}
    }
  }
  else {
    //collision es true
    this.body.checkCollision.down=true;
    //si esta abaix
    if(this.y<=352){this.climbingLevel=0;      this.onLadder=false;      this.climbing=false;}
    //si esta adalt
    if(this.y<=190){this.climbingLevel=162;      this.onLadder=false;      this.climbing=false;}
  }
  //if(this.game.physics.arcade.overlap(this,this.level.ladders)){
    console.log(this.y+" "+this.onLadder+" "+this.climbing);
  //}

/*
    if(!this.onLadder&&this.y<=190||this.cursors.down.isDown&&this.body.blocked.down&&this.y>200) { this.climbing=false;this.body.allowGravity=true;}

    if(this.game.physics.arcade.overlap(this,this.level.ladders)){
      if(this.body.blocked.down&&this.cursors.down.isDown)        this.onLadder=false;
      else  this.onLadder=true;
    }
    else  {this.onLadder=false;this.body.allowGravity=true;}


*/
//si esta moure en ladder
if(this.onLadder)  this.game.physics.arcade.overlap(this,this.level.ladders,this.climbLadders, null, this);
//si esta pujant no hay gravetat
if(this.climbing) this.body.allowGravity=false;

else this.body.allowGravity=true;

  this.game.physics.arcade.collide (this, this.level.enemyProjectiles, this.killPlayer, null, this);

	this.body.velocity.x = 0;

    //COMPROVAR CHECKPOINTS I SETEJAR SI CAL
    for (var i = 0; i < this.level.checkpoints.length;i++){
        if (Phaser.Math.difference(this.position.x,this.level.checkpoints[i].x) < 10){
            if (i > gameOptions.currentCheckpoint){ //aixi nomes ho fa un cop
                var hud = this.level.hud;
                hud.timer = this.level.game.time.create(false);
	            hud.timer.loop(gameOptions.tutorialTime*1000+999,hud.timerFinished,hud);
				hud.timer.start();
                gameOptions.currentCheckpoint = i;
            }

        }
    }


	//INVENCIBILITAT
	if(this.invincibleKey.isDown){
        this.invincible = !this.invincible;
    }
    //POSAR TAMANY COLISIO A NORMAL SI NO HO ESTA
    if (this.body.height != this.height)
        this.body.setSize(this.width*this.scale.x, this.height, 0,0);

    //WITH CLOTH ANIMATION
        if(this.with_cloth==true&&!this.climbing){
            //ATTACK
            if (this.space.isDown){
                this.animations.play('attack');
                if (this.canShoot)
                    this.shoot();
            }
            //AJUPIR
            else if (this.cursors.down.isDown && this.body.blocked.down||this.cursors.down.isDown && this.touchGrave==true ){
                this.animations.play('ajupir');
                this.body.setSize(this.width*this.scale.x, this.height/2, 0, this.height/2);
            }
            //MOVEMENT LEFT/RIGHT with or without JUMP
            else if (this.cursors.left.isDown){

                if(this.body.blocked.down||this.touchGrave==true){
                    if ((this.x+this.width/2) > (this.level.checkpoints[gameOptions.currentCheckpoint].x - gameOptions.gameWidth/2))
                        this.body.velocity.x = -gameOptions.playerSpeed;
                    else
                        this.body.velocity.x = 0;
                    this.animations.play('walk');
                    this.scale.x = -1;
                }
                if(this.jump_key.isDown&&!this.body.blocked.down&&this.touchGrave==false){
                    this.animations.play('jump_throw');
                    this.scale.x = -1;
                    if ((this.x+this.width/2) > (this.level.checkpoints[gameOptions.currentCheckpoint].x - gameOptions.gameWidth/2))
                        this.body.velocity.x = -gameOptions.playerSpeed;
                    else
                        this.body.velocity.x = 0;
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

     else if(this.isKill!=0&&!this.climbing){

           //ATTACK
           if (this.space.isDown){
               this.animations.play('attack_N');
               if (this.canShoot)
                   this.shoot();
           }
           //AJUPIR
           else if (this.cursors.down.isDown && this.body.blocked.down||this.cursors.down.isDown && this.touchGrave==true ){
               this.animations.play('ajupir_N');
               this.body.setSize(this.width*this.scale.x, this.height/2, 0, this.height/2);
           }
           //MOVEMENT LEFT/RIGHT with or without JUMP
           else if (this.cursors.left.isDown){
               if(this.body.blocked.down||this.touchGrave==true){
                   if ((this.x+this.width/2) > (this.level.checkpoints[gameOptions.currentCheckpoint].x - gameOptions.gameWidth/2))
                        this.body.velocity.x = -gameOptions.playerSpeed;
                   else
                       this.body.velocity.x = 0;
                   this.animations.play('walk_N');
                   this.scale.x = -1;
               }
               if(this.jump_key.isDown&&!this.body.blocked.down&&this.touchGrave==false){
                   this.animations.play('jump_throw_N');
                   this.scale.x = -1;
                   if ((this.x+this.width/2) > (this.level.checkpoints[gameOptions.currentCheckpoint].x - gameOptions.gameWidth/2))
                        this.body.velocity.x = -gameOptions.playerSpeed;
                   else
                       this.body.velocity.x = 0;
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

           //JUMP
           if (this.jump_key.isDown && this.body.blocked.down && this.jump_key.downDuration(250)||this.jump_key.isDown && this.touchGrave==true && this.jump_key.downDuration(250)){
               this.body.velocity.y = -gameOptions.playerJumpForce;
           }

        }
    else if(this.isKill==0&&this.animationStop==false) {
        this.animations.play('die');
        this.animations.currentAnim.onComplete.add(function () {
          this.animationStop=true;
      }, this);
    }

    //timer del dispar
    if (!this.canShoot && platformer.tutorial.game.time.now - this.timeCheck > this.shootWait){
        this.canShoot = true;
    }



}
platformer.playerPrefab.prototype.shoot = function () {
    //crear arma
    this.newProjectile = new platformer.playerBulletPrefab(platformer.game,platformer.tutorial.hero.position.x+20,platformer.tutorial.hero.position.y,this.weaponType, this.level);
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

  armourGone = this.game.add.sprite(this.x+span,  this.y-32, "armaduraGone");
  armourGone.anchor.setTo(0.5);
  anim = armourGone.animations.add("armourGone", [0,1,2,3,3], 14, false);
  //anim.play("armourGone");
   anim.killOnComplete = true;
/*  anim.currentAnim.onComplete.add(function () {
    console.log('animation complete');
    this.with_cloth=false;
}, this);*/
}
platformer.playerPrefab.prototype.killPlayer = function (hero,enemy) {
    if(!this.invincible){
        if(this.with_cloth==true && this.isKill==2) {
			this.invincible = true;
		  	this.game.time.events.add(1060,this.stopInvincible,this);	//para dejar de ser invencible
          	//this.showArmourGone(hero,enemy);							//da error (no puede conseguir la x del enemigo)
        }
        this.with_cloth=false;
        this.isKill--;
		this.game.time.events.repeat(Phaser.Timer.SECOND/27,28,this.invincibleBlink,this);	//evento para que se ponga a parpadear
        if(this.with_cloth==false&&this.isKill==0){
            lastLife=this.player_life;
            this.player_life--;
            if(this.player_life<lastLife&&this.player_life!=0) {
                this.isKill=0;
                this.body.checkCollision.up=false;
                this.body.checkCollision.left=false;
                this.body.checkCollision.right=false;
                this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.map_Screen, this);

                //this.game.state.start('tutorial');
            }
        }
        if(this.playerHaveLife){
          if(this.player_life==0&&this.with_cloth==false){
            this.isKill=0;
            this.level.game_over.visible=true;
            this.body.checkCollision.up=false;
            this.body.checkCollision.left=false;
            this.body.checkCollision.right=false;
            this.game.time.events.add(Phaser.Timer.SECOND * 4, this.gameover);
            this.level.currentCheckpoint = 0; //posem el respawn al inici un altre cop
            }
        }
        else{
          if(this.player_life<=0){
            this.isKill=0;
            this.body.checkCollision.up=false;
            this.body.checkCollision.left=false;
            this.body.checkCollision.right=false;
            gameOptions.levelOption = gameOptions.lastOption;
            this.level.themeMusic.stop();
            this.game.state.start('mapScreen');
            //this.game.state.start('tutorial');
          }
        }
    }

}
platformer.playerPrefab.prototype.PlayerDie = function (hero,water) {
    //setTimeout(endGame,1000);
  if(!this.invincible){
    //if(hero.body.touching.down&&water.body.touching.down){
        //play so of died

        lastLife=this.player_life;
        this.player_life--;

        if(this.player_life<lastLife&&this.player_life>0) {
            gameOptions.levelOption = this.player_life;
            this.level.themeMusic.stop();
              this.game.state.start('mapScreen');
            //this.game.state.start('tutorial');

        }
        if(this.playerHaveLife){
          if(this.player_life<=0){
              this.isKill=0;
              this.level.game_over.visible=true;
              hero.kill();
              this.game.time.events.add(Phaser.Timer.SECOND * 4, this.gameover, this);

          }
        }
        else{
          if(this.player_life<=0){
            gameOptions.levelOption = gameOptions.lastOption;
            this.level.themeMusic.stop();
              this.game.state.start('mapScreen');
            //this.game.state.start('tutorial');
          }
        }
  }

}
platformer.playerPrefab.prototype.deadByTimer = function(){
	//No entiendo muy bien que es cada variable... pero parece que funciona
	if(!this.invincible){
		this.isKill=0;
		this.with_cloth=false;
		//this.animationStop=false;
		lastLife=this.player_life;
        this.player_life--;
        if(this.player_life<lastLife&&this.player_life!=0) {
            gameOptions.levelOption = this.player_life;
            this.level.themeMusic.stop();

            this.game.state.start('mapScreen');
          //  this.game.state.start('tutorial');
        }
        if(this.playerHaveLife){
          if(this.player_life==0){
              this.level.game_over.visible=true;
              this.game.time.events.add(Phaser.Timer.SECOND * 4, this.gameover, this);
              }
        }
	}
}
platformer.playerPrefab.prototype.map_Screen = function () {
    platformer.tutorial.game_over.destroy();
    this.killOnComplete=true;
    if(this.killOnComplete){
      gameOptions.levelOption = this.player_life;
      this.level.themeMusic.stop();
      this.game.state.start('mapScreen');
    }
}
platformer.playerPrefab.prototype.gameover = function () {
    platformer.tutorial.game_over.destroy();
    this.killOnComplete=true;
    if(this.killOnComplete){
      platformer.game.state.start('mainMenu');
      platformer.tutorial.themeMusic.stop();
      gameOptions.levelOption=gameOptions.lastOption;
      gameOptions.currentCheckpoint = 0;
    }
}
platformer.playerPrefab.prototype.climbLadders = function (hero,ladder) {
  //si sube
  if(this.cursors.up.isDown){
    //climbing es true
    this.climbing=true;
    //posicio en ladder
    hero.body.x=ladder.x-7;
    //ladder nivell diferet que 0
    this.climbingLevel+=0.1;
    //activa animacio amb armadura o no (hasta un distancia limit)
    if(this.y>253){
      if(this.with_cloth) this.animations.play('climb');
      else this.animations.play('climb_N');
    }
    else if(this.y<228&&this.y>210){//top anim
      if(this.with_cloth) this.animations.play('climbontop0');
      else this.animations.play('climbontop0_N');
    }
    else if(this.y<246&&this.y>228){//secon anim
      if(this.with_cloth) this.animations.play('climbontop1');
      else this.animations.play('climbontop1_N');
    }
    else if(this.y<210&&this.y>192){
      if(this.with_cloth) this.animations.play('stand');
      else this.animations.play('stand_N');
    }
    //moviment vertical
    this.body.velocity.y=-(gameOptions.playerSpeed-100);
  }
  //si baja
  else if(this.cursors.down.isDown){
    //climbing es true
    this.climbing=true;
    //desactivar collision amb plataforma
    if(this.y>250) this.body.checkCollision.down=true;
    else this.body.checkCollision.down=false;
    //posicio en ladder
    hero.body.x=ladder.x-7;
    //ladder nivell diferet que 0
    this.climbingLevel-=0.1;
    //activa animacio amb armadura o no (hasta un distancia limit)
    if(this.y>253){
      if(this.with_cloth) this.animations.play('climb');
      else this.animations.play('climb_N');
    }
    else if(this.y<228&&this.y>210){//top anim
      if(this.with_cloth) this.animations.play('climbontop0');
      else this.animations.play('climbontop0_N');
    }
    else if(this.y<246&&this.y>228){//secon anim
      if(this.with_cloth) this.animations.play('climbontop1');
      else this.animations.play('climbontop1_N');
    }
    else if(this.y<210&&this.y>192){
      if(this.with_cloth) this.animations.play('stand');
      else this.animations.play('stand_N');
    }
    //moviment vertical
    this.body.velocity.y=(gameOptions.playerSpeed-100);
  }
  else if(this.y>246&&this.y<352) {
    this.climbing=true
    //amb roba o no
    if(this.with_cloth){
      if(this.climbingStopState)   this.animations.play('climbstopleft');
      else this.animations.play('climbstopright');
    }
    else {
      if(this.climbingStopState)   this.animations.play('climbstopleft_N');
      else this.animations.play('climbstopright_N');
    }
    this.body.velocity.y=0;
  }
  else if(this.y<228&&this.y>210){//top anim
    if(this.with_cloth) this.animations.play('climbontop0');
    else this.animations.play('climbontop0_N');
  }
  else if(this.y<246&&this.y>228){//secon anim
    if(this.with_cloth) this.animations.play('climbontop1');
    else this.animations.play('climbontop1_N');
  }
  else if(this.y<210&&this.y>192){
    if(this.with_cloth) this.animations.play('stand');
    else this.animations.play('stand_N');
  }

  //si salt no fa res
  else if(this.jump_key.isDown){
    if(this.y>192){
     this.body.velocity.y=0;}
   }
}/*
platformer.playerPrefab.prototype.climbUp = function(){
  this.y=190;
  if(this.with_cloth)
    this.animations.play('stand');
  else
    this.animations.play('stand_N');
}
*/
platformer.playerPrefab.prototype.invincibleBlink = function(){
	//hace que el jugador se ponga a parpadear (se llama des de un evento que se repite)
	if(this.alpha == 0){
		this.alpha = 0.7;
	}
	else {
		this.alpha = 0;
	}
}
platformer.playerPrefab.prototype.stopInvincible = function(){
	this.alpha = 1;
	this.invincible = false;
}
