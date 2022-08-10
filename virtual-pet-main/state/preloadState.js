var preloadState = {
    init: function(){
        this.game.time.events.add(4000, this.preload, this);
    },
    preload: function() {
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, "preloadBar");
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        
        this.load.image("by", "images/backyard.png");
        this.load.image("ap", "images/apple.png");
        this.load.image("cd", "images/candy.png");
        this.load.image("rt", "images/rotate.png");
        this.load.image("toy", "images/rubber_duck.png");
        this.load.image("ar", "images/arrow.png");
        this.load.spritesheet("pet", "images/pet.png", 97, 83, 5, 1, 1);


    },
    create: function(){
        this.state.start('homeState');
    }
};