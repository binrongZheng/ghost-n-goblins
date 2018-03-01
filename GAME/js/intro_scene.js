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
      this.game.load.audio('map_music','sounds/intro_map.mp3');

    },
    create:function(){

        //BACKGROUND
        this.video = this.game.add.video('introVideo');
        //this.video.onPlay.addOnce(start, this);
        this.sprite = this.video.addToWorld(0, 0, 0.0, 0.0,1,1.1);
        this.sprite.width=gameOptions.gameWidth;
        this.sprite.height=gameOptions.gameHeight+10;

        this.video.play(true);
        this.map_Music=this.add.audio('map_music');
        //CONTROLS
        this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    platformer.finalLevel.inPlay=false;
    },
    update:function(){
        this.game.time.events.add(8600, this.changeState, this);

        if(this.escKey.isDown){
            this.sprite.destroy()
            this.video.stop();
            this.map_Music.play();
            platformer.game.state.start('tutorial');
        }
    },
    changeState:function(){
       this.sprite.destroy()
       this.video.stop();
       this.map_Music.play();
       platformer.game.state.start('tutorial');
   }
}
