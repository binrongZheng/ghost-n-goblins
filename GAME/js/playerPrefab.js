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
    this.ladderArea;//detectce ladder
    this.onLadder=false; //esta xoca amb ladder
    this.climbing=false; //no esta pujant
    this.climbingStopState=false;//esta stop de climb
    this.climbingLevel=0;//altura de ladder donde esta
    this.ajupir_attack=false;//per fer atack diferent
    this.jumping_start=false;//per fer el so difeent
    this.lastJumpState=false;
    this.isKill=2;
    this.playerPos=[x,y];
    this.animationStop=false;
    this.celebrating = false;//per no deixar moure's ni re just quan ha agafat la clau
    this.damaged = false; //per no deixar fer res quan t'acaven de fer daño
    //SPRITE
	  Phaser.Sprite.call(this,game,x,y,'hero');
	  game.add.existing (this);
	  this.anchor.setTo(.5);
	//ARMADURA - GONE
    this.animations.add("removeArmour", [32,33], 8, false);
    //PLAYER - WITH CLOTH
    this.animations.add('walk', [0,1,2,3],10,true);
    this.animations.add('stand', [4],10,false);
    this.animations.add('jump_up', [7],10,false);
    this.animations.add('jump_throw', [5],10,false);
    this.animations.add('ajupir', [6],10,false);
    this.animations.add('hurt', [7],10,false);
    this.animations.add('attack', [8,9],5,false);
    this.animations.add('attack_ajupir', [10,11],5,false);
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
    this.animations.add('attack_N', [24,25],5,false);
    this.animations.add('attack_N_ajupir', [26,27],5,false);
    this.animations.add("climb_N", [28,31], 10, true);
    this.animations.add("climbstopleft_N", [28], 10, false);
    this.animations.add("climbstopright_N", [31], 10, false);
    this.animations.add("climbontop0_N", [30], 10, false);
    this.animations.add("climbontop1_N", [29], 10, false);
    //PLAYER - DIE
    this.animations.add("die", [33,34,33,34,33,34,33,34,35,36,37,37,37,37,37,38], 10, false);

    //AUDIO
    this.playerShoot = this.level.add.audio('player_Shoot');
    this.playerJumpStart= this.level.add.audio('jumpUpSo');
    this.playerJumpStart.loop=false;
    this.playerJumpEnd= this.level.add.audio('jumpDownSo');
    this.playerJumpEnd.loop=false;
    this.removeArmourSo= this.level.add.audio('removeArmourSo');
    this.playerDieSo= this.level.add.audio('dieSo');

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

    //LA POSICIO DEL DISPAR
    this.shootOffset = 7;
};

platformer.playerPrefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.playerPrefab.prototype.constructor = platformer.playerPrefab;

