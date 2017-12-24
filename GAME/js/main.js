var platformer = platformer || {};

var gameOptions = {
		gameWidth:512,
		gameHeight:448,
		level1Height:448,
		level1Width:7168,
	currentScore:0,
    playerLife:true,
    playerGravity:1000,
		playerSpeed:200,
		playerJumpForce:350,
    lanceSpeed:500,
    dagaSpeed:600,
    torchaSpeed:250,
    eyeSpeed:200,
    crowSpeed:170,
    crowXoffset:20,
    crowYoffset:3,
	ghostSpeed:170,
    zombieSpeed: 150,
    levelOption:3,
    lastOption:3,
	tutorialTime:120,
	minTimeGhostSpawn:250,		//mínim de temps entre ghost i ghost
	maxTimeGhostSpawn:1000,		//màxim  "  "  "
	ghostWaitTime:4000,			//temps entre cada serie de 3 fantasmes que apareixen
	ghostSpawnPosY:300,
	forestGhostSpawnTime:300,
	foresGhostSpeed:180,
	distanceToStop:120,
    currentCheckpoint:0,
	platformSpeed:120,
	ciclopWalkSpeed:100,
	ciclopPoints:2000,
    finalBossSpeed:15,
    bossPoints:10000,
    currentLevel:'tutorial',
    userName:''
};

platformer.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

platformer.game.state.add('mainMenu',platformer.mainMenu);
platformer.game.state.add('credits',platformer.credits);
platformer.game.state.add('ranking',platformer.ranking);
platformer.game.state.add('intro_scene',platformer.intro_scene);
platformer.game.state.add('tutorial',platformer.tutorial);
platformer.game.state.add('mapScreen',platformer.mapScreen);
platformer.game.state.add('finalLevel',platformer.finalLevel);
platformer.game.state.add('loginScene',platformer.loginScene);

//platformer.game.state.start('mainMenu');

platformer.game.state.start('loginScene');
