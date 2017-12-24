var platformer = platformer || {};

platformer.loginScene={
    init:function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  		this.scale.pageAlignHorizontally = true;
  		this.scale.pageAlignVertically = true;
  		this.scale.setGameSize(gameOptions.gameWidth, gameOptions.gameHeight);
	},
    preload:function(){
      //BACKGROUND      

    },
    create:function(){
  
        platformer.finalLevel.inPlay=false;
    },
    update:function(){
        
    }
}