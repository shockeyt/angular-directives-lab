var express = require('express');
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/public'));

//*****HARDCODED DATA******
 var questionsList = [
    {id: 1, question: "What is Batman's guilty pleasure?"},
    {id: 2, question: "I'm sorry professor, I couldn't complete my homework because _________."},
    {id: 3, question: "I get by with a little help from _________."},
    {id: 4, question: "_________. It's a trap!"},
    {id: 5, question: "The class field trip was completely ruined by _________."},
    {id: 6, question: "What's my secret power?"}
  ];


//serve public index.html
app.get('/', function homepage (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//test route
app.get('/api', function api_index (req, res) {
	res.json({message: "Yo server"});

});

//HARD CODED TESTS
//get index
app.get('/questions', function questionIndex(req, res) {
	res.json({questionsList: questionsList});
});

//get show
app.get('/questions/:id', function questionShow(req, res) {
	var id = req.params.id-1;
	res.json(questionsList[id]);
});

//post
app.post('/questions', function (req, res) {
	//questionsList.push(req.body);
	console.log(req.body);
	var newQuestion = {
		id: req.body.id,
		question: req.body.question
	};
	
	console.log(newQuestion);
	questionsList.push(newQuestion);
	res.json(newQuestion);
	//res.end();
});

app.listen(process.env.PORT || 3000, function() {
	console.log('express server is running on localhost:3000');
});