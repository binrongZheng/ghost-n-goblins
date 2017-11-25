var platformer = platformer || {};

platformer.mapScreen={
    init:function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  		this.scale.pageAlignHorizontally = true;
  		this.scale.pageAlignVertically = true;
  		this.scale.setGameSize(gameOptions.gameWidth, gameOptions.gameHeight);
	},
    preload:function(){
        //BACKGROUND
        this.load.image('bg','img/fullMap.png');
    },
    create:function(){
        //BACKGROUND
       	this.bg = this.game.add.sprite(0,0, 'bg');
        this.cameraMovement=-1;
    },
    update:function(){
        if(this.bg.x <= -this.bg.width/2) this.cameraMovement=1;
        if(this.bg.x>0) this.game.state.start('tutorial');
        this.bg.x+=this.cameraMovement;
    }

}
