var platformer = platformer || {};

platformer.loginScene={
    init:function(){
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  		this.scale.pageAlignHorizontally = true;
  		this.scale.pageAlignVertically = true;
  		this.scale.setGameSize(gameOptions.gameWidth, gameOptions.gameHeight);
	},
    preload:function(){
      //FONT
      this.game.load.bitmapFont('gngFont','fonts/gng_font.png','fonts/gng_font.xml');      
        
    },
    create:function(){
        this.textSize = 20;       
        
        //TITOL
        this.enterNameText = platformer.game.add.bitmapText(gameOptions.gameWidth/2,  55,  'gngFont', 'ENTER YOUR USERNAME', this.textSize);                        
                
        this.enterNameText.x   = gameOptions.gameWidth/2 - this.enterNameText.width/2;        
        this.enterNameText.y = 100;
        
        //EL TEXT DEL NOM D'USUARI
        this.userNameText = platformer.game.add.bitmapText(gameOptions.gameWidth/2,  55,  'gngFont', 'AAAAAA', this.textSize);                        
        this.userNameText.size = 15;
        
        this.userNameText.x   = gameOptions.gameWidth/2 - this.userNameText.width/2;        
        this.userNameText.y = 180;
        
        //STRING ON GUARDAR EL NOM D'USUARI
        this.userName = "";       
        
    },
    update:function(){
        
        //agafem el que escrius i afegim lletra o borrem o carguem el menu
        this.game.input.keyboard.onDownCallback = function() {
            
            if (this.game.input.keyboard.event.keyCode == 8 && this.userName.length > 0) //borrar
                this.userName = this.userName.substr(0, this.userName.length-1);
            
            else if (this.game.input.keyboard.event.keyCode == 13 && this.userName.length > 0){ //enter carga escena menu i guarda el nom d'usuari
                gameOptions.userName = this.userName;
                platformer.game.state.start('mainMenu');
            }
            
            else
                this.userName += String.fromCharCode(this.game.input.keyboard.event.keyCode);
            
        }.bind(this);
        //ho pintem
        this.userNameText.setText(this.userName);
        
    }
}