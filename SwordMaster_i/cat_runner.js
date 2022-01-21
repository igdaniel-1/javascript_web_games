// assignment 3

// game state
let state = 0;
let logo;		// this is gonna hold the game logo for the start screen

// artwork for our background layers
let artworkLayer01;
let artworkLayer02;
let artworkLayer03;
let artworkLayer04;

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
let sword_swung = false;
let cat_in_action = false;

// moths
let moth_array = [];
// artwork for the moths
let moth_fly_1;
let moth_fly_2;
let moth_fly_3;
let moth_fly_array;
let moth_fly_counter = 0;

// damaged moth
let damaged_moth;
let moth_damage_array;
let moth_damage_array_counter = 0;
let moth_hit = false;

// sounds 
let slash;


function preload(){
	// load art files here

	logo = loadImage('sword_master_i.png');
	// backgrounds
	artworkLayer01 = loadImage('backgrounds/layer01.png');
	artworkLayer02 = loadImage('backgrounds/layer02.png');
	artworkLayer03 = loadImage('backgrounds/layer03.png');
	artworkLayer04 = loadImage('backgrounds/layer04.png');

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

	// 2 = pause mode

	if (state == 0) {
		// switch to state 1
		state = 1;
	}
	else if (state == 1) {
		// switch to state 2
		state = 2;
	}
	else {
		state = 1;
	}
	

}



function setup(){
	let cnvas = createCanvas(500,500);
	cnvas.parent('#canvas_container');

	// local storage 
	coins = window.localStorage.getItem('coins');

	if (coins == null) {
	    window.localStorage.setItem('coins', 0);
	    coins = 0;
	}
	else {
	    coins = int(coins);
	}




	layer1 = new Layer(0, -10, width, height, 0, artworkLayer01);
	// the 'b' layers are the duplicate layers that will appear second

	layer2 = new Layer(0, -10, width, height, 2, artworkLayer02);
	layer2_b = new Layer(500, -10, width, height, 2, artworkLayer02);

	layer3 = new Layer(0, 0, width, height-80, 4, artworkLayer03);
	layer3_b = new Layer(500, 0, width, height-80, 4, artworkLayer03);

	layer4 = new Layer(0, 390, width, height-390, 5, artworkLayer04);			// runner floor
	layer4_b = new Layer(500, 390, width, height-390, 5, artworkLayer04);

	// init cat
	cat = new MainCharacter(50, 312, 55, 80, cat_standing);

	// create moth array
	for(let i = 0; i<12; i++){
			moth_array.push(new Moth((450 + 400*i), random(290, 330), 50, 50, 2, moth_fly_1));
	}
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
	layer1.display();
	layer2.display();
	layer2_b.display();

	layer3.display();
	layer3_b.display();

	layer4.display();
	layer4_b.display();

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
	cat_crouching_array = [crouch3, crouch3, crouch3, crouch3, 
							crouch4, crouch4, crouch4, crouch4,
							// after 8
							crouch3, crouch3, crouch3, crouch3, 
							crouch3, crouch3, crouch3, crouch3,
							crouch4, crouch4, crouch4, crouch4, 
							crouch4, crouch4, crouch4, crouch4, 
							crouch4, crouch4, crouch4, crouch4, 
							crouch3, crouch3, crouch3, crouch3,
							// before 8+24 = 32
							crouch4, crouch4, crouch4, crouch4,
							// crouch2, crouch2, crouch2, crouch2, 
							// crouch1, crouch1, crouch1, crouch1, 
							crouch3, crouch3, crouch3, crouch3];


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

	// 4*7 = 28
	cat_sword_array = [sword1, sword1, sword1, sword1, 
						sword2, sword2, sword2, sword2, 
						// 9 to 24
						sword3, sword3, sword3, sword3, 
						sword4, sword4, sword4, sword4, 
						sword4, sword4, sword4, sword4,
						sword4, sword4, sword4, sword4,
						sword2, sword2, sword2, sword1];

	cat.display();

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

	for (let i = 0; i<12; i++){
		moth_array[i].display();
	}

	layer2.move();
	layer3.move();
	layer4.move();

	layer2_b.move();
	layer3_b.move();
	layer4_b.move();

	cat.move();


	for (let i = 0; i<12; i++){
		moth_array[i].move();
	}

	// text for coins and hearts
	fill(200);
	text("coins: "+ coins, 400, 40);
	text("hearts: "+ hearts, 400, 60);
	text("Use the ARROW KEYS to Jump, Crouch, and Run", 120, 465);
	text("Use the LEFT ARROW to swing your Sword", 140, 485);
}		// end of old draw()


