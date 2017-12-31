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
        //FONT
        this.game.load.bitmapFont('gngFont','fonts/gng_font.png','fonts/gng_font.xml');
    },
    create:function(){
        //BACKGROUND
      // 	this.bg = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/2, 'bg');
      //  this.bg.anchor.setTo(.5);
        this.textSize = 30;
        this.rankingSize=20;
        this.textos = this.add.group();

        this.madeBy = platformer.game.add.bitmapText(gameOptions.gameWidth/2,  55,  'gngFont', 'RANKING', this.textSize);
        this.madeBy.tint = '0xc40f0f';
        this.name=[];
        this.score=[];

        if(gameOptions.highScores.length==null){
          for(var i=0;i<10;i++){
            if(i==0)
            this.name[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  (3+i)*gameOptions.gameHeight/14,  'gngFont', 'TOP', this.rankingSize);
            else if(i==1)
            this.name[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  (3+i)*gameOptions.gameHeight/14,  'gngFont', '2nd', this.rankingSize);
            else if(i==2)
            this.name[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  (3+i)*gameOptions.gameHeight/14,  'gngFont', '3rd', this.rankingSize);
            else
            this.name[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  (3+i)*gameOptions.gameHeight/14,  'gngFont', (i+1)+'th', this.rankingSize);
          }
        }
        else{
          for(var i=0;i<gameOptions.highScores.length;i++){
            if(i==0){
            this.name[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  (3+i)*gameOptions.gameHeight/14,  'gngFont', 'TOP '+gameOptions.highScores[i].name, this.rankingSize);
            this.score[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10*5.7,  (3+i)*gameOptions.gameHeight/14, 'gngFont', gameOptions.highScores[i].score, this.rankingSize);
            }
            else if(i==1){
              this.name[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  (3+i)*gameOptions.gameHeight/14,  'gngFont', '2nd '+gameOptions.highScores[i].name, this.rankingSize);
              this.score[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10*5.7,  (3+i)*gameOptions.gameHeight/14,  'gngFont',gameOptions.highScores[i].score, this.rankingSize);
            }
            else if(i==2){
              this.name[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  (3+i)*gameOptions.gameHeight/14,  'gngFont', '3rd '+gameOptions.highScores[i].name, this.rankingSize);
              this.score[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10*5.7,  (3+i)*gameOptions.gameHeight/14,  'gngFont',gameOptions.highScores[i].score, this.rankingSize);
            }
            else{
              this.name[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  (3+i)*gameOptions.gameHeight/14,  'gngFont', (i+1)+'th '+gameOptions.highScores[i].name, this.rankingSize);
              this.score[i]    = platformer.game.add.bitmapText(gameOptions.gameWidth/10*5.7,  (3+i)*gameOptions.gameHeight/14, 'gngFont', gameOptions.highScores[i].score, this.rankingSize);
            }
          }
        }
        /*
        this.first    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  3*gameOptions.gameHeight/14,  'gngFont', 'TOP', this.rankingSize);
        this.second  = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  4*gameOptions.gameHeight/14,  'gngFont', '2nd', this.rankingSize);
        this.third   = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  5*gameOptions.gameHeight/14,  'gngFont', '3rd', this.rankingSize);
        this.four   = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  6*gameOptions.gameHeight/14,  'gngFont', '4rd', this.rankingSize);
        this.five    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  7*gameOptions.gameHeight/14,  'gngFont', '5th', this.rankingSize);
        this.six  = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  8*gameOptions.gameHeight/14,  'gngFont', '6th', this.rankingSize);
        this.seven   = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  9*gameOptions.gameHeight/14,  'gngFont', '7th', this.rankingSize);
        this.eight    = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  10*gameOptions.gameHeight/14,  'gngFont', '8th', this.rankingSize);
        this.nine  = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  11*gameOptions.gameHeight/14,  'gngFont', '9th', this.rankingSize);
        this.ten   = platformer.game.add.bitmapText(gameOptions.gameWidth/10,  12*gameOptions.gameHeight/14,  'gngFont', '10th', this.rankingSize);
*/
        this.madeBy.anchor.setTo( .5);
        //this.first.anchor.setTo(  .5);
        //this.second.anchor.setTo( .5);
        //this.third.anchor.setTo(  .5);
        // this.first.scale.setTo(  .75);
        // this.second.scale.setTo( .75);
        // this.third.scale.setTo(  .75);

        this.madeBy.x   = gameOptions.gameWidth/2;
        // this.first.x      = gameOptions.gameWidth/10;
        // this.second.x    = gameOptions.gameWidth/ 10;
        // this.third.x     = gameOptions.gameWidth/ 10;

        //CONTROLS
        this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    },
    update:function(){
        if(this.escKey.isDown){
            platformer.game.state.start('mainMenu');
        }
    }

}
