// assignment 3

// game state
let state = 0;
let level = 1;
let loadedIn_lvl_1 = false;
let lvl1_end = false;

let loadedIn_lvl_2 = false;
let lvl2_end = false;

let loadedIn_lvl_3 = false;
let lvl3_end = false;

let loadedIn_lvl_4 = false;
let lvl4_end = false;

let loadedIn_lvl_5 = false;
let lvl5_end = false;

let logo;		// this is gonna hold the game logo for the start screen

// artwork for our background layers
let artworkLayer01;
let artworkLayer02;
let artworkLayer03;
let artworkLayer04;

// backgrounds for level 2
let artworkLayer01_b;
let artworkLayer02_b;
let artworkLayer03_b;
let artworkLayer04_b;

// backgrounds for level 3
let artworkLayer01_c;
let artworkLayer02_c;
let artworkLayer03_c;
let artworkLayer04_c;

// inter-level labels
let level_frame_count = 0;
let intro_image;
let level1_label;
let level2_label;
let level3_label;
let level4_label;
let win_screen;
let game_over;

// artwork for our main character
//walking
let cat_standing;
let cat_right_step;
let cat_left_step;
let cat_walking_array;
let walking_array_counter = 0;

// crouching
let crouch1;
let crouch2;
let crouch3;
let crouch4;
let cat_crouching_array;
let crouching_array_counter = 0;

// jumping
let jump1;
let jump2;
let cat_jumping_array;
let jumping_array_counter = 0;

// taking damage
let damaged_cat1;
let damaged_cat2;
let cat_damage_array;
let damage_array_counter = 0;
let cat_hit = false;

// progress variables
let hearts = 3;				//  could have a higher number of hearts in easy 
let coins = 0;

// jump variables
let floor = 390;
let jumpMode = false;
let jumpPower = 0;
const gravity = 0.15;

// sword variables
let sword1;
let sword2;
let sword3;
let sword4;
let cat_sword_array;
let sword_array_counter = 0;
let sword_being_swung = false;
// let cat_in_action = false;

// moths
let total_moths_per_level;
let current_moth_index = 0;
let moth_array = [];
// artwork for the moths
let moth_fly_1;
let moth_fly_2;
let moth_fly_3;
let moth_fly_array;
let moth_fly_counter = 0;
// sword moth artwork
let sword_moth_array = [];
let sword_moth_1;
let sword_moth_2;
let sword_moth_3;

// damaged moth
let damaged_moth;
let moth_damage_array;
let moth_damage_array_counter = 0;
let moth_hit = false;

// sounds 
let slash;


