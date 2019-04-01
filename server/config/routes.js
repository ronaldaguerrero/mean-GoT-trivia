let mainCtrl = require('./../controllers/mainCtrl.js');

module.exports = function(app){
	app.get('/users', mainCtrl.index);
	app.get('/user/:id', mainCtrl.show);
	app.post('/user', mainCtrl.create);
	app.put('/user/:id', mainCtrl.update);
	app.delete('/:id', mainCtrl.delete);

	app.get('/reviews', mainCtrl.indexR);
	app.post('/review/:userId', mainCtrl.createR);
	app.delete('/review/:id', mainCtrl.deleteR);
}