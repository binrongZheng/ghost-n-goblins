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
        //SO
        this.game.load.audio('map_music','sounds/intro_map.mp3');
    },
    create:function(){
        //BACKGROUND
       	this.bg = this.game.add.sprite(0,0, 'bg');
        this.cameraMovement=-2.1;


        //MUSIC
            this.mapMusic=this.add.audio('map_music');
            this.mapMusic.loop = false;

            this.mapMusic.play();
    },
    update:function(){
        if(this.bg.x <= -this.bg.width/2) {
          this.mapMusic.stop();
          this.game.state.start('tutorial');
        }

        this.bg.x+=this.cameraMovement;
    }

}
