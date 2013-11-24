// var stringResponse = $http({method: 'GET', url: 'http://httpbin.org/get'});
// document.writeln(stringResponse.responseText);
// var string2 = stringResponse.responseText; 

function httpGet(url){
	var xmlHttp=null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}

var jsonObject = httpGet("http://httpbin.org/get");
var jsonString = JSON.parse(jsonObject);

var jsonTask = httpGet("tasks.json");
var taskString = JSON.parse(jsonTask);




function TodoCtrl($scope) {//Get request for angular here
$scope.todos = [
	{text:'learn angular', done:true},
	{text:'build an angular app', done:false},
	{text:'bob the builder', done:false},
	{text: 'host: ' + jsonString.headers.Host, done:false},
	{text: 'Task: ' + taskString.tasks[1].title, done:false}
];	
 
$scope.addTodo = function() {
$scope.todos.push({text:$scope.todoText, done:false});
$scope.todoText = '';
};
 
$scope.remaining = function() {
var count = 0;
angular.forEach($scope.todos, function(todo) {
count += todo.done ? 0 : 1;
});
return count;
};
 
$scope.archive = function() {
var oldTodos = $scope.todos;
$scope.todos = [];
angular.forEach(oldTodos, function(todo) {
if (!todo.done) $scope.todos.push(todo);
});
};
}