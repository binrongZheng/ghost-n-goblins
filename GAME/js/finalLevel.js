var platformer = platformer || {};

platformer.finalLevel={
    init:function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  		this.scale.pageAlignHorizontally = true;
  		this.scale.pageAlignVertically = true;
  		this.scale.setGameSize(gameOptions.gameWidth, gameOptions.gameHeight);
          this.game.world.setBounds(0, 0, gameOptions.gameWidth, gameOptions.gameHeight);
          //player init value
          this.with_cloth=true;
          this.player_life=gameOptions.levelOption;
          this.playerHaveLife=gameOptions.playerLife;//playerLife==false;
          this.isPlay=true;
	  },
    preload:function(){
      //MAPA
      this.load.image('bg','img/sala_boss.png');
      this.load.image('platform','img/ladder.png');
      //PLAYER SPRITE
      this.load.spritesheet('hero', 'img/arthur.png', 64, 64);
      //BULLET SPRITES
      this.load.image('arma_lance','img/lance.png');
      this.load.image('arma_daga','img/daga.png');
      this.load.spritesheet('arma_torcha','img/arma_foc.png',32,32);
      this.load.spritesheet('foc','img/foc.png',32,32);
      //MENU PAUSA
      this.load.image('menu_pausa', 'img/menu pausa.png');
      //GAME OVER
      this.load.image('game_over', 'img/game_over.png');

      //SO
      this.game.load.audio('theme_music','sounds/final_level_music.mp3');
      this.game.load.audio('player_Shoot','sounds/lance.mp3');
      this.game.load.audio('gameover','sounds/gameover.mp3');
      this.game.load.audio('jumpUpSo','sounds/jumpStart.mp3');
      this.game.load.audio('jumpDownSo','sounds/jumpEnd.mp3');
      this.game.load.audio('dieSo','sounds/die.mp3');
      this.game.load.audio('removeArmourSo','sounds/removeArmour.mp3');
      this.game.load.audio('win_music','sounds/gngEndTheme.mp3');


      //introVideo
      this.game.load.video('introVideo', 'video/Intro_bossLevel.mp4');
      //endVideo
      this.game.load.video('endVideo', 'video/End_bossLevel.mp4');

      //comprovar si puede jugar o no
      this.canPlay=false;
      //comprovar si guanyar o no
      this.win=false;
      //para play end music que no todo rato play, solo play una vez
      this.playWinMusic=0;
      //ADD motor de physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = gameOptions.playerGravity;

      //CHECKPOINT
      this.checkpoints = [];
      var c1 = new Phaser.Point(gameOptions.gameWidth/4+32,330);//+47
      var c2 = new Phaser.Point(3100,330);
      this.checkpoints.push(c1);
      this.checkpoints.push(c2);


    },
    create:function(){
      //platform
      this.platform = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/10*9, 'platform');
      this.platform.scale.setTo(1.5,2.6);
      this.platform.anchor.setTo(.5);

      this.game.physics.arcade.enable(this.platform);
      this.platform.body.immovable=true;
      this.platform.body.allowGravity=false;

      //BACKGROUND
      this.bg = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/2, 'bg');
      this.bg.anchor.setTo(.5);

      //CONTROLS
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.jump_key=this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
      this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
      this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
      this.playKey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);


      //hero
      this.hero = new platformer.playerPrefab(this.game,this.checkpoints[gameOptions.currentCheckpoint].x,this.checkpoints[gameOptions.currentCheckpoint].y,this,this.player_life,this.cursors,this.jump_key,this.space,this.with_cloth,this.playerHaveLife );

      //BALES DEL PERSONATGE
      this.projectiles = this.add.group();

      //INTRO VIDEO

      this.introVideo = this.game.add.video('introVideo');

      //this.video.onPlay.addOnce(start, this);
      this.introSprite = this.introVideo.addToWorld(gameOptions.gameWidth/2, gameOptions.gameHeight/2+23, 0.5, 0.5,1,1);
      this.introSprite.width=gameOptions.gameWidth+90;
      this.introSprite.height=gameOptions.gameHeight-45;

      this.introVideo.play(true);




      //CAMERA
      //this.camera.follow(this.hero);
      //HUD
    //  this.hud = new platformer.hudPrefab(this.game,this,this.hero.player_life);

      //music
      this.themeMusic=this.add.audio('theme_music');
      this.themeMusic.loop = true;

      //this.themeMusic.play();
      this.win_Music=this.add.audio('win_music');

    },
    update:function(){
      if(this.themeMusic.loop==false) this.themeMusic.stop();
      if(!this.win){
        this.game.time.events.add(6700, this.changeState, this);
      }
      else{
        this.playWinMusic++;
        if(this.playWinMusic==1)  this.win_Music.play();
        if(this.playWinMusic>100) this.playWinMusic=10;
        this.game.time.events.add(10, this.gotoEndAnimation, this);
      }
      console.log(this.canPlay);
    /*  this.game_over = this.add.sprite(this.camera.x+gameOptions.gameWidth/2,this.camera.y+gameOptions.gameHeight/2, 'game_over');
      this.game_over.anchor.setTo(0.5);
      this.game_over.visible=false;
      this.map.forEach(function(t){if (t) {t.collideDown=false;}},this.game,0,0,this.map.width,this.map.height,'platform_up');
*/
  },
  changeState:function(){
    if(this.win)this.canPlay=false;
    else this.canPlay=true;
    this.introSprite.destroy();
    this.introVideo.stop();
 },
 gotoEndAnimation:function(){
   //END VIDEO
   this.endVideo = this.game.add.video('endVideo');
   this.endSprite = this.endVideo.addToWorld(gameOptions.gameWidth/2, gameOptions.gameHeight/2, 0.5, 0.5,1,0.7);
   this.endSprite.width=gameOptions.gameWidth+90;
   this.endSprite.height=gameOptions.gameHeight-89;

 }


}
