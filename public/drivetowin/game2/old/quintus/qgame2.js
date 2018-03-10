(function() {
	Math.clamp = function(a, b, c) {
		return Math.max(b, Math.min(c, a));
	}
})();

var Q = Quintus().include("Sprites, Scenes, Input, UI, 2D")
		.setup("pong", {
			development : true
		}).controls();

var GAME_ASSETS = [ 'https://wakeandwhimsy.files.wordpress.com/2014/01/yarn004_crop.jpg', 'cat-claw.jpg' ];

Q.load(GAME_ASSETS, function() {
	Q.stageScene("level1");
});

Q.scene("level1", function(stage) {
	var ball = stage.insert(new Q.Ball());

	var player = stage.insert(new Q.Paddle());


	// Initialize Q.state
	Q.state.reset({
		score1 : 0,
		score2 : 0
	});

	// Insert HUB since it contains Score.
	stage.insert(new Q.Score());

});

Q.Sprite.extend("Paddle", {
	init : function(p) {
		this._super(p, {
			asset : 'cat-claw.jpg',
			speed : 700,
			sx : 24,
			sy : 130,
			w: 300,
			h: 300,
			scale: 0.1,
			x : 100,
			y : Q.el.height / 2,
			collisionMask : Q.SPRITE_DEFAULT,
			isPlayer : true,
			movementDir : ''
		});
	},

	step : function(dt) {

		if (this.p.isPlayer) {

			if (Q.inputs['down']) {
				this.p.y += (this.p.speed * dt);
				this.p.movementDir = 'down';
			}
			if (Q.inputs['up']) {
				this.p.y -= (this.p.speed * dt);
				this.p.movementDir = 'up';
			}
			
			// Clamp should come last.
			this.p.y = Math.clamp(this.p.y, 0 + (this.p.h / 2), Q.el.height
					- (this.p.h / 2));
		}
	}
});

Q.Sprite.extend("Ball", {
	init : function(p) {
		this._super(p, {
			asset : 'https://wakeandwhimsy.files.wordpress.com/2014/01/yarn004_crop.jpg',
			speed : 300,
			sx : 10,
			sy : 10,
			w: 10,
			h: 10,
			scale: 0.03,
			x : Q.el.width / 2,
			y : Q.el.height / 2,
			xdir : 1,
			ydir : 1,
			collisionMask : Q.SPRITE_DEFAULT
		});

 		this.add("2d");
    	this.on("bump.bottom",this, "collide");

		this.on("hit", this, "collide");
	},

	collide : function(col) {
console.log('collide');
		if (col.obj.isA("Paddle")) {

			this.p.speed += (this.p.speed < 700) ? 20 : 0;

			// Change orientation.
			this.p.xdir = -1 * (this.p.xdir);

			// Change y direction based on paddle motion.
			// This could also be done by paddle/ball collision position.
			if (col.obj.p.movementDir == 'up') {
				this.p.ydir = -1;
			} else if (col.obj.p.movementDir == 'down') {
				this.p.ydir = 1;
			} else {
				this.p.ydir = -1;
			}

			// Give it an exta push to handle jittering.
			this.p.x += this.p.xdir * 10;
			this.p.y += this.p.ydir * 10;
		}
	},

	step : function(dt) {
		
		this.p.x += this.p.speed * this.p.xdir * dt;

		if (this.p.x > Q.el.width) {
			//Q.state.inc("score1", 1);
			//this.destroy();
			//return;
		} else if (this.p.x < 0) {
			Q.state.inc("score2", 1);
			this.destroy();
			Q.clearStages();
			return;
		}
		
		this.p.y += this.p.speed * this.p.ydir * dt;
		
		this.p.y = Math.clamp(this.p.y, 0 + (this.p.h / 2), Q.el.height
				- (this.p.h / 2));
		if (this.p.y >= Q.el.height - 60 || this.p.y <= 60) {
			this.p.ydir = -1 * this.p.ydir;
			this.p.y += (this.p.ydir * 10);
		}
		if (this.p.x >= Q.el.width - 60) {
			this.p.xdir = -1 * this.p.xdir;
			this.p.x += (this.p.xdir * 10);
		}

		this.stage.collide(this);
	}
});






Q.UI.Text.extend("Score", {
	init : function(p) {
		this._super({
			label : "score: " + Q.state.get('score1') + " / "
					+ Q.state.get('score2'),
			x : Q.el.width / 2,
			y : 20
		});

		Q.state.on("change.score1", this, "score1");
		Q.state.on("change.score2", this, "score2");
	},

	score1 : function() {
		this.p.label = "score: " + Q.state.get('score1') + " / "
				+ Q.state.get('score2');
		Q.stage().insert(new Q.Ball());
	},

	score2 : function() {
		this.p.label = "score: " + Q.state.get('score1') + " / "
				+ Q.state.get('score2');
		Q.stage().insert(new Q.Ball());
	}

});