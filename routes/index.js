var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET Hello World page
router.get('/helloworld', function(req, res){
	res.render('helloworld', {title: 'Hello World!'});
});

//GET imagelist page
router.get('/imagelist', function(req, res){
	var db = req.db;
	var collection = db.get('imagecollection');
	collection.find({},{},function(e, docs){
		res.render('imagelist', {
			"imagelist" : docs
		});
	});
});

//GET home page
router.get('/home', function(req, res){
	res.render('home', {title: 'Home page'});
});

router.get('/addimage', function(req, res){
	res.render('addimage', {title: 'Admin'});
	var db = req.db;
	var collection = db.get('albumcollection');
	collection.find({},{},function(e,docs){
		res.render('albumlist',{
			"albumlist" : docs
		});
	});
});

router.post('/addalbum', function(req, res){
	var db = req.db;

	var albumName = req.body.albumName;
	var collection = db.get('albumcollection');
	
});

//POST
router.post('/addimage', function(req, res){
	var db = req.db;

	var imageLink = req.body.imageLink;
	var caption = req.body.caption;

	var collection = db.get('imagecollection');

	collection.insert({
		"imageLink" : imageLink,
		"caption" : caption
	}, function(err, doc){
		if(err){
			res.send("There was a problem adding the information to the database.");
		}
		else{
			res.redirect("imagelist");
		}
	});
});

module.exports = router;
