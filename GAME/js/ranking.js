var platformer = platformer || {};

platformer.ranking={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setGameSize(gameOptions.gameWidth, gameOptions.gameHeight); 	
	},
    preload:function(){
        //BACKGROUND
        this.load.image('bg','img/rankingMeme.png');
    },
    create:function(){
        //BACKGROUND
       	this.bg = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/2, 'bg');
        this.bg.anchor.setTo(.5);
        
        //CONTROLS
        this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    update:function(){
        if(this.escKey.isDown){
            platformer.game.state.start('mainMenu');
        }
    }
    
}