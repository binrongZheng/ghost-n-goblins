var platformer = platformer || {};

platformer.playerBulletPrefab=function(game,x,y,_bullet_type, _level){
    this.bullet_type=_bullet_type;

    this.dmg;
    this.level = _level;
    this.game = game;

    switch(this.bullet_type){
        case 0: Phaser.Sprite.call(this,game,x,y,'arma_lance');this.dmg = 100;this.speed = gameOptions.lanceSpeed;
            break;
        case 1: Phaser.Sprite.call(this,game,x,y,'arma_daga'); this.dmg = 80;this.speed = gameOptions.dagaSpeed;
            break;
        case 2:
            Phaser.Sprite.call(this,game,x,y,'arma_torcha');
            this.dmg = 100;
            this.speed = gameOptions.torchaSpeed;
            this.animations.add('idle', [0,1,2,3],10,true);
            this.animations.play('idle');
            break;
    }
    //DIRECCIO
    this.direction = this.level.hero.scale.x;
    this.scale.x = this.direction;
    this.anchor.setTo(.5);

    //FISIQUES
    game.physics.arcade.enable(this);
	//this.body.collideWorldBounds = true;
    if (this.bullet_type == 2) {
        this.body.velocity.y = -150;
    }else this.body.allowGravity = false;

    this.checkWorldBounds = true;
	this.outOfBoundsKill = true;

    //SO
    this.hitGrave = this.level.add.audio('hitGrave');

};

platformer.playerBulletPrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.playerBulletPrefab.prototype.constructor=platformer.playerBulletPrefab;
platformer.playerBulletPrefab.prototype.update = function () {
    //MOVIMENT
    this.body.velocity.x = this.speed * this.direction;

    //Colisions
    if (this.bullet_type == 2){
        this.game.physics.arcade.collide (this, this.level.platform_collision,function (bullet, platform){
            new platformer.firePrefab(bullet.game, bullet.x, 360, bullet.level);
            bullet.kill();
        });
    }

    this.game.physics.arcade.overlap (this, this.level.enemies,function (bullet, enemy){
        
        if (enemy.frame < 6 || !enemy instanceof platformer.zombiePrefab){ //per no matar el zombie just quan surt
            if(!(enemy instanceof platformer.ghostPrefab)){		//si es un ghost, cridem el metode especial per saber d'on venia la bala
            enemy.hp -= bullet.dmg;
            if(enemy.hp <= 0){
                if(bullet.bullet_type == 2)
                    new platformer.firePrefab(bullet.game, bullet.x, 360, bullet.level);
                enemy.kill();
             }
            }
            else{
                if(bullet.x>enemy.x){
				    enemy.kill();
			     }else{
				    //posar una explosió?
			     }
            }
            
            bullet.kill();
        }
		
    });
    if (Phaser.Math.difference(this.position.x,this.level.hero.position.x) > gameOptions.gameWidth/2){
        this.kill();
    }
    this.game.physics.arcade.overlap (this, this.level.graves,function (bullet, enemy){
        bullet.game.time.events.add(30, function() {
            bullet.level.explosions.add(new platformer.explosionPrefab(bullet.level.game,bullet.x,bullet.y,2, this.level));
            bullet.hitGrave.play();
            bullet.kill();
        }.bind(bullet),bullet);

    });
}
