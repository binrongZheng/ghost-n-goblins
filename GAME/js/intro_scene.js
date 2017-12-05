var platformer = platformer || {};

platformer.intro_scene={
    init:function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  		this.scale.pageAlignHorizontally = true;
  		this.scale.pageAlignVertically = true;
  		this.scale.setGameSize(gameOptions.gameWidth, gameOptions.gameHeight);
	},
    preload:function(){
      //BACKGROUND
      this.game.load.video('introVideo', 'video/introVideo.mp4');
    },
    create:function(){

        //BACKGROUND
        this.video = this.game.add.video('introVideo');
        //this.video.onPlay.addOnce(start, this);
        this.sprite = this.video.addToWorld(0, 0, 0.0, 0.0,1,1.1);
        this.sprite.width=gameOptions.gameWidth;
        this.sprite.height=gameOptions.gameHeight+10;

        this.video.play(true);

        //CONTROLS
        this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    update:function(){
        this.game.time.events.add(8600, this.changeState, this);

        if(this.escKey.isDown){
            this.video.play(false);
            platformer.game.state.start('tutorial');
        }
    },
    changeState:function(){
       this.video.play(false);
       platformer.game.state.start('tutorial');
   }
}