function paused() {
  background(0);
  fill(255);
  stroke(255);
  text("PAUSED", 230, 230) 
  text("click PLAY to switch back to 'playing' mode", 135, 250);
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
		if(this.x <= -500){
			this.x = 500;
		}
		if (keyIsDown(RIGHT_ARROW)){
			this.x -= this.speed;
			// this.currentImage = frogright;
		}

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
			this.artwork = cat_crouching_array[crouching_array_counter];
			
			// console.log(crouching_array_counter);

			// crouch3 and crouch4 are half the height of crouch1+crouch2
			// console.log(crouching_array_counter);
			if (crouching_array_counter >= 39){
				this.width = 55;
				this.height = 80;
				this.y = 312;
				crouching_array_counter = 0;
			}
			else{
				this.width = 55+10;
				this.height = 50;
				this.y = 312+30;
			}

			crouching_array_counter += 1;
		}
		if (keyIsDown(UP_ARROW) && jumpMode == false){			// could be ===
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

		if (keyIsDown(LEFT_ARROW) && (sword_swung==false)){				// 32 should be space bar??
			// fill(200);
			// text("space bar", 200, 200);
			sword_swung = true;
			cat_in_action = true;
		}

		if (sword_swung && (cat_in_action == true)){
			// fill(200);
			// text("swung", 200, 200);

			this.artwork = cat_sword_array[sword_array_counter];		// 28
			sword_array_counter += 1;
			if (sword_array_counter >= 28){
				// console.log("out of bounds");
				sword_array_counter = 0;
				sword_swung = false;
			}
			else if ((sword_array_counter >= 9) && (sword_array_counter <25)){			// double wide for 3 and 4
				this.width = 55 + 20;
			}
			else{
				this.width = 55;
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
		// console.log("hellooooo");

		image(this.artwork, this.x, this.y, this.width, this.height);
	}
	move(){
		this.artwork = moth_fly_array[moth_fly_counter];
		moth_fly_counter += 1;
		if (moth_fly_counter >= 36){
			moth_fly_counter = 0;
		}


		// check distance from main character
		let d = dist(cat.x+25, cat.y+20, this.x+10, this.y+20);

		if ((d < 40) && (cat_in_action == true)){
			// damage
			// fill(200);
			// text("damage", 100, 100); 			
			if ((sword_swung) && (cat_hit == false)){
				// cat swings
					

				// moth takes damage
				

				this.artwork = moth_damage_array[moth_damage_array_counter];
				moth_damage_array_counter += 1;
				if (moth_damage_array_counter >= 12){
					moth_damage_array_counter = 0;
					
				}
				moth_hit = true;
				// may add cat_in_action = false here
			}
			else if((d<20) && (sword_swung == false) && (cat_hit == false) && (moth_hit == false)){
				// text("damage damage", 100, 100); 	
				// cat takes damage

				cat_hit = true;
				cat.artwork = cat_damage_array[damage_array_counter];
				damage_array_counter += 1;
				if (damage_array_counter >= 12){
					damage_array_counter = 0;
					
				}
			}

		}

		// may move this outside the d<40
		if (moth_hit && !cat_hit){
			slash.play();
			
			coins += 1;

			// update local storage
			localStorage.setItem('coins', coins);


			sword_swung = false;
			cat_in_action = false;
			moth_hit = false;
			// cat_hit = false;

		}
		else if(cat_hit && !moth_hit){
			hearts -= 1;
			// fill(200);
			// console.log("hearts:"+hearts);
			// text("hearts:" + hearts, 400, 100);
			cat_in_action = false;

			cat_hit = false;
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

