var fs = require("fs");

module.exports = ClozeCard;

// constructor for Cloze Card
function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.clozeDelete = this.text.replace(this.cloze, "___________");
	this.create = function() {
		var card = {
			text: this.text, 
			cloze: this.cloze,
			clozeDelete: this.clozeDelete,
			type: "cloze"
		};
		// add card to card.txt
		fs.appendFile("cards.txt", JSON.stringify(card) + ';', "utf8", function(error) {
			if(error) {
				console.log(error);
			}
		});
	};
}