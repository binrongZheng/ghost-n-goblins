var platformer = platformer || {};

platformer.mainMenu={
    init:function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setGameSize(gameOptions.gameWidth, gameOptions.gameHeight);
	},
    preload:function(){
        //BACKGROUND
        this.load.image('bg','img/MainMenu.png');
        //FONT
        this.game.load.bitmapFont('gngFont','fonts/gng_font.png','fonts/gng_font.xml');

        //INDICADOR DE SELECCIO
        this.load.image('cursor','img/lance.png');

        //VARS DE CANVI DE SELECCIO
        this.buttonIndex = 0;
        this.canChangeSelection = true;
        this.timeCheck = 0;

        //TRIAR DIFICULTAT
        this.chosingDifficulty = false;

    },
    create:function(){
        //BACKGROUND
       	this.bg = this.game.add.sprite(gameOptions.gameWidth/2,gameOptions.gameHeight/2, 'bg');
        this.bg.anchor.setTo(.5);

        //BOTONS NORMALS
        this.buttons = this.add.group();
        this.playText = this.game.add.bitmapText(gameOptions.gameWidth/2, 160, 'gngFont', 'PLAY', 24);
        this.buttons.add(this.playText);
        this.rankText = this.game.add.bitmapText(gameOptions.gameWidth/2, 210, 'gngFont', 'RANKING', 24);
        this.buttons.add(this.rankText);
        this.creditsText = this.game.add.bitmapText(gameOptions.gameWidth/2, 260, 'gngFont', 'CREDITS', 24);
        this.buttons.add(this.creditsText);
        this.diffText = this.game.add.bitmapText(gameOptions.gameWidth/2, 310, 'gngFont', 'OPTIONS', 24);
        this.buttons.add(this.diffText);
        this.exitText = this.game.add.bitmapText(gameOptions.gameWidth/2, 360, 'gngFont', 'EXIT', 24);
        this.buttons.add(this.exitText);

        this.buttons.forEach (function(item){
            item.position.x -= item.width/2;
        });

        //BOTONS DIFICULTAT
        this.diffButtons = this.add.group();
        this.casualText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2 -30, 'gngFont', 'CASUAL', 18);
        this.diffButtons.add(this.casualText);
        this.classicText = this.game.add.bitmapText(gameOptions.gameWidth/2, gameOptions.gameHeight/2, 'gngFont', 'CLASSIC', 18);
        this.diffButtons.add(this.classicText);
        this.nightmareText = this.game.add.bitmapText(gameOptions.gameWidth/2,gameOptions.gameHeight/2 + 30 , 'gngFont', 'NIGHTMARE', 18);
        this.diffButtons.add(this.nightmareText);

        this.diffButtons.forEach (function(item){
            item.position.x -= item.width/2;
            item.visible = false;
        });


        //INDICADOR DE SELECCIO
        this.cursor = this.game.add.image(this.buttons.children[this.buttonIndex].position.x,
                                          this.buttons.children[this.buttonIndex].position.y + this.buttons.children[this.buttonIndex].height/2,
                                          'cursor');
        this.cursor.anchor.setTo(.5);
        this.cursor.position.x -= this.cursor.width;

        //CONTROLS
		this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.escKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        //music-stop
        platformer.tutorial.themeMusic.stop();
        platformer.tutorial.inPlay=false;
    },
    update:function(){

        //WAIT TIME per no moure massa rapid el cursor
        if (!this.canChangeSelection && this.game.time.now - this.timeCheck > 250){
                this.canChangeSelection = true;
        }

        //MOURE CURSOR
        if (!this.chosingDifficulty){

            if(this.cursors.down.isDown && this.canChangeSelection){
                this.buttonIndex = (this.buttonIndex+1)%5;
                //activem el wait
                this.canChangeSelection = false;
                this.timeCheck = this.game.time.now;
                //canviem posicio
                this.cursor.position.x = this.buttons.children[this.buttonIndex].position.x - this.cursor.width;
                this.cursor.position.y = this.buttons.children[this.buttonIndex].position.y + this.buttons.children[this.buttonIndex].height/2;
            }
            if (this.cursors.up.isDown && this.canChangeSelection) {
                this.buttonIndex--;
                if (this.buttonIndex < 0)
                    this.buttonIndex = 4;
                //activem el wait
                this.canChangeSelection = false;
                this.timeCheck = this.game.time.now;
                //canviem posicio
                this.cursor.position.x = this.buttons.children[this.buttonIndex].position.x - this.cursor.width;
                this.cursor.position.y = this.buttons.children[this.buttonIndex].position.y + this.buttons.children[this.buttonIndex].height/2;
            }

            //SELECCIONAR OPCIO
            if (this.enterKey.isDown) {
                switch (this.buttonIndex) {
                    case 0: platformer.game.state.start('tutorial');break;
                    case 1: platformer.game.state.start('ranking');break;
                    case 2: platformer.game.state.start('credits');break;
                    case 3: this.selectedOptions();break;
                    case 4: this.game.destroy();break;
                }
            }
        }
        else{
            if(this.cursors.down.isDown && this.canChangeSelection){
                this.buttonIndex = (this.buttonIndex+1)%3;
                //activem el wait
                this.canChangeSelection = false;
                this.timeCheck = this.game.time.now;
                //canviem posicio
                this.cursor.position.x = this.diffButtons.children[this.buttonIndex].position.x - this.cursor.width;
                this.cursor.position.y = this.diffButtons.children[this.buttonIndex].position.y + this.diffButtons.children[this.buttonIndex].height/2;
            }
            if (this.cursors.up.isDown && this.canChangeSelection) {
                this.buttonIndex--;
                if (this.buttonIndex < 0)
                    this.buttonIndex = 2;
                //activem el wait
                this.canChangeSelection = false;
                this.timeCheck = this.game.time.now;
                //canviem posicio
                this.cursor.position.x = this.diffButtons.children[this.buttonIndex].position.x - this.cursor.width;
                this.cursor.position.y = this.diffButtons.children[this.buttonIndex].position.y + this.diffButtons.children[this.buttonIndex].height/2;
            }
            if (this.enterKey.isDown && this.canChangeSelection) {
                switch (this.buttonIndex) {
                    case 0:
                      console.log(gameOptions.playerLife);
                      gameOptions.playerLife=false;
                      break;
                    case 1:
                      console.log(gameOptions.levelOption);
                      gameOptions.levelOption=3;
                      gameOptions.playerLife=true;
                      break;
                    case 2:
                      console.log(gameOptions.levelOption);
                      gameOptions.levelOption=1;
                      gameOptions.playerLife=true;
                      break;
                }
            }
            if(this.escKey.isDown){
                this.diffButtons.forEach(function(item){item.visible = false;})
                this.buttons.visible = true;
                this.chosingDifficulty = false;
                this.buttonIndex = 0;
                //movem el cursor al primer boto
                this.cursor.position.x = this.buttons.children[this.buttonIndex].position.x - this.cursor.width;
                this.cursor.position.y = this.buttons.children[this.buttonIndex].position.y + this.buttons.children[this.buttonIndex].height/2;
            }
        }

    },
    selectedOptions:function(){
        this.buttons.visible = false;
        this.diffButtons.forEach(function(item){item.visible = true;})
        this.chosingDifficulty = true;
        this.buttonIndex = 0;
        //movem el cursor al primer boto
        this.cursor.position.x = this.diffButtons.children[this.buttonIndex].position.x - this.cursor.width;
        this.cursor.position.y = this.diffButtons.children[this.buttonIndex].position.y + this.diffButtons.children[this.buttonIndex].height/2;
        //activem el wait
        this.canChangeSelection = false;
        this.timeCheck = this.game.time.now;
    }

}
