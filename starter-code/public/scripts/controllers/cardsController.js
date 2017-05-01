angular.module('CardsAgainstAssembly')
  .controller('CardsController', CardsController);


CardsController.$inject = ['$http'];
function CardsController($http){
  var vm = this;
  vm.all = [];
  vm.questionsList = [];
  vm.editForm = false;

  $http
  //.get('https://shielded-forest-41789.herokuapp.com/api/flashcards')
  .get('/questions')
  .then(function(response) {
    vm.questionsList = response.data;
    console.log(vm.all);
  });

  vm.showQuestion = showQuestion;
  vm.singleQuestion = {};

  function showQuestion(_id) {
    console.log("id button clicked");
    console.log(_id);
    $http
    .get('/questions/' + _id)
    .then(function(response) {
      console.log(response.data._id);
      vm.singleQuestion = response.data._id;
    });
  }



  vm.addQuestion = addQuestion;
  vm.newQuestion = {};

  function addQuestion() {
    vm.all.push(vm.newQuestion);
    $http
    .post('/questions', vm.newQuestion)
    .then(function(response) {
      console.log(response);
    });
    vm.newQuestion = {};
  }

  vm.deleteQuestion = deleteQuestion;

  function deleteQuestion(_id) {
    console.log("delete button clicked");
    console.log(_id);
    $http
    .delete('/questions/' + _id)
    .then(function(response) {
      var index = vm.all.indexOf(_id);
      vm.all.splice(index, 1);
    });
  }

  vm.editQuestion = editQuestion;
  //vm.putQuestion = putQuestion;
  vm.putquestion = {};

  vm.showForm = showForm;
  function showForm(_id) {
    vm.editForm = !vm.editForm;
    console.log("edit button clicked");
  }

  function editQuestion(_id) {
    
    //console.log("edit button clicked");
    //vm.editForm = !vm.editForm;
    console.log(_id);
      $http
      .put('/questions/' + _id, vm.putQuestion)
      .then(function(response) {
        console.log(response.data);
      });
      vm.putQuestion = {};
      showForm();   
  }

  // vm.questionsList = [
  //   {question: "What is Batman's guilty pleasure?"},
  //   {question: "I'm sorry professor, I couldn't complete my homework because _________."},
  //   {question: "I get by with a little help from _________."},
  //   {question: "_________. It's a trap!"},
  //   {question: "The class field trip was completely ruined by _________."},
  //   {question: "What's my secret power?"}
  // ]
}







