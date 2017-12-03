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
    },
    create:function(){
      //BACKGROUND
      this.bg = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/2, 'bg');
      this.bg.anchor.setTo(.5);

    },
    update:function(){
    }
}
