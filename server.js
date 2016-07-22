var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');
/* app.get('/',function(req,res){
	res.send("hello world from server.js")	
});*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactlist', function(req, res){
	console.log('i received a get request')

	db.contactlist.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
	/*person1 = {
		name: 'sachin',
		email: 'sachin@gmail.com',
		number: 123456
	};
	person2 = {
		name: 'sachin2222',
		email: 'sachin222@gmail.com',
		number: 456546546
	};
	person3 = {
		name: 'sachin333',
		email: 'sachin333@gmail.com',
		number: 567567657
	};
	var contactlist = [person1, person2, person3];
	res.json(contactlist);*/
});

app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
			res.json(doc);
	})
});
app.delete('/contactlist/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	})
});

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
	});
});

app.listen(3000);
console.log("server running on port 3000");