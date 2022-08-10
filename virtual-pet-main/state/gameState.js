var GameState = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function(){
 
     this.load.image("by", "images/backyard.png");
     this.load.image("ap", "images/apple.png");
     this.load.image("cd", "images/candy.png");
     this.load.image("rt", "images/rotate.png");
     this.load.image("toy", "images/rubber_duck.png");
     this.load.image("ar", "images/arrow.png");
     this.load.spritesheet("pet", "images/pet.png", 97, 83, 5, 1, 1);
 
     
    },
    create: function(){
     this.bg = this.game.add.sprite(0,0,"by");
     this.bg.inputEnabled = true;
     this.bg.events.onInputDown.add(this.placeItem, this);
 
     this.pet = this.game.add.sprite(100, 400, "pet");
     this.pet.anchor.setTo(0.5);
 
     this.pet.animations.add('face', [1,2,3,2,1], 7, false);
 
     this.pet.customParams = {health: 100,fun: 100};
 
     this.pet.inputEnabled = true;
     this.pet.input.enableDrag();
 
     this.ap = this.game.add.sprite(72, 540, "ap");
     this.ap.anchor.setTo(0.5);
     this.ap.inputEnabled = true;
     this.ap.customParams = {health: 20};
     this.ap.events.onInputDown.add(this.pickItem, this);
 
     this.cd = this.game.add.sprite(144, 540, "cd");
     this.cd.anchor.setTo(0.5);
     this.cd.inputEnabled = true;
     this.cd.customParams = {health: -10, fun:10};
     this.cd.events.onInputDown.add(this.pickItem, this);
 
     this.toy = this.game.add.sprite(216, 540, "toy");
     this.toy.anchor.setTo(0.5);
     this.toy.inputEnabled = true;
     this.toy.customParams = {fun:20};
     this.toy.events.onInputDown.add(this.pickItem, this);
 
     this.rt = this.game.add.sprite(288, 540, "rt");
     this.rt.anchor.setTo(0.5);
     this.rt.inputEnabled = true;
     this.rt.events.onInputDown.add(this.rotatePet, this);
 
     this.button = [this.ap, this.cd, this.toy, this.rt];
 
     this.selecteItem = null;
     this.uiBlocked = false;
 
     var style = { font: '20px Arial' , fill: '#fff'};
     this.game.add.text(10, 20, 'Health:', style);
     this.game.add.text(140, 20, "fun:", style);
 
     this.healthText = this.game.add.text(80, 20, "", style);
     this.funText = this.game.add.text(185, 20, "", style);
 
     this.refreshStats();
 
     this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);
    },
    pickItem: function(sprite , event){
        if(!this.uiBlocked){
         console.log("pick item");
         this.clearSelection();
 
         sprite.alpha = 0.4;
 
         this.selectedItem = sprite;
 
         
        }
    },
 
    rotatePet: function(sprite, event){
     if(!this.uiBlocked){
 
         this.clearSelection();
 
         this.uiBlocked = true;
         sprite.alpha = 0.4;
 
         var petRotation = this.game.add.tween(this.pet);
 
         petRotation.onComplete.add(function(){
             this.uiBlocked = false;
 
             sprite.alpha = 1;
 
             this.pet.customParams.fun += 10;
             this.refreshStats();
         }, this);
         petRotation.to({angle: '+720'}, 1000);
         petRotation.start();
        }
 
    },
    clearSelection: function() {
     this.button.forEach(function(element, index){
         element.alpha = 1;
     });
     this.selectedItem = null;
    },
 
    placeItem: function(sprite, event){
        if (this.selectedItem && !this.uiBloeked){
             var x = event.position.x;
             var y = event.position.y;
 
             var newItem = this.game.add.sprite(x, y, this.selectedItem.key);
             newItem.anchor.setTo(0.5);
             newItem.customParams = this.selectedItem.customParams;
 
             this.uiBlocked = true;
 
             var petMovement = this.game.add.tween(this.pet);
             petMovement.to({x:x, y:y}, 700);
             petMovement.onComplete.add(function(){
             newItem.destroy();
 
             this.pet.animations.play('face');
 
             this.uiBlocked = false;
 
 
 
                 var stat;
                 for(stat in newItem.customParams) {
                     if(newItem.customParams.hasOwnProperty(stat)){
                         console.log(stat);
                         this.pet.customParams[stat] += newItem.customParams[stat];
 
                     }
                 }
                 
                 this.refreshStats();
             }, this)
 
             petMovement.start()
             
        }
        
    },
    refreshStats: function() {
      this.healthText.text = this.pet.customParams.health;
      this.funText.text = this.pet.customParams.fun;
    },
 
    reduceProperties: function(){
      this.pet.customParams.health -= 10;
      this.pet.customParams.fun -= 15;
      this.refreshStats();
    },
    update: function(){
      if(this.pet.customParams.health <= 0 || this.pet.customParams.fun <=0){
         this.pet.frame = 4;
         this.uiBlocked = true;
         this.game.time.events.add(2000, this.gameOver, this);
      }
    },
    gameOver: function(){
        this.state.start('homeState', true, false, "GAME OVER!");
    }
 };
 