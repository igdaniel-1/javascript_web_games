

// new hangman game built w javascript and p5


let rand_num;			
let input_answer_array = ['hello', 'goodbye', 'alphabet', 
							'hawaii', 'martian', 'honeycomb', 'difficult', 
							'tennis', 'waterbottle', 'marathon', 'homebody',
							'pencilcase', 'mint', 'tulips', 'hot', 'welcome',
							'translucent', 'tyrannosaurus', 'barbeque', 
							'christmas', 'vietnamese', 'kitchen', 'vitamins', 
							'hypnotism', 'synthesize', 'polaroid', 'amnesty'];
let input_answer;		
let leng = 0;

let guessed_array = [];
let guessed_display = [];

let guess = '';
let num_incorrect_guesses = -1;
let body_array = [['O', 460, 155], ['|', 472, 190], ['/', 460, 225], ['\\', 480, 225], ['/', 460, 190], ['\\', 480, 190]];


function setup(){
	createCanvas(500,500);

	rand_num = round(random(0,input_answer_array.length -1));
	console.log(rand_num);

	input_answer = input_answer_array[rand_num];
	console.log(input_answer);

	input_answer_chars = input_answer.split("");		// ['i','n','d','i','a']
	// console.log(input_answer);
	leng = input_answer.length;

	for (let i = 0; i< leng; i++){
		guessed_display.push("_");
	}
}

function preload(){
	hanger = loadImage('hanger.png');

}

function draw(){
	// createCanvas(500,500);
	// background
	background(255, 255, 255);					// grey background

	image(hanger, 240, 50, 250, 400);			// hanger

	// fill color
	noStroke()
			
	fill(210,210,210);							// light grey
	rect(50, 60, 240, 350);						// box for the letters

	// text(guessed_array, 100, 300);

	fill(30, 30, 30);							// dark grey
	textSize(46);
	for (let j = 0; j <= num_incorrect_guesses; j++){
		text(body_array[j][0], body_array[j][1], body_array[j][2]);					// body
	}	

	// text('_'*length, 170-(length*10/2);		// centering the _ _ _ _ _ in the rectangle
	textSize(32);
	for (let i = 0; i <= leng; i++){
		text(guessed_display[i], 75+(20*i), 100);
	}
	textSize(25);
	if (guessed_array.length != 0){
		for (let i = 0; i <= guessed_array.length; i++){
			text(guessed_array[i], 70+(i*15), 350);
		}
	}
	


}

function keyTyped() {

	guess = key;
	guessed_array.push(guess);
	console.log(guessed_array);
	correctOrIncorrect();
}

function correctOrIncorrect(){
	// console.log(String(guess));
	// console.log(input_answer[0]);
	let found = false;
	for (let i = 0; i <= leng; i++){
		let current_letter = input_answer_chars[i];				// indexing through the answer word
		console.log(current_letter);
		
		if (guess == current_letter){	
			found = true;										// if this letter is a match
			console.log("index of " + guess + " at: " +i);
			guessed_display[i] = current_letter;
			console.log(guessed_display);
			

			if(current_letter in guessed_display){				// if this letter is a match AND we have a duplicate
				console.log("we already have this");
				// continue;
			}
		}
		else if ((i == leng) && (found == false)){
			num_incorrect_guesses += 1;
			console.log(num_incorrect_guesses);
		}

	}
	
}



















// end 