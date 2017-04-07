var BasicCard = require("./basic-card.js");
var ClozeCard = require("./cloze-card.js");
var inquirer = require("inquirer");
var fs = require("fs");

// initial question to create card or view cards
inquirer.prompt([{
	name: 'initial',
	message: "What would you like to do?",
	type: 'list',
	choices: [{
		name: 'add-new-card'
	},{
		name: 'show-cards'
	}]
}]).then(function(answer){
	if (answer.initial === 'add-new-card') {
		addCard();
	}else if (answer.initial === 'show-cards') {
		showCards();
	}
});

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
				nextPrompt();
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
					nextPrompt();
				}else {
					console.log('The section you provided does not match any portion of the full phrase. Please try again.');
					addCard();
				}
			});
		}
	});
};
