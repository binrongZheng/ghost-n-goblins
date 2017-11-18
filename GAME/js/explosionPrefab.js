var platformer = platformer || {};

//explosion_type: 0-> zombies/crows, 1-> plantes/, 2->
platformer.explosionPrefab=function(game,x,y,explosion_type){
	switch(explosion_type){
		case 0:
			Phaser.Sprite.call(this,game,x,y,'explosion_normal');
			this.animations.add('normal_anim', [0,1,2,3,4],10,false);
			this.animations.play('normal_anim',17,false,true);
			break;
		case 1:
			Phaser.Sprite.call(this,game,x,y,'explosion_medium');
			this.animations.add('medium_anim', [0,1,2,3,4,5,6,7,8],10,false);
			this.animations.play('medium_anim',17,false,true);
			break;
	}
	
    game.add.existing(this);
    this.anchor.setTo(.5);
};


platformer.explosionPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.explosionPrefab.prototype.constructor=platformer.explosionPrefab;