platformer.playerPrefab.prototype.update = function () {

	  this.game.physics.arcade.collide(this, this.level.platform_collision);
    this.touchGrave=false;
    this.game.physics.arcade.collide(this, this.level.graves, this.touch, null, this);
    this.game.physics.arcade.collide(this, this.level.movingPlatform, this.touch, null, this);	//utilizo lo mismo para la movingPlatform
    this.game.physics.arcade.collide (this, this.level.water, this.PlayerDie, null, this);
    //collision de sala sala_boss
    this.game.physics.arcade.collide(this, this.level.platform,this.touch,null,this);


    this.lastJumpState = this.jumping_start;

  //so de jump
  if(this.canPlay){
    if(this.jump_key.isDown||!this.body.blocked.down&&!this.touchGrave)  this.jumping_start=true;
    if(this.jumping_start==true&&this.jumping_start!=this.lastJumpState) this.playerJumpStart.play();
    if(this.jump_key.isUp&&this.body.blocked.down||this.jump_key.isUp&&this.touchGrave)  this.jumping_start=false;
    if(this.jumping_start==false&&this.jumping_start!=this.lastJumpState) this.playerJumpEnd.play();
  }

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

//si esta moure en ladder
if(this.onLadder)  this.game.physics.arcade.overlap(this,this.level.ladders,this.climbLadders, null, this);
//si esta pujant no hay gravetat
if(this.climbing&&this.isKill>0){
  this.body.allowGravity=false;
  this.body.setSize(this.width/2*this.scale.x, this.height, this.width/4*this.scale.x,0);
}

else {
  this.body.allowGravity=true;
  this.body.setSize(this.width*this.scale.x, this.height, 0,0);
}
  this.game.physics.arcade.overlap (this, this.level.enemies,function (pj, enemy){

      if(pj.isKill > 0 && (!(enemy instanceof platformer.zombiePrefab) || enemy.frame < 4))  //si no es zombie o ja esta casi spawnejat del tot treu vida
          pj.killPlayer(pj,enemy);

    });

	

    //COMPROVAR CHECKPOINTS I SETEJAR SI CAL
    for (var i = 0; i < this.level.checkpoints.length;i++){
        if (Phaser.Math.difference(this.position.x,this.level.checkpoints[i].x) < 10){
            if (i > gameOptions.currentCheckpoint){ //aixi nomes ho fa un cop
				this.level.hud.resetTimer();		//vaig crear la funcio per algo.... >.< , ostia sry haha
                /*var hud = this.level.hud;
                hud.timer = this.level.game.time.create(false);
	            hud.timer.loop(gameOptions.tutorialTime*1000+999,hud.timerFinished,hud);
				hud.timer.start();*/
                gameOptions.currentCheckpoint = i;
            }

        }
    }


	//INVENCIBILITAT
	if(this.invincibleKey.isDown && this.invincibleKey.downDuration(10)){
        this.invincible = !this.invincible;
    }

    //si no estem saltant posem a 0 la velocitat
	//console.log(this.damaged +' vs ' + this.body.blocked.down);
    if (!this.damaged && this.touchGrave || this.body.blocked.down) {
        this.body.velocity.x = 0;
    }

    //POSAR TAMANY COLISIO A NORMAL SI NO HO ESTA
    if (this.body.height != this.height)
        this.body.setSize(this.width*this.scale.x, this.height, 0,0);
        //this.body.setSize(this.width/2*this.scale.x, this.height, this.width/4*this.scale.x,0);

    //WITH CLOTH ANIMATION
        if(this.with_cloth&&!this.climbing && !this.celebrating && !this.damaged&&this.level.canPlay){
            //ATTACK
            if (this.space.isDown){
              if(this.ajupir_attack) this.animations.play('attack_ajupir');
              else this.animations.play('attack');
              if (this.canShoot)
                    this.shoot();
            }
            //AJUPIR
            else if (this.cursors.down.isDown && this.body.blocked.down||this.cursors.down.isDown && this.touchGrave==true ){
                this.animations.play('ajupir');
                this.ajupir_attack=true;
                this.shootOffset = -10;
                this.body.setSize(this.width/2*this.scale.x, this.height/2, this.width/3*this.scale.x, this.height/2);
            }
            //MOVEMENT LEFT/RIGHT with or without JUMP
            else if (this.cursors.left.isDown){
                this.ajupir_attack=false;
                if(this.body.blocked.down||this.touchGrave==true){
                    if ((this.x+this.width/2) > (this.level.checkpoints[gameOptions.currentCheckpoint].x - gameOptions.gameWidth/2)) //per no poder caminar mes enrere del checkpoint
                        this.body.velocity.x = -gameOptions.playerSpeed;

                    this.animations.play('walk');
                    this.scale.x = -1;
                }
                if(this.jump_key.isDown&&!this.body.blocked.down&&this.touchGrave==false){

                    this.animations.play('jump_throw');

                    this.scale.x = -1;
                    if ((this.x+this.width/2) > (this.level.checkpoints[gameOptions.currentCheckpoint].x - gameOptions.gameWidth/2)) //per no caminar mes enrere del checkpoint
                        this.body.velocity.x = -gameOptions.playerSpeed;

                }
            }
            else if (this.cursors.right.isDown ){
                this.ajupir_attack=false;
                if(this.body.blocked.down||this.touchGrave==true){
                    this.body.velocity.x =+gameOptions.playerSpeed;
                    this.animations.play('walk');
                    this.scale.x=1;
                }
                if(this.jump_key.isDown&&!this.body.blocked.down&&this.touchGrave==false){

                    this.animations.play('jump_throw');

                    this.scale.x = 1;
                    this.body.velocity.x = gameOptions.playerSpeed;
                }
            }
            else if(!this.body.blocked.down&&this.touchGrave==false){
                this.ajupir_attack=false;

                this.animations.play('jump_up');


            }
                 //STAND
            else if(!this.damaged && this.body.blocked.down||this.touchGrave==true){
                this.ajupir_attack=false;
                this.body.velocity.x = 0;
                this.animations.play('stand');
            }

            //JUMP
            if (this.jump_key.isDown && this.body.blocked.down && this.jump_key.downDuration(250)||this.jump_key.isDown && this.touchGrave==true && this.jump_key.downDuration(250)){
                this.ajupir_attack=false;
                this.body.velocity.y = -gameOptions.playerJumpForce;
            }

        }

     else if(this.isKill!=0&&!this.climbing && !this.celebrating && !this.damaged&&this.level.canPlay){

           //ATTACK
           if (this.space.isDown){
             if(this.ajupir_attack) this.animations.play('attack_N_ajupir');
             else this.animations.play('attack_N');
               if (this.canShoot)
                   this.shoot();
           }
           //AJUPIR
           else if (this.cursors.down.isDown && this.body.blocked.down||this.cursors.down.isDown && this.touchGrave==true ){
               this.animations.play('ajupir_N');
               this.ajupir_attack=true;
               this.shootOffset = -10;
               this.body.setSize(this.width*this.scale.x, this.height/2, 0, this.height/2);
           }
           //MOVEMENT LEFT/RIGHT with or without JUMP
           else if (this.cursors.left.isDown){
             this.ajupir_attack=false;
               if(this.body.blocked.down||this.touchGrave==true){
                   if ((this.x+this.width/2) > (this.level.checkpoints[gameOptions.currentCheckpoint].x - gameOptions.gameWidth/2))
                        this.body.velocity.x = -gameOptions.playerSpeed;

                   this.animations.play('walk_N');
                   this.scale.x = -1;
               }
               if(this.jump_key.isDown&&!this.body.blocked.down&&this.touchGrave==false){

                   this.animations.play('jump_throw_N');

                   this.scale.x = -1;
                   if ((this.x+this.width/2) > (this.level.checkpoints[gameOptions.currentCheckpoint].x - gameOptions.gameWidth/2))
                        this.body.velocity.x = -gameOptions.playerSpeed;

               }
           }
           else if (this.cursors.right.isDown && !this.celebrating && !this.damaged){
             this.ajupir_attack=false;
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
             this.ajupir_attack=false;

               this.animations.play('jump_up_N');


           }
                //STAND
           else if(this.body.blocked.down||this.touchGrave==true){
               this.ajupir_attack=false;
               this.animations.play('stand_N');
           }

           //JUMP
           if (this.jump_key.isDown && this.body.blocked.down && this.jump_key.downDuration(250)||this.jump_key.isDown && this.touchGrave==true && this.jump_key.downDuration(250)){
               this.ajupir_attack=false;
               this.body.velocity.y = -gameOptions.playerJumpForce;
           }

        }
    if(this.isKill<=0&&this.animationStop==false) {
        this.animations.play('die');
        this.animations.currentAnim.onComplete.add(function () {
          this.animationStop=true;
      }, this);
    }

    //timer del dispar
    if (!this.canShoot && this.level.game.time.now - this.timeCheck > this.shootWait){
        this.canShoot = true;
    }
    //quan ens fan daño no ens podem moure fins que tornem a tocar el terra
    if(this.damaged && (this.body.blocked.down || this.touchGrave) ){
        this.damaged = false;
    }
    //QUAN NO ESTEM AJUPITS POSEM L'ALÇADA DEL DISPAR AL NORMAL
    if (!this.cursors.down.isDown && this.shootOffset != 7){
        this.shootOffset = 7;
    }
	
	
	

}
platformer.playerPrefab.prototype.shoot = function () {
    //crear arma-----------TODO: FALTA PER MIRAR SI EL PLAYER ESTÀ AJUPIT O NO (surt més amunt o avall)
    this.newProjectile = new platformer.playerBulletPrefab(platformer.game,this.x+(20*this.scale.x),this.y-this.shootOffset,this.weaponType, this.level);
    //afegir a l'array d'armes
    this.level.projectiles.add(this.newProjectile);
    //posem el contador al temps actual per no deixar disparar a lo loco
    this.canShoot = false;
    this.timeCheck = this.level.game.time.now;
    //so de dispar
    this.playerShoot.play();
}
platformer.playerPrefab.prototype.touch = function (hero,grave) {
    if(hero.body.touching.down&&grave.body.touching.up){
    	this.touchGrave=true;
		
	}
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
          	//this.showArmourGone(hero,enemy);					//da error (no puede conseguir la x del enemigo)

            //no deixem moure i apliquem força fins que tornem a tocar el terra
            this.damaged = true;
            this.removeArmourSo.play();
            this.animations.play('removeArmour');
            this.body.velocity.x = -200;
<<<<<<< HEAD
			this.body.velocity.y = -250;
			this.body.position.y -=50;
			this.game.time.events.repeat(Phaser.Timer.SECOND/27,28,this.invincibleBlink,this);	//evento para que se ponga a parpadear
=======
            this.body.velocity.y = -250;
            this.game.time.events.repeat(Phaser.Timer.SECOND/27,28,this.invincibleBlink,this);	//evento para que se ponga a parpadear
>>>>>>> 3199c8cc5c030f8a9deb7cbc6fb2acfc134459e7
        }
        this.with_cloth=false;
        this.isKill--;
        if(this.with_cloth==false&&this.isKill==0){
            lastLife=this.player_life;
            this.player_life--;
            if(this.player_life<lastLife&&this.player_life!=0) {
                this.isKill=0;
                this.body.checkCollision.up=false;
                this.body.checkCollision.left=false;
                this.body.checkCollision.right=false;
                this.body.velocity.x = 0;
                this.playerDieSo.play();
                this.playerDieSo.onStop.addOnce(function() {    this.game.time.events.add(Phaser.Timer.SECOND * 0.75, this.map_Screen, this);}, this);


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
            this.level.themeMusic.stop();
            this.level.gameoverMusic.play();
            this.body.velocity.x = 0;
<<<<<<< HEAD
            this.game.time.events.add(Phaser.Timer.SECOND * 5, this.gameover, this);
=======
            this.game.time.events.add(Phaser.Timer.SECOND * 5, this.gameover,this);
>>>>>>> 3199c8cc5c030f8a9deb7cbc6fb2acfc134459e7
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
            this.level.currentCheckpoint = 0;
            this.game.state.start('mapScreen');
          }
        }
		this.level.hud.changeLives(this.player_life);
    }

}
platformer.playerPrefab.prototype.PlayerDie = function (hero,water) {
  if(!this.invincible){
        //play so of died

        lastLife=this.player_life;
        this.player_life--;

        if(this.player_life<lastLife&&this.player_life>0) {
            gameOptions.levelOption = this.player_life;
            this.level.themeMusic.stop();
            hero.kill();
            this.playerDieSo.play();
//this.playerDieSo.onStop.addOnce(function() {    this.game.time.events.add(Phaser.Timer.SECOND * 0.75, this.map_Screen, this);}, this);
            this.playerDieSo.onStop.addOnce(function() { this.game.state.start('mapScreen');}, this);

            //this.game.state.start('tutorial');

        }
        if(this.playerHaveLife){
          if(this.player_life<=0){
              this.isKill=0;
              this.level.game_over.visible=true;
              hero.kill();
              this.level.themeMusic.stop();
              this.level.gameoverMusic.play();
              this.game.time.events.add(Phaser.Timer.SECOND * 5, this.gameover, this);

          }
        }
        else{
          if(this.player_life<=0){
            gameOptions.levelOption = gameOptions.lastOption;
            this.level.themeMusic.stop();
              this.game.state.start('mapScreen');
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
              this.level.themeMusic.stop();
              this.level.gameoverMusic.play();
              this.game.time.events.add(Phaser.Timer.SECOND * 5, this.gameover, this);
              }
        }
	}
}
platformer.playerPrefab.prototype.map_Screen = function () {
   this.level.game_over.destroy();
    this.killOnComplete=true;
    if(this.killOnComplete){
      gameOptions.levelOption = this.player_life;
      this.level.themeMusic.stop();
      this.game.state.start('mapScreen');
    }
}
platformer.playerPrefab.prototype.gameover = function () {
    this.level.game_over.destroy();
    this.killOnComplete=true;

    if(this.killOnComplete){
      //todo lo que esta aqui tiene que ser platformer con this.level no funciona
      gameOptions.currentScore = 0;
      this.level.gameoverMusic.stop();
      platformer.game.state.start('mainMenu');
      this.level.themeMusic.stop();
      gameOptions.levelOption=gameOptions.lastOption;
      gameOptions.currentCheckpoint = 0;
    }
}
platformer.playerPrefab.prototype.climbLadders = function (hero,ladder) {
  this.ladderArea = hero.x-ladder.x;
  if(this.ladderArea<10||  this.ladderArea>38) {this.onLadder=false;  this.climbing=false;}
  if(this.isKill>0) {
  //si sube
  if(this.cursors.up.isDown&&  this.ladderArea>10&&  this.ladderArea<38){
    //climbing es true
    this.climbing=true;
    //posicio en ladder
    hero.body.x=ladder.x+5;

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
  else if(this.cursors.down.isDown&&  this.ladderArea>10&&  this.ladderArea<38){
    //climbing es true
    this.climbing=true;
    //desactivar collision amb plataforma
    if(this.y>250) this.body.checkCollision.down=true;
    else this.body.checkCollision.down=false;
    //posicio en ladder
    hero.body.x=ladder.x+5;
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
 }

}
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
