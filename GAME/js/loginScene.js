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
        
        this.advice = platformer.game.add.bitmapText(gameOptions.gameWidth/2,  55,  'gngFont', '(max 6 letters)', this.textSize);                        
        
        this.advice.tint = '0xc40f0f';
        this.advice.size = 10;
        this.advice.x   = gameOptions.gameWidth/2 - this.advice.width/2;        
        this.advice.y = 130;
        
        //EL TEXT DEL NOM D'USUARI
        this.userNameText = platformer.game.add.bitmapText(gameOptions.gameWidth/2,  55,  'gngFont', 'AAAAAA', this.textSize);                        
        this.userNameText.size = 15;
        
        this.userNameText.anchor.setTo(   .5);
        this.userNameText.x   = gameOptions.gameWidth/2;        
        this.userNameText.y = 195;
        
        //STRING ON GUARDAR EL NOM D'USUARI
        this.userName = "ARTHUR";
        this.blinkEvent = this.game.time.events.loop(Phaser.Timer.SECOND/3,this.nameBlink,this);
        
        //CONTROLS
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },
    update:function(){
        
        //agafem el que escrius i afegim/borrem lletra
        this.game.input.keyboard.onDownCallback = function() {  //Get ready for some "discípulo de Radev" Action:
            
            if (this.userName == "ARTHUR"){ //la primera vegada hem de netejar el string i parar el blink
                this.userName = String.fromCharCode(this.game.input.keyboard.event.keyCode);                
                this.game.time.events.remove(this.blinkEvent);
                this.userNameText.alpha = 1;
            }
            
            else if (this.game.input.keyboard.event.keyCode == 8 && this.userName.length > 0)       // No tens en compte el enter!
                this.userName = this.userName.substr(0, this.userName.length-1);          
            
            else if (this.userName.length  < 6)
                this.userName += String.fromCharCode(this.game.input.keyboard.event.keyCode);       //Pot ser problemàtic pq estàs afegint tots els símbols (que no es poden veure però estan a la string. I si poses un " segurament et carregues les partides guardades)
            
        }.bind(this);
        
        //ho pintem
        this.userNameText.setText(this.userName); 
        
        if(this.enter.isDown && this.userName.length > 0){
            if(this.userName.length == 1 && this.userName.charCodeAt(0) == 13){       //BUGFIX TEMPORAL---------- 
                //(si hem apretat enter hi haurà el caracter 13)
                this.userName = "ARTHUR";
            }
             gameOptions.userName = this.userName;                
             platformer.game.state.start('mainMenu');
        }
        
        
    },
    nameBlink:function(){
        if(this.userNameText.alpha == 0){
		this.userNameText.alpha = 0.8;
	}
	else {
		this.userNameText.alpha = 0;
	}
    }
}