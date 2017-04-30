var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/public'));

//*****HARDCODED DATA******
 // var questionsList = [
 //    {id: 1, question: "What is Batman's guilty pleasure?"},
 //    {id: 2, question: "I'm sorry professor, I couldn't complete my homework because _________."},
 //    {id: 3, question: "I get by with a little help from _________."},
 //    {id: 4, question: "_________. It's a trap!"},
 //    {id: 5, question: "The class field trip was completely ruined by _________."},
 //    {id: 6, question: "What's my secret power?"}
 //  ];


//serve public index.html
app.get('/', function homepage (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//test route
app.get('/api', function api_index (req, res) {
	res.json({message: "Yo server"});

});

//****REST ROUTES****

//get index
app.get('/questions', function (req, res) {
	db.Question.find()
	.exec(function(err, questions) {
		if (err) { return console.log("index error:" + err);}
		res.json(questions);
	});
});

//get show
app.get('/questions/:id', function (req, res) {
	db.Question.findOne({_id: req.params.id}, function(err, question) {
		console.log(req.params.id);
		res.json(question);
	});
});

//post
app.post('/questions', function (req, res) {
	var newQuestion = new db.Question({
		question: req.body.question
	});

	newQuestion.save(function(err, question) {
		if (err) {
			return console.log("save error: " + err);
		}
		console.log("saved ", question);
		res.json(question);
	});
});

//delete
app.delete('/questions/:id', function (req, res) {
	var questionId = req.params.id;
	db.Question.findOneAndRemove({_id: questionId}, function (err, deletedQ) {
		console.log("deleted ", deletedQ);
		res.json(deletedQ);
	});
});

//update
app.put('/questions/:id', function (req, res) {
	var questionId = req.params.id;
	console.log(questionId);
	console.log(req.body.question);
	db.Question.findOne({_id: questionId}, function(err, updateQ) {
		if (err) res.json({message: 'find error: ' + err});
		if (req.body.question) updateQ.question = req.body.question;

		updateQ.save(function(err) {
			if (err) res.json({message: 'could not be updated'});
			console.log("updated ", updateQ);
			res.json({message: 'question updated'});
		});
	});
});


//HARD CODED TESTS
//get index
// app.get('/questions', function questionIndex(req, res) {
// 	res.json({questionsList: questionsList});
// });

//get show
// app.get('/questions/:id', function questionShow(req, res) {
// 	var id = req.params.id-1;
// 	res.json(questionsList[id]);
// });

//post
// app.post('/questions', function (req, res) {
// 	//questionsList.push(req.body);
// 	console.log(req.body);
// 	var newQuestion = {
// 		id: req.body.id,
// 		question: req.body.question
// 	};
	
// 	console.log(newQuestion);
// 	questionsList.push(newQuestion);
// 	res.json(newQuestion);
// 	//res.end();
// });

app.listen(process.env.PORT || 3000, function() {
	console.log('express server is running on localhost:3000');
});