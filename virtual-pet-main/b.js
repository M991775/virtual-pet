var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add("GameState", GameState);
game.state.add("homeState", homeState);
game.state.add("preloadState", preloadState);
game.state.add("bootState", bootState);
game.state.start("bootState");