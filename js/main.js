console.log(Phaser);

//This sets the variable for the spacebar.
var spaceKey;

//This is something my player can stand on.
var ground;
var player;
var obstacle;

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';


//This is the object which runs the game.
//Preload - loading all the assets to the game.
function preload(){
	//console.log ("here");
	game.load.image('background', 'assets/fireworks.png');
	game.load.image('player', 'assets/mickeyplane.png');
	game.load.image('ground', 'assets/wallHorizontal.png');
	game.load.image('obstacle', 'assets/castle1.png');
	//game.stage.backgroundColor = "#c741f4"; 
};


//Adds in the obstacles and characters.
function create(){
	game.physics.startSystem(Phaser.Physics.Arcade);

	game.add.tileSprite(0,0, GAME_WIDTH, GAME_HEIGHT, 'background')


	player = game.add.sprite(game.width/10, game.world.height*7/9, 'player');
	game.physics.arcade.enable(player);

	//ground = game.add.sprite(300, 700, 'ground');
	platforms = game.add.group();
	platforms.enableBody = true
	ground = platforms.create(0, GAME_HEIGHT, 'ground');
	game.physics.arcade.enable(ground);
	ground.body.immovable = true;
	
	ground.anchor.setTo(0,1);
	ground.scale.setTo(4,1);

	obstacle = game.add.sprite(700,game.world.height, 'obstacle'); 
	game.physics.arcade.enable(obstacle);
	obstacle.body.immovable = true;

	obstacle.scale.setTo(1,1); 
	obstacle.anchor.setTo(0,1);
	

	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	player.body.bounce.y = 0.2;
	player.body.gravity.y =600;

	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#f2edf1' });
	TitleText = game.add.text(350,20, "MICKEY'S FLIGHT", { fontSize: '100px', fill: '#f2edf1'});

};

function update(){
	game.physics.arcade.collide(player, obstacle);
	game.physics.arcade.collide(player, ground);

	//titleText.text = ''

	if (spaceKey.isDown){
	player.body.velocity.y = -300;
	}

	if (obstacle.x > 600) {
		obstacle.x -= 0.05;
	}

	if (obstacle.x < 0) {
		obstacle.kill ();
		obstacle = game.add.sprite(950, GAME_HEIGHT, 'obstacle');
		obstacle.scale.setTo(1,1);
		obstacle.anchor.setTo(0,1);
		game.physics.arcade.enable(obstacle);
		obstacle.body.immovable = true;
	};

	if (obstacle.x < 5 && player.x > 5){
		score++;
		scoreText.text = 'score: ' + score;
	};
	
	if (player.x < 5) {
		scoreText = game.add.text(350,200, 'You Lose!', {fill: '#f2edf1'});
		obstacle.kill();
		player.kill();
	};	

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();