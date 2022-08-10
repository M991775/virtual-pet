var bootState = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function (){
        this.load.image("preloadBar", 'images/bar.png');
        this.load.image("logo", 'images/logo.png');
    },
    create: function() {
        this.game.stage.backgroundColor = "#fff";
        this.state.start('preloadState')
    },  
};