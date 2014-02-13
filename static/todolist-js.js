function TasksViewModel() {
        var self = this;
        /*Telling our webasite to talk to this server*/
        self.tasksURI = 'http://127.0.0.1:5000/todo/tasks';
        self.tasks = ko.observableArray();

        /*Creating a method that allows us to talk to talk to the user*/
        self.ajax = function(uri, method, data) {
            var request = {
                url: uri,
                type: method,
                contentType: 'application/json',
                accepts: 'application/json',
                cache: true,
                dataType: 'json',
                data: JSON.stringify(data),
                error: function(jqXHR) {
                    console.log("ajax error" + jqXHR.status);
                }
            };

            return $.ajax(request);
        }
        /*Allows us to view items added to our list when added*/
        self.beginAdd = function() {
            //alert("add");
            $('#add').modal('show');
        }
        /*Deletes task from list */
        self.remove = function(task) {
            self.ajax(task.uri(), 'DELETE').done(function() {
                self.tasks.remove(task);
            });
        }
        /*Changes colors of labels when pressed (red) */
        self.markInProgress = function(task) {
            task.done(false);

        }
          /*Changes colors of labels when pressed (green)*/
        self.markDone = function(task) {
            task.done(true);
        }
        /*Get the list from anywhere as long as server is running. Presistant*/
        self.ajax(self.tasksURI, 'GET').done(function(data) {
            for(var i=0; i<data.tasks.length; i++) {
                self.tasks.push({
                    uri: ko.observable(data.tasks[i].uri),
                    title: ko.observable(data.tasks[i].title),
                    description: ko.observable(data.tasks[i].description),
                    done: ko.observable(data.tasks[i].done),
                });
            }
        });
          /* Whenever add task method is push we call upon this function that allows to add stuff in our list and allow the
          client to talk to the server */
        self.add = function(task)
        {
            self.ajax(self.tasksURI, 'POST', task).done(function(data) {
                self.tasks.push({
                    uri: ko.observable(data.task.uri),
                    title: ko.observable(data.task.title),
                    description: ko.observable(data.task.description),
                    done: ko.observable(data.task.done)
                });
            });
        }
    }
      /* Controls what the user sees depending on what buttons they press*/
    function AddTaskViewModel() {
        var self = this;
        self.title = ko.observable();
        self.description = ko.observable();


        self.addTask = function() {
            $('#add').modal('hide');
            tasksViewModel.add({
                title: self.title(),
                description: self.description()
            });
            self.title("");
            self.description("");
        }
    }

    var tasksViewModel = new TasksViewModel();
    var addTaskViewModel = new AddTaskViewModel();
    ko.applyBindings(tasksViewModel, $('#main')[0]);
    ko.applyBindings(addTaskViewModel, $('#add')[0]);
