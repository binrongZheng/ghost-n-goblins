var platformer = platformer || {};

platformer.spawnZombiePrefab=function(game,x,y, _level){
    
    Phaser.Sprite.call(this,game,x,y,'');
    this.numZombies = game.rnd.integerInRange (2,3);
    this.instantiatedZombies = 0;
    
   
    this.spawnX = x - game.rnd.integerInRange (-30,30);
    this.spawnY = y;
    this.level = _level;
    this.activateSpawn = false;
    this.again = false;
}

platformer.spawnZombiePrefab.prototype=Object.create(Phaser.Sprite.prototype);
platformer.spawnZombiePrefab.prototype.constructor=platformer.spawnZombiePrefab;
platformer.spawnZombiePrefab.prototype.update = function () {
    
    
    //Si el personatge s'appropa s'activa el spawn    
    if (Phaser.Math.difference(this.spawnX,this.level.hero.position.x) < 200 && !this.again){        
        this.activateSpawn = true;
        this.again = true;
    }
    
    //Mentre esta activat fem spawn del numerod e zombies que toqui amb un interval entremig
    if (this.activateSpawn){
    
        this.activateSpawn = false;
        
        //cridem el spawn fins que haguem arrivat al maxim de numZombies
        var timeInter = window.setTimeout(function spawn (){                
            
            var newZombie = new platformer.zombiePrefab(this.level.game,this.spawnX,this.spawnY,this.level);               
            this.level.enemies.add (newZombie);
            this.instantiatedZombies +=1;
            
            //mentre no haguem arrivat al maxim la tornem a cridar
            if (this.instantiatedZombies < this.numZombies) {
               timeInter = window.setTimeout(spawn.bind(this),500);
            }           
           
        }.bind(this), 500);           
        
    }
    
}
 