function preload(){
	// load art files here

	logo = loadImage('../sword_master_ii.png');
	// backgrounds
	artworkLayer01 = loadImage('level1_backgrounds/layer01.png');
	artworkLayer02 = loadImage('level1_backgrounds/layer02.png');
	artworkLayer03 = loadImage('level1_backgrounds/layer03.png');
	artworkLayer04 = loadImage('level1_backgrounds/layer04.png');

	// level 2 backgrounds
	artworkLayer01_b = loadImage('level2_backgrounds/pink_sky.png');
	artworkLayer02_b = loadImage('level2_backgrounds/mountains_loopable.png');
	artworkLayer03_b = loadImage('level2_backgrounds/pine_trees_blue.png');
	artworkLayer04_b = loadImage('level2_backgrounds/tree_silhouettes.png');

	// level 3 backgrounds
	artworkLayer01_c = loadImage('level3_backgrounds/Background.png');
	artworkLayer02_c = loadImage('level3_backgrounds/fully_attached.png');
	artworkLayer03_c = loadImage('level3_backgrounds/cave_partially_attached.png');
	artworkLayer04_c = loadImage('level3_backgrounds/top_bottom_stalgs.png');

	// inter-level labels
	intro_image = loadImage('inter_level_labels/intro.png');
	level1_label = loadImage('inter_level_labels/level_1.png');
	level2_label = loadImage('inter_level_labels/level_2.png');
	level3_label = loadImage('inter_level_labels/level_3.png');
	level4_label = loadImage('inter_level_labels/sword_message.png');
	win_screen = loadImage('inter_level_labels/you_win.png');
	game_over = loadImage('inter_level_labels/game_over.png');

	// main character frames
	cat_standing = loadImage('cat_images/cat_standing.png');
	cat_right_step = loadImage('cat_images/right_step_cat.png');
	cat_left_step = loadImage('cat_images/cat_left_step.png');

	// main character crouching frames
	crouch1 = loadImage('cat_images/crouch1.png');
	crouch2 = loadImage('cat_images/crouch2.png');
	crouch3 = loadImage('cat_images/crouch3.png');
	crouch4 = loadImage('cat_images/crouch4.png');

	// main character jumping frames
	jump1 = loadImage('cat_images/jump1.png');
	jump2 = loadImage('cat_images/jump2.png');

	// main character damaged frames
	damaged_cat1 = loadImage('cat_images/damaged_cat1.png');
	damaged_cat2 = loadImage('cat_images/damaged_cat2.png');

	// main character sword frames
	sword1 = loadImage('cat_images/sword1.png');
	sword2 = loadImage('cat_images/sword2.png');
	sword3 = loadImage('cat_images/sword3.png');
	sword4 = loadImage('cat_images/sword4.png');

	// swordless moth flying frames
	moth_fly_1 = loadImage('moth_images/moth_fly_1.png');
	moth_fly_2 = loadImage('moth_images/moth_fly_2.png');
	moth_fly_3 = loadImage('moth_images/moth_fly_3.png');

	// moth with sword flying frames
	sword_moth_1 = loadImage('moth_images/sword_moth_left_1.png');
	sword_moth_2 = loadImage('moth_images/sword_moth_left_2.png');
	sword_moth_3 = loadImage('moth_images/sword_moth_left_3.png');

	// damaged swordless moth frames
	damaged_moth = loadImage('moth_images/damaged_moth.png');

	//sound
	slash = loadSound("slash.mp3");
}

function play_and_pause(){
	// 0 = game start

	// 1 = game play
		// set state to play onClick
		// everything in the old draw function
		// all of the game levels are run in this function ...
		// ... differentiated by using 'level' to change backgrounds

	// 2 = pause mode
	// 3 = game lost

	if (state == 0) {			// start screen 
		// switch to state 1, play mode
		state = 1;
	}
	else if (state == 1) {		// in play mode
		// switch to pause mode
		state = 2;
	}

	else {						// from pause --> play
		state = 1;				
	}
	

}
// function showLevelLabel(){
// 	console.log("showing image");
// 	state = 0;

// 	// image(intro_image, 0, 0, width, height);
// 	setInterval(function(){
// 	    image(intro_image, 0, 0, width, height);
// 	},8000);
// 	console.log(int(state));
// 	state = 1;
// 	console.log(int(state));

// }


function levelOne(){
	console.log("level 1");
	level = 1;

	// layer4 = new Layer(0, 0, width, height, 5, intro_image);
	



	// update number of moths
	current_moth_index = 0;
	total_moths_per_level = 6;		// actual : 6
	// console.log("total_moths_per_level"+total_moths_per_level);

	layer1 = new Layer(0, -10, width, height, 0, artworkLayer01);
	// the 'b' layers are the duplicate layers that will appear second

	layer2 = new Layer(0, -10, width, height, 2, artworkLayer02);
	layer2_b = new Layer(500, -10, width, height, 2, artworkLayer02);

	layer3 = new Layer(0, 0, width, height-80, 4, artworkLayer03);
	layer3_b = new Layer(500, 0, width, height-80, 4, artworkLayer03);

	layer4 = new Layer(0, 390, width, height-390, 5, artworkLayer04);			// runner floor
	layer4_b = new Layer(500, 390, width, height-390, 5, artworkLayer04);

	layer6 = new Layer(0, 25, width, height-25, 0, intro_image);

	// pick type of moth

}

