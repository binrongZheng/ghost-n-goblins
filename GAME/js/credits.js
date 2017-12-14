var platformer = platformer || {};

platformer.credits={
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setGameSize(gameOptions.gameWidth, gameOptions.gameHeight); 	
	},
    preload:function(){
        //BACKGROUND
        this.load.image('bg','img/creditsMeme.png');
        //FONT
        this.game.load.bitmapFont('gngFont','fonts/gng_font.png','fonts/gng_font.xml');
    },
    create:function(){
        //BACKGROUND
       	//this.bg = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/2, 'bg');
        //this.bg.anchor.setTo(.5);
        this.textSize = 30;
        
        this.textos = this.add.group();
        
        this.madeBy = platformer.game.add.bitmapText(gameOptions.gameWidth/2,  55,  'gngFont', 'MADE BY', this.textSize);
        this.madeBy.tint = '0xc40f0f';
        
        this.pau    = platformer.game.add.bitmapText(gameOptions.gameWidth/2,  5*gameOptions.gameHeight/12,  'gngFont', 'PAU BLANES', this.textSize);
        this.adria  = platformer.game.add.bitmapText(gameOptions.gameWidth/2,  7*gameOptions.gameHeight/12,  'gngFont', 'ADRIA BIARNES', this.textSize);
        this.bing   = platformer.game.add.bitmapText(gameOptions.gameWidth/2,  9*gameOptions.gameHeight/12,  'gngFont', 'ZHENG BINRONG', this.textSize);
        
        this.madeBy.anchor.setTo(   .5);
        this.pau.anchor.setTo(      .5);
        this.adria.anchor.setTo(    .5);
        this.bing.anchor.setTo(     .5);
        this.madeBy.x   = gameOptions.gameWidth/2;
        this.pau.x      = gameOptions.gameWidth/2;
        this.adria.x    = gameOptions.gameWidth/2;
        this.bing.x     = gameOptions.gameWidth/2;
        
        //CONTROLS
        this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    update:function(){
        if(this.escKey.isDown){
            platformer.game.state.start('mainMenu');
        }
    }
    
}