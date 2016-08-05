var express = require('express');
var router = express.Router();
var sort = {"sort" : {"_id" : 1}};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res){
	res.render('home', {title: 'Home page'});
});

//GET albumlist page
router.get('/albumlist', function(req, res){
	var db = req.db;
	var collection = db.get('albumcollection');
	collection.find({},{},function(e, docs){
		res.render('albumlist', {
			"albumList" : docs
		});
	});
});

//GET addimage page
router.get('/addimage', function(req, res){			// localhost:3000/addimage 
	var db = req.db;
	var collection = db.get('albumcollection');
	collection.find({},{},function(e,docs){
		res.render('addimage',{		//render addimage.jade
			"albumList" : docs		//albumList variable
		});
	});
});

router.get('/siypporo2016', function(req, res){
	var db = req.db;
	var album = db.get("#SIYpporo");
	album.find({},sort,function(e,docs){
		res.render('SIYpporo',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/Anne', function(req, res){
	var db = req.db;
	var album = db.get("Anne Debut Photoshoot");
	album.find({},sort,function(e,docs){
		res.render('Anne',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/UPFair', function(req, res){
	var db = req.db;
	var album = db.get("UP Fair");
	album.find({},sort,function(e,docs){
		res.render('UP Fair',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/creative', function(req, res){
	var db = req.db;
	var album = db.get("Creative");
	album.find({},sort,function(e,docs){
		res.render('Creative',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/busan-jeju', function(req, res){
	var db = req.db;
	var album = db.get("Busan-Jeju");
	album.find({},sort,function(e,docs){
		res.render('Busan-Jeju',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/trinket-bar', function(req, res){
	var db = req.db;
	var album = db.get("Trinket Bar");
	album.find({},sort,function(e,docs){
		res.render('Trinket Bar',{		//render addimage.jade
			"imageList" : docs		//albumList variable
		});
	});
	// res.render('album');
});

router.get('/demo', function(req, res){
	res.render('demo', {title : "Album"});
});

//===================== POST STARTS HERE=====================================================
router.post('/addalbum', function(req, res){
	var db = req.db;
	var albumName = req.body.albumName;
	var albumcollection = db.get("albumcollection");
	albumcollection.insert({
		"name" : albumName
	}, function(err, doc){
		if(err){
			res.send("There was a problem adding the information to the database.");
		}
		else{
			res.redirect("albumlist");
		}
	});
});

router.post('/addimage', function(req, res){
	var db = req.db;

	var imageLink = req.body.imageLink;
	var caption = req.body.caption;
	var albumName = req.body.albumName;
	var other = req.body.otherAlbumName;
	console.log("hello");
	console.log(other);
	var albumcollection = db.get("albumcollection");

	if(albumName == ""){
		console.log("pasok hereeee");
		albumName = other;
		albumcollection.insert({
			"name" : albumName
		});
	}

	var collection = db.get(albumName);
	
	if(imageLink.constructor === Array){
		for (var i = 0; i < imageLink.length; i++) {
			if(imageLink[i] != ""){
				collection.insert({
				"caption" : caption[i],
				"imageLink" : imageLink[i]
				});
			}
		}
	}
	else{
		if(imageLink != ""){
			collection.insert({
				"caption" : caption,
				"imageLink" : imageLink
			});
		}
	}
	res.redirect("albumlist");
});

module.exports = router;
