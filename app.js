var BasicCard = require("./basic-card.js");
var ClozeCard = require("./cloze-card.js");
var inquirer = require("inquirer");
var fs = require("fs");

// initial question to create card or view cards


var userPrompt = function() {
	inquirer.prompt([{
		name: 'initial',
		message: "What would you like to do?",
		type: 'list',
		choices: [{
			name: 'Create a new Flash Card'
		},{
			name: 'Take the test'
		}]
	}]).then(function(answer){
		if (answer.initial === 'Create a new Flash Card') {
			addCard();
		}else if (answer.initial === 'Take the test') {
			showCards();
		}
	});
};

userPrompt();

var addCard = function() {
	//ask for type of card to create
	inquirer.prompt([{
		name: 'cardType',
		message: 'What kind of flash card would you like to make?',
		type: 'list',
		choices: [{
			name: 'A Basic FlashCard'
		}, {
			name: 'A Cloze FlashCard'
		}]
	}]).then(function(answer) {
		//create basic card
		if(answer.cardType === 'A Basic FlashCard') {
			inquirer.prompt([{
				name: 'front',
				message: 'What is the question on front of card?',
				validate: function(input) {
					if (input === '') {
						console.log('Please enter a question.');
						return false;
					}else {
						return true;
					}
				}
			}, {
				name: 'back',
				message: 'What is the correct answer?',
				validate: function(input) {
					if (input === '') {
						console.log('Please enter an answer.');
						return false;
					}else {
						return true;
					}
				}
			// Store into a new card
			}]).then(function(answer) {
				var newBasicCard = new BasicCard(answer.front, answer.back);
				newBasicCard.create();
				console.log('\n----------------\n');
				userPrompt();
			});

		//create cloze card
		} else if (answer.cardType === 'A Cloze FlashCard') {
			inquirer.prompt([{
				name: 'text',
				message: 'What is the full phrase?',
				validate: function(input) {
					if (input === '') {
						console.log('Please provide your phrase.');
						return false;
					}else {
						return true;
					}
				}
			},{
				name: 'cloze',
				message: 'What is the portion you would like to hide?',
				validate: function(input) {
					if (input === '') {
						console.log('Please provide portion of phrase you would like to hide');
						return false;
					}else {
						return true;
					}
				}
			//validate that phrase to hide matches portion of larger phrase then create card
			}]).then(function(answer) {
				var text = answer.text;
				var cloze = answer.cloze;
				if (text.includes(cloze)) {
					var newCloze = new ClozeCard(text, cloze);
					newCloze.create();
					console.log('\n----------------\n');
					userPrompt();
				}else {
					console.log('The section you provided does not match any portion of the full phrase. Please try again.');
					console.log('\n----------------\n');
					addCard();
				}
			});
		}
	});
};

var showCards = function() {
	// read the cards.txt file to get FlashCards
	fs.readFile('./cards.txt', 'utf8', function(error, data) {
		if(error) {
			console.log("An Error has occured: " + error);
		}
		var questions = data.split(';');
		var notBlank = function(value) {
			return value;
		};
		questions = questions.filter(notBlank);
		var count = 0;
		showQuestion(questions, count);
	});
};

var showQuestion = function(array, index) {
	question = array[index];
	var parsedQuestion = JSON.parse(question);
	var questionText;
	var correctAnswer;
	if (parsedQuestion.type === 'basic') {
		questionText = parsedQuestion.front;
		correctAnswer = parsedQuestion.back;
	}else if (parsedQuestion.type === 'cloze') {
		questionText = parsedQuestion.clozeDelete;
		correctAnswer = parsedQuestion.cloze;
	}
	inquirer.prompt([{
		name: 'testQuestion',
		message: questionText
	}]).then(function(answer) {
		if(answer.testQuestion == correctAnswer) {
			console.log('Good Job! Thats Correct!');
			console.log('\n----------------\n');
			if(index < array.length -1) {
				showQuestion(array, index +1);
			}
		}else {
			console.log("Thats the wrong answer!");
			console.log('\n----------------\n');
			if(index < array.length -1) {
				showQuestion(array, index +1);
			}
		}
	});
};