function levelTwo(){
	console.log("level 2");
	level = 2;

	// update number of moths
	current_moth_index = 0;
	total_moths_per_level = 8;		// actual :12
	// console.log("total_moths_per_level"+total_moths_per_level);

	layer1 = new Layer(0, -10, width, height, 0, artworkLayer01_b);
	// the 'b' layers are the duplicate layers that will appear second

	layer2 = new Layer(0, 140, width+5, height-200, 2, artworkLayer02_b);			// prev width+150
	layer2_b = new Layer(500, 140, width+5, height-200, 2, artworkLayer02_b); // prev x1= +145

	layer3 = new Layer(0, 240, width, height-340, 4, artworkLayer03_b);
	layer3_b = new Layer(500, 240, width, height-340, 4, artworkLayer03_b);

	layer4 = new Layer(0, 0, width, height-100, 5, artworkLayer04_b);			
	layer4_b = new Layer(495, 0, width+20, height-100, 5, artworkLayer04_b);

	layer5 = new Layer(0, 390, width, height-390, 5, artworkLayer04);			// runner floor
	layer5_b = new Layer(500, 390, width, height-390, 5, artworkLayer04);

	layer6 = new Layer(0+90, 60, width-170, height-220, 0, level2_label);
	
	// pick type of moth

}

function levelThree(){
	console.log("level 3");
	level = 3;

	// update number of moths
	current_moth_index = 0;
	total_moths_per_level = 10;

	// change these later 
	layer1 = new Layer(0, -10, width, height, 0, artworkLayer01_c);
	// the 'b' layers are the duplicate layers that will appear second

	layer2 = new Layer(0, -10, width, height, 2, artworkLayer02_c);
	layer2_b = new Layer(500, -10, width, height, 2, artworkLayer02_c);

	layer3 = new Layer(0, 0, width, height, 4, artworkLayer03_c);
	layer3_b = new Layer(500, 0, width, height, 4, artworkLayer03_c);

	layer4 = new Layer(0, 0, width, height, 5, artworkLayer04_c);			
	layer4_b = new Layer(500, 0, width, height, 5, artworkLayer04_c);

	layer5 = new Layer(0, 390, width, height-390, 5, artworkLayer04);			// runner floor
	layer5_b = new Layer(500, 390, width, height-390, 5, artworkLayer04);

	layer6 = new Layer(0+90, 60, width-170, height-220, 0, level3_label);
}

function levelFour(){
	console.log("level 4, start");
	level = 4;

	// update number of moths
	current_moth_index = 0;
	total_moths_per_level = 1;		

	// change these later 
	layer1 = new Layer(0, -10, width, height, 0, artworkLayer01_c);
	// the 'b' layers are the duplicate layers that will appear second

	layer2 = new Layer(0, -10, width, height, 2, artworkLayer02_c);
	layer2_b = new Layer(500, -10, width, height, 2, artworkLayer02_c);

	layer3 = new Layer(0, 0, width, height, 4, artworkLayer03_c);
	layer3_b = new Layer(500, 0, width, height, 4, artworkLayer03_c);

	layer4 = new Layer(0, 0, width, height, 5, artworkLayer04_c);			
	layer4_b = new Layer(500, 0, width, height, 5, artworkLayer04_c);

	layer5 = new Layer(0, 390, width, height-390, 5, artworkLayer04);			// runner floor
	layer5_b = new Layer(500, 390, width, height-390, 5, artworkLayer04);

	layer6 = new Layer(0, 100, width, height-100, 0, level4_label);				// sword message


}

function levelFive(){
	console.log("you win!! :)");
	level = 5;
	layer6 = new Layer(0, 0, width, height, 0, win_screen);
}

function gameOver(){
	console.log("you lost :(");
	gameStart();
	
	state = 3;
	console.log(int(state));
	// image(game_over, 0, 0, width, height);
	// layer6 = new Layer(0, 0, width, height, 0, game_over);
}

function newMoth(){
	let temp = new Moth(width+250, random(290, 330), 50, 50, 2, moth_fly_1);
	moth_array.push( temp );
}



