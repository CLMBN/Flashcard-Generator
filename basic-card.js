var fs = require("fs");

module.exports = BasicCard;

// Constructor for the Basic Card
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
	this.create = function(){
		var card = {
			front: this.front,
			back: this.back,
			type: "basic",
		};
		//add card to cards.txt
		fs.appendFile("cards.txt", JSON.stringify(card) + ';', "utf8", function(error){
			if (error) {
				console.log(error);
			}
		});
	};
}