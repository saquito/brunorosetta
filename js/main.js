// 1 - Start enchant.js
enchant();
 
 // SceneGame  
var SceneGame = Class.create(Scene, {
     // The main gameplay scene.     
    initialize: function() {
        var game, label, bg;
 
        // 1 - Call superclass constructor
        Scene.apply(this);
        // 2 - Access to the game singleton instance
        game = Game.instance;
		
		game.keybind(65, 'left');
		game.keybind(68, 'right');
		game.keybind(87, 'up');
		game.keybind(83, 'down');
		game.keybind(69, 'rotcw');
		game.keybind(81, 'rotccw');
		game.keybind(90, 'zoomin');
		game.keybind(88, 'zoomout');
        // 3 - Create child nodes
        label = new Label("Hi, Ocean!");        
        bg = new Sprite(1024,768);
        bg.image = game.assets['res/starback2.gif'];
		comet = new Comet(357,313);
		rosetta = new Rosetta(190,300);
        // 4 - Add child nodes        
        this.addChild(bg);        
        this.addChild(label);
		this.addChild(comet);
		this.addChild(rosetta);
    }
});


// Rosetta
var Rosetta = Class.create(Sprite, {
	// The player character.	
	initialize: function() {
	// 1 - Call superclass constructor
	Sprite.apply(this,[815, 375]);
	this.image = Game.instance.assets['res/rosettabruno.png'];
	// 2 - Animate
	this.animationDuration = 0;
	this.zoom = 0.2;
	this.xspeed = 0;
	this.yspeed = 0;
	this.rotspeed = 0;
	this.scale(this.zoom,this.zoom);
	this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
	},
	updateAnimation: function (evt) {
		var game = Game.instance;	
		this.animationDuration += evt.elapsed * 0.0002;       
		if (this.animationDuration >= 0.25) {
			this.frame = (this.frame + 1) % 2;
			this.animationDuration -= 0.25;
		}
		if(game.input.left && !game.input.right){
			this.xspeed -= 0.1;
		}
		else if(game.input.right && !game.input.left){
			this.xspeed += 0.1;
		}
		else if(game.input.up && !game.input.down){
			this.yspeed -= 0.1;
		}
		else if(game.input.down && !game.input.up){
			this.yspeed += 0.1;
		}
		else if(game.input.rotcw && !game.input.rotccw){
			this.rotspeed += 0.1;
		}
		else if(game.input.rotccw && !game.input.rotcw){
			this.rotspeed -= 0.1;
		}
		else if(game.input.zoomin && !game.input.zoomout){
			this.scale(1.01,1.01);
		}
		else if(game.input.zoomout && !game.input.zoomin){
			this.scale(0.99,0.99);
		}
		this.y += this.yspeed;
		this.x += this.xspeed;
		this.rotate(this.rotspeed)
	}
});

var Comet = Class.create(Sprite, {
	// The player character.	
	initialize: function(rosetta) {
	// 1 - Call superclass constructor
	Sprite.apply(this,[357, 313]);
	this.rosetta = rosetta;
	this.image = Game.instance.assets['res/comet.png'];
	// 2 - Animate
	this.x = 600;
	this.y = 350;
	this.animationDuration = 0;
	this.zoom = 1;
	this.xspeed = 0;
	this.yspeed = 0;
	this.rotspeed = 0.1;
	this.scale(this.zoom,this.zoom);
	this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
	},
	updateAnimation: function (evt) {
		// var game = Game.instance;	
		// this.animationDuration += evt.elapsed * 0.0002;       
		// if (this.animationDuration >= 0.25) {
			// this.frame = (this.frame + 1) % 2;
			// this.animationDuration -= 0.25;
		// }
		// if(game.input.left && !game.input.right){
			// this.xspeed -= 0.1;
		// }
		// else if(game.input.right && !game.input.left){
			// this.xspeed += 0.1;
		// }
		// else if(game.input.up && !game.input.down){
			// this.yspeed -= 0.1;
		// }
		// else if(game.input.down && !game.input.up){
			// this.yspeed += 0.1;
		// }
		// else if(game.input.rotcw && !game.input.rotccw){
			// this.rotspeed += 0.1;
		// }
		// else if(game.input.rotccw && !game.input.rotcw){
			// this.rotspeed -= 0.1;
		// }
		// else if(game.input.zoomin && !game.input.zoomout){
			// this.scale(1.01,1.01);
		// }
		// else if(game.input.zoomout && !game.input.zoomin){
			// this.scale(0.99,0.99);
		// }
		this.y += this.yspeed;
		this.x += this.xspeed;
		this.rotate(this.rotspeed)
	}
});


// 2 - On document load 
jugar = function() {
	// 3 - Starting point
	var game = new Game(1024, 768);
	// 4 - Preload resources
	game.preload('res/starback2.gif','res/rosettabruno.png','res/comet.png');
	// 5 - Game settings
	game.fps = 30;
	game.scale = 1;
	game.onload = function() {
		// Once Game finishes loading
		console.log("Hi, Ocean!");
		var scene = new SceneGame();
		game.pushScene(scene);
	};
	game.start();
};