function setup(){
	let cnvas = createCanvas(500,500);
	cnvas.parent('#canvas_container');

	frameRate(60);

	// local storage 
	player_level = window.localStorage.getItem('level');

	if (level == null) {
	    window.localStorage.setItem('level', 1);
	    level = 1;
	}
	else {
	    level = int(level);
	}

	cat = new MainCharacter(50, 312, 55, 80, cat_standing);

}

function draw(){

	if (state == 0) {
		gameStart();
	}
	else if (state == 1) {
		gamePlaying();
	}
	else {
		paused();
	}
}

function gameStart(){
	background(0,100,0,0.5);
	image(logo, 0, 200, 500, 100);
	// fill(0);
	// stroke(0);
	fill(255);
	text("Click Play to Start!", 200, 380); // this is temp

}

function gamePlaying() {	
	background(128);

	if (int(hearts) <= 0){
		gameOver();
		// layer6 = image(game_over, 0, 0);
		// console.log("game over, wait for frame");
		// console.log("frame count:"+int(level_frame_count));

		// if (level_frame_count > 30){	
		// 	state = 0;
		// }
	}

	// choose which level features we're loading in
	// level 1
	if ((loadedIn_lvl_1 == false) && (loadedIn_lvl_2 == false)){			
		console.log("level 1 start");
		levelOne();
		loadedIn_lvl_1 = true;			
	}
	// level 2
	else if((loadedIn_lvl_1 == true) && (loadedIn_lvl_2 == false) && (lvl1_end == true)){		
	// we've already played level 1 and haven't played level 2
		console.log("level 2 start");
		levelTwo();
		loadedIn_lvl_2 = true;
	}
	// level 3
	else if ((loadedIn_lvl_1 == true) && (loadedIn_lvl_2 == true) 
				&& (lvl1_end == true) && (lvl2_end == true) && (loadedIn_lvl_3 == false)){
		console.log("level 3 start");
		levelThree();
		loadedIn_lvl_3 = true;
	}
	// level 4 --> final moth screen
	else if ((loadedIn_lvl_1 == true) && (loadedIn_lvl_2 == true) && (loadedIn_lvl_3 == true)
				&& (lvl1_end == true) && (lvl2_end == true) && (lvl3_end == true) 
				&& (loadedIn_lvl_4 == false)){
		console.log("level 4 start");
		levelFour();
		loadedIn_lvl_4 = true;

	}
	// level 5 --> end game screen
	else if ((loadedIn_lvl_1 == true) && (loadedIn_lvl_2 == true) 
				&& (loadedIn_lvl_3 == true) && (loadedIn_lvl_4 == true)
				&& (lvl1_end == true) && (lvl2_end == true) 
				&& (lvl3_end == true) && (lvl4_end == true) 
				&& (loadedIn_lvl_5 == false)){
		console.log("level 5 start");
		levelFive();
		loadedIn_lvl_5 = true;

	}


	layer1.display();

	layer2.display();
	layer2_b.display();

	layer3.display();
	layer3_b.display();

	layer4.display();
	layer4_b.display();

	if ((lvl1_end == true)){	//  && (level == 2) && (loadedIn_lvl_2 == true)
		layer5.display();
		layer5_b.display();
	}

	layer2.move();
	layer3.move();
	layer4.move();

	layer2_b.move();
	layer3_b.move();
	layer4_b.move();

	if ((lvl1_end == true)){	//  && (level == 2) && (loadedIn_lvl_2 == true)
		layer5.move();
		layer5_b.move();
	}

	fill(200);
	text("coins: "+ coins, 400, 40);
	text("hearts: "+ hearts, 400, 60);

	text("Use the ARROW KEYS to Jump, Crouch, and Run", 120, 465);
	text("Use the LEFT ARROW to swing your Sword", 140, 485);

	if (frameCount%60 == 0){
		level_frame_count += 1;
	}

	// level_frame_count = int(frameCount);
	// console.log("level frame count: "+ int(level_frame_count));

	if (level_frame_count < 4){				// i need params for levels 2 and 3 
		// console.log("i hope this works");
		layer6.display();
	}



	// image(intro_image, 0, 0, width, height);

	// display cat
	cat_walking_array = [cat_left_step, cat_left_step, cat_left_step, cat_left_step, 
						cat_left_step, cat_left_step, cat_left_step, cat_left_step, 
						cat_standing, cat_standing, cat_standing, cat_standing, 
						cat_standing, cat_standing, cat_standing, cat_standing, 
						cat_right_step, cat_right_step, cat_right_step, cat_right_step, 
						cat_right_step, cat_right_step, cat_right_step, cat_right_step, 
						cat_standing, cat_standing, cat_standing, cat_standing, 
						cat_standing, cat_standing, cat_standing, cat_standing];

	// 4*2 for each position * 7 different positions --> 8*7 = 56 - 16 = 40
	cat_crouching_array = [crouch3, crouch4, crouch3,  crouch4, 
							crouch3, crouch4, crouch3,  crouch4,
							// after 8
							crouch3, crouch4, crouch3,  crouch4, 
							crouch3, crouch4, crouch3,  crouch4,
							crouch3, crouch4, crouch3,  crouch4, 
							crouch3, crouch4, crouch3,  crouch4, 
							crouch3, crouch4, crouch3,  crouch4, 
							crouch3, crouch4, crouch3,  crouch4,
							crouch3, crouch4, crouch3,  crouch4, 
							crouch3, crouch4, crouch3,  crouch4];


	// 4 * 5 --> 20
	cat_jumping_array = [cat_left_step, jump1, jump1, jump1,
						// y-20, >=5 || <9
						jump1, jump1, jump2, jump2, 
						// y-20, >=9 || <13
						jump2, jump2, jump2, jump2, 
						// y+20
						jump2, jump2, jump1, jump1,
						// y+20
						jump1, jump1, jump1, cat_right_step];

	// 4*3 = 12 frames
	cat_damage_array = [damaged_cat1, damaged_cat1, damaged_cat1, damaged_cat1, 
						damaged_cat2, damaged_cat2, damaged_cat2, damaged_cat2,
						damaged_cat1, damaged_cat1, damaged_cat1, damaged_cat1];

	// 4*5 = 20
	cat_sword_array = [sword1, sword1, sword2, sword2, 
						sword2, sword2, sword3, sword3, // 0-6 @55
						// 9 to 24
						sword3, sword3, sword4, sword4, 
						//sword4, sword4, sword4, sword4, 
						sword4, sword4, sword3, sword3,
						sword2, sword2, sword2, sword1];	// 7-16 @55+30
						//sword2, sword2, sword2, sword1];

	cat.display();


	// 4 * 9 
	moth_fly_array = [moth_fly_1, moth_fly_1, moth_fly_1, moth_fly_1, 
						moth_fly_2, moth_fly_2, moth_fly_2, moth_fly_2, 
						moth_fly_2, moth_fly_2, moth_fly_2, moth_fly_2, 

						moth_fly_3, moth_fly_3, moth_fly_3, moth_fly_3,
						moth_fly_3, moth_fly_3, moth_fly_3, moth_fly_3,
						moth_fly_3, moth_fly_3, moth_fly_3, moth_fly_3, 

						moth_fly_2, moth_fly_2, moth_fly_2, moth_fly_2,
						moth_fly_2, moth_fly_2, moth_fly_2, moth_fly_2,
						moth_fly_1, moth_fly_1, moth_fly_1, moth_fly_1]; 

	// 4*3 = 12 frames
	moth_damage_array = [damaged_moth, damaged_moth, damaged_moth, damaged_moth,
						moth_fly_2, moth_fly_2, moth_fly_2, moth_fly_2,
						damaged_moth, damaged_moth, damaged_moth, moth_fly_2];

	// 4 * 9 
	sword_moth_array = [sword_moth_1, sword_moth_1, sword_moth_1, sword_moth_1,
						sword_moth_2, sword_moth_2, sword_moth_2, sword_moth_2,
						sword_moth_2, sword_moth_2, sword_moth_2, sword_moth_2,

						sword_moth_3, sword_moth_3, sword_moth_3, sword_moth_3,
						sword_moth_3, sword_moth_3, sword_moth_3, sword_moth_3,
						sword_moth_3, sword_moth_3, sword_moth_3, sword_moth_3,

						sword_moth_3, sword_moth_3, sword_moth_2, sword_moth_2,
						sword_moth_2, sword_moth_2, sword_moth_2, sword_moth_2,
						sword_moth_2, sword_moth_2, sword_moth_1, sword_moth_1];

	// create moth array
	console.log(int(current_moth_index));
	if((frameCount%120==0) && (current_moth_index < total_moths_per_level)){
	    newMoth();
	    current_moth_index++;
	}

	// display the moths
	for (let i = 0; i<moth_array.length; i++){
		moth_array[i].display();
	}

	cat.move();


	for (let i = 0; i<moth_array.length; i++){
		moth_array[i].move();
	}
	
	if (level == 5){
		layer6.display();
		fill(255);
		textSize(60);
		text(int(coins), 400, 270);
	}
	
}	


