var BasicCard = require("./basic-card.js");
var ClozeCard = require("./cloze-card.js");
var inquirer = require("inquirer");
var fs = require("fs");

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