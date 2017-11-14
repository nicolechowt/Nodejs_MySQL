var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "96661019",
	database: "bamazonDB"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	afterConnection();
});

function afterConnection(){
	connection.query("SELECT * FROM products", function(err,res){
		if (err) throw err;
		queryCurrentItems(res);
	});
}

function queryCurrentItems(res){
	res.forEach(function(element,index){
		console.log("Item " + element.item_id + ": " + element.product_name + "\n"  + "Price: $" + element.price);
	});
	askUser(res);
}

function askUser(res){
	inquirer
		.prompt([
			{
				name: "uniqueId",
				type: "input",
				message: "What is the ID of the product you would like to buy?"
			},
			{
				name: "quantity",
				type: "input",
				message: "How many units of the product would you like buy?"
			}
		])
			.then(function(answer){
				var productIndex = answer.uniqueId-1;
					if (answer.uniqueId<=res.length){
						if(answer.quantity<=res[productIndex].stock_quantity){
							fulfillOrder(answer.uniqueId,answer.quantity);
						} else {
							console.log("Sorry, we only have " + res[productIndex].stock_quantity + " left in stock!");
						}
					} else {
						console.log("Please enter a valid ID.");
					}
			});
}

function fulfillOrder(desiredID,desiredQty){
	console.log("Fulfilling order...");
	var productIndex = desiredID-1;
	var query = "SELECT stock_quantity FROM products WHERE item_id = ?";
	connection.query(query, desiredID, function(err,res) {
		if (err) throw err;
		var currentQty = JSON.stringify(res[0].stock_quantity);
		var newQty = currentQty - desiredQty;
				
		connection.query("UPDATE products SET ? WHERE ?", [
		{
			stock_quantity: newQty

		}, {
			item_id: desiredID
		}], function(err,res){
			if (err) throw err;					
			console.log("Order Fulfilled!");
		});

		connection.query("SELECT * FROM products", function(err,res){
			var totalCost = JSON.stringify(res[productIndex].price)*desiredQty;
			console.log("Total Cost $: " + totalCost);
			endConnection();
		});

	});

}

function endConnection(){
	connection.end();
}