function paused() {
	background(0);
	fill(255);
	// stroke(255);
	textSize(18);
	text("PAUSED", 210, 230) 
	text("click PLAY to Continue", 170, 250);

	if (state == 3){
		image(game_over, 0, 0, width, height);
	}
}

function levelOver(){
	if (level == 4){
		lvl4_end = true;
		level = 5;							
	}
	else if (level == 3){
		lvl3_end = true;
		level = 4;							
	}
	else if (level == 2){
		lvl2_end = true;
		level = 3;							
	}
	else if (level == 1){
		lvl1_end = true;
		level = 2;
	}
	level_frame_count = 0;
	console.log("reset frame count");
	console.log("level "+ int(level));
}



class Layer{
	constructor(x, y, width, height, speed, artwork){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.artwork = artwork;
	}
	display(){
		// console.log("hellooooo");
		image(this.artwork, this.x, this.y, this.width, this.height);
	}

	move(){
		// check if the background has gone out of bounds on the left side
		// console.log("layer movement");
		if(this.x <= -500){
			// console.log("this.x out of bounds"+int(this.x));
			this.x = 500;
		}
		if (keyIsDown(RIGHT_ARROW)){
			// console.log("this.x"+int(this.x));
			this.x -= this.speed;

		}

	}
}

function crouch(){
	if(cat.crouching == false){
		cat.width = 55+10;
		cat.height = 50;
		cat.y = 312+30;
		cat.artwork = cat_crouching_array[crouching_array_counter];
		cat.crouching = true;

		if (frameCount%10==0){
			// console.log("crouch");
			crouching_array_counter ++;
		    cat.artwork = cat_crouching_array[crouching_array_counter];
		    

		    if (crouching_array_counter >= 39){
		    	// console.log("end");
		    	crouching_array_counter = 0; 
		    }
		}
	} 
	cat.crouching = false;
}

function sword_swing(){
	if(cat.slashing == false){
		cat.width = 55;
		cat.height = 80;
		sword_being_swung = true;
		// console.log("inside the sword_swing() function");
    
	} 
}

class MainCharacter{
	constructor(x, y, width, height, artwork){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height; 
		// this.speed = speed;
		this.artwork = artwork;
		this.jumping = false;
		this.crouching = false;
		this.slashing = false;
	}
	display(){
		// console.log("hellooooo");
		image(this.artwork, this.x, this.y, this.width, this.height);
	}
	move(){
		if (keyIsDown(RIGHT_ARROW)){
			// reset size and position
			this.width = 55;
			this.height = 80;
			this.y = 312;
			// change artwork to the ith element of the array
			this.artwork = cat_walking_array[walking_array_counter];
			walking_array_counter += 1;
			if (walking_array_counter >= 32){
				walking_array_counter = 0;
			}

		}
		if (keyIsDown(DOWN_ARROW)){
			if (this.crouching == false){
				crouch();

			}
		}

		if (keyIsDown(LEFT_ARROW)){	
			if (this.slashing == false){
				console.log("slash start");
				sword_swing();
			}
		}

		if (sword_being_swung == true){
			// console.log("inside sword_being_swung");
			// iterate through sword array
			

			if ((sword_array_counter > 6) && (sword_array_counter < 16)){				// 7-22 
				// @55+30
				this.width = 55+30;
			}

			if ((sword_array_counter <= 6) || (sword_array_counter >= 16)){
				this.width = 55;
			}

		    if (sword_array_counter >= 19){
		    	this.width = 55;
		    	// console.log("end");
		    	sword_array_counter = 0; 
		    	sword_being_swung = false;
		    	cat.slashing = false;
		    	// console.log("sword being swung is false");
		    }

		    if (frameCount%2==0){
				// move to next frame
				// console.log("incrementing the sword array: " + int(sword_array_counter));
				sword_array_counter ++;
			    cat.artwork = cat_sword_array[sword_array_counter];
			}
		}

		if (keyIsDown(UP_ARROW) && jumpMode == false){	
			this.width = 55;
			this.height = 80;
			this.y = 312;
			jumpMode = true;
    		jumpPower = -5;

		}
		if (jumpMode){
			this.y += jumpPower;
			jumpPower += gravity;

			// change artwork
			this.artwork = cat_jumping_array[jumping_array_counter];
			jumping_array_counter += 1;

			if (jumping_array_counter >= 19){
				// this.y = 312;
				jumping_array_counter = 0;
			}

			if (this.y >= floor-this.height){
				// console.log('hit the floor');
				jumpMode = false;
      			jumpPower = 0;

      			this.y = floor-this.height;

			}
		}
	}
}



