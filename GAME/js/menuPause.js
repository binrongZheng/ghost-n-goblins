var platformer = platformer || {};

platformer.menuPause = function (game,x,y) {
	Phaser.Sprite.call(this,game,x,y,'menu_pausa');
	game.add.existing (this);
	this.anchor.setTo(.5);
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
