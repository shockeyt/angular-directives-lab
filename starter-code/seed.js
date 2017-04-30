var db = require('./models');

db.Question.remove({}, function(err, questions) {
	if (err) {
		console.log("Error: ", err);
		}
	console.log('removed all questions');
});

 var questionsList = [
    {question: "What is Batman's guilty pleasure?"},
    {question: "I'm sorry professor, I couldn't complete my homework because _________."},
    {question: "I get by with a little help from _________."},
    {question: "_________. It's a trap!"},
    {question: "The class field trip was completely ruined by _________."},
    {question: "What's my secret power?"}
  ];


  db.Question.create(questionsList, function(err, questions) {
	if (err) {
		console.log("Error:", err);
	} else {
	console.log("Created new questions", questions);
	process.exit();
	}
});