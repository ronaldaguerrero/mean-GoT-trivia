let mongoose = require('mongoose');
let User = mongoose.model('users');
let Rating = mongoose.model('ratings');

module.exports = {
	index: function (req, res) {
		User.find({}, function(err, data){
			if (err) {
				res.json(err);
	        } else {
	            res.json({data});
	        }
		})
	},

	indexR: function (req, res) {
		Rating.find({}, function(err, reviews){
			if (err) {
				res.json(err);
	        } else {
	            res.json({reviews});
	        }
		})
	},

	show: function (req, res){
		User.find({_id: req.params.id}, function (err, data){
			if (err) {
				res.json(err);
	        } else {
	            res.json({data});
	        }
		})
	},

	create: function (req, res) {
		User.create(req.body, function (err, data){
			if (err) {
				res.json(err);
	        } else {
	            res.json({data});
	        }
		})
	},

	createR: function (req, res) {
		Rating.create(req.body, function (err, review){
			// console.log('create from ctrl');
			// console.log(review);
			if (err) {
				res.json(err);
	        } else {
	            User.findOneAndUpdate({_id: req.params.cakeId}, {$push: {ratings: review}}, function(err, data){
                    if(err){
                        res.json({message: "Error!", error: err});
                    }
                    else{
                        res.json({message: "Success!", added: true});
                    }
                })
	        }
	    })
	},

	update: function (req, res) {
		console.log('running main ctrl update');
		User.updateOne({_id: req.params.id}, {$set: req.body}, function (err, data){
			if (err) {
				res.json(err);
	        } else {
	        	console.log('made it');
	            res.json(data);
	        }
		})
	},

	delete: function (req, res) {
		User.deleteOne({_id: req.params.id}, function (err, data){
			if (err) {
				res.json(err);
	        } else {
	            res.json(data);
	        }
		})
	},

	deleteR: function (req, res) {
		Rating.deleteOne({_id: req.params.id}, function (err, review){
			if (err) {
				res.json(err);
	        } else {
	            res.json(review);
	        }
		})
	}
}