class Moth {
	constructor(x, y, width, height, speed, artwork){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height; 
		this.speed = speed;
		this.artwork = artwork;
	}
	display(){
		// check if moth is out of bounds
		if (this.x < -10){
			moth_array.splice(this, 1);

			if (moth_array.length == 0){
				console.log("end of level "+ int(level));
				levelOver();
			}
		}

		image(this.artwork, this.x, this.y, this.width, this.height);
	}
	move(){
		if (level != 4){
			this.artwork = moth_fly_array[moth_fly_counter];
		}
		else if (level >= 4){
			console.log("new moth!!");
			this.artwork = sword_moth_array[moth_fly_counter];
		}
		
		moth_fly_counter += 1;
		if (moth_fly_counter >= 36){
			moth_fly_counter = 0;
		}


		// check distance from main character
		let d = dist(cat.x+25, cat.y+20, this.x+10, this.y+20);

		if ((d < 45) ){ // && (cat_in_action == true)		
			if ((sword_being_swung)){		//  && (cat_hit == false)
				// cat swings
					

				// moth takes damage
				moth_damage_array_counter += 1;
				this.artwork = moth_damage_array[moth_damage_array_counter];
				
				if (sword_array_counter == 0){
					console.log("slash effect");
					
				}
				// show damaged moth array
				// console.log("moth got hit, moth_array: " + int(moth_damage_array_counter));
				
				if (moth_damage_array_counter >= 12){
					moth_damage_array_counter = 0;
					
				}
				
				// remove moth if hit
				moth_array.splice(this, 1);
				coins += 1;
				slash.play();
				// console.log("he's dead :(");

				if (moth_array.length == 0){
					console.log("end of level"+ int(level));
					levelOver();
				}
			}
			else if((sword_being_swung == false)){ 
				cat.height = 80;
				if (damage_array_counter == 0){
					if (frameCount%40==0){
						hearts -= 1;
					}
				}

				cat.artwork = cat_damage_array[damage_array_counter];
				damage_array_counter += 1;
				if (damage_array_counter >= 12){
					damage_array_counter = 1;		
				}
			}
			sword_array_counter = 0;
			damage_array_counter = 0;

		}

		this.x -= this.speed;
		if (this.x <= -50){
			this.speed = 0;
			this.artwork = moth_fly_1;
		}
		// implement the air wiggle where they bob up and down a little bit
	}
}

















// end

