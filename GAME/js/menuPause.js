var platformer = platformer || {};

platformer.menuPause = function (game,x,y) { 
	Phaser.Sprite.call(this,game,x,y,'menu_pausa'); 
	game.add.existing (this);
	this.anchor.setTo(.5);
    //Phaser.Sprite.call(this,game,x,y,'cursor'); 
   /* this.game.load.bitmapFont('gngFont','fonts/gng_font.png','fonts/gng_font.xml');
    this.buttons = this.add.group();
    this.resumeText = this.game.add.bitmapText(gameOptions.gameWidth/2, 160, 'gngFont', 'RESUME', 24);       
    this.buttons.add(this.playText);
    this.restartText = this.game.add.bitmapText(gameOptions.gameWidth/2, 210, 'gngFont', 'RESTART', 24);
    this.buttons.add(this.rankText);
    this.exitText = this.game.add.bitmapText(gameOptions.gameWidth/2, 260, 'gngFont', 'EXIT', 24);*/
};

platformer.menuPause.prototype = Object.create(Phaser.Sprite.prototype);
platformer.menuPause.prototype.constructor = platformer.menuPause; 

platformer.cursorPrefab = function (game,x,y) { 
	Phaser.Sprite.call(this,game,x,y,'cursor'); 
	game.add.existing (this);
	this.anchor.setTo(.5);
};

platformer.cursorPrefab.prototype = Object.create(Phaser.Sprite.prototype);
platformer.cursorPrefab.prototype.constructor = platformer.cursorPrefab; 
