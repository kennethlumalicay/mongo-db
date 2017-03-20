/* find
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/learnyoumongo";
mongo.connect(url, function(err, db) {
	var parrots = db.collection("parrots")
	parrots.find({
		age: {$gt: parseInt(process.argv[2])}
	}).toArray(function(err, documents) {
		console.log(documents);
		db.close();
	});
});*/

/* find project
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/learnyoumongo";
mongo.connect(url, function(err, db) {
	var parrots = db.collection("parrots")
	parrots.find({
		age: {
			$gt: parseInt(process.argv[2])
		}
	}, {
		name: 1,
		age: 1,
		_id: 0
	}).toArray(function(err, documents) {
		console.log(documents);
		db.close();
	});
});*/

/* insert
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/learnyoumongo";
var insertDoc = {
	firstName: process.argv[2],
	lastName: process.argv[3]
};
mongo.connect(url, function(err, db) {
	if(err) throw err;
	var docs = db.collection("docs");
	docs.insert(insertDoc, function(err, data) {
		if(err) throw err;
		console.log(JSON.stringify(insertDoc));
		db.close();
	});
});*/

/* update
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/" + process.argv[2];
var change = {age: 40};
mongo.connect(url, function(err, db) {
	if(err) throw err;
	var users = db.collection("users");
	users.update({
		username: "tinatime"
	}, {
		$set: change
	}, function() {
		db.close();
	});
});*/

/* remove
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/" + process.argv[2];
var colName = process.argv[3];
var delId = process.argv[4];
mongo.connect(url, function(err, db) {
	if(err) throw err;
	var collection = db.collection(colName);
	collection.remove({
		_id: delId
	}, function(err) {
		if(err) throw err;
		close.db();
	});
});*/

/* count
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/learnyoumongo";
var colName = "parrots";
var ageCon = {$gt: +process.argv[2]};
mongo.connect(url, function(err, db) {
	if(err) throw err;
	var collection = db.collection(colName);
	collection.count({
		age: ageCon
	}, function(err, count) {
		if(err) throw err;
		console.log(count);
		db.close();
	});
});*/

// aggregate
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/learnyoumongo";
var colName = "prices";
var sizeCon = process.argv[2];
mongo.connect(url, function(err, db) {
	if(err) throw err;
	var collection = db.collection(colName);
	collection.aggregate([
		{ $match: {size: sizeCon} }, 
		{ $group: {
			_id: "average",
			average: {$avg: "$price"}
			}
		}
	]).toArray(function(err, results) {
		if(err) throw err;
		console.log(results[0].average.toFixed(2));
		db.close();
	});
});