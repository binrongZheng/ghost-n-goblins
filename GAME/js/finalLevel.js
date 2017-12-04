var platformer = platformer || {};

platformer.finalLevel={
    init:function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  		this.scale.pageAlignHorizontally = true;
  		this.scale.pageAlignVertically = true;
  		this.scale.setGameSize(gameOptions.gameWidth, gameOptions.gameHeight);
          this.game.world.setBounds(0, 0, gameOptions.level1Width, gameOptions.level1Height);
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
      //SO
      this.game.load.audio('theme_music','sounds/final_level_music.mp3');


    },
    create:function(){
      //BACKGROUND
      this.bg = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/2, 'bg');
      this.bg.anchor.setTo(.5);

      this.platform = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/10*9, 'platform');
      this.platform.scale.setTo(1.5,2.6);
      this.platform.anchor.setTo(.5);
      this.platform.enableBody = true;
      this.platform.immovable = true;
      //hero
      //this.hero = new platformer.playerPrefab(this.game,this.checkpoints[gameOptions.currentCheckpoint].x,this.checkpoints[gameOptions.currentCheckpoint].y,this,this.player_life,this.cursors,this.jump_key,this.space,this.with_cloth,this.playerHaveLife );
      this.themeMusic=this.add.audio('theme_music');

      this.themeMusic.play();
    },
    update:function(){
    }
}
