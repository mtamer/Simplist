/**
    this is using jquery $ajax to do the test calls

    [1]: http://api.jquery.com/jQuery.get/#urldatacallbacktype

    The following test cases were considered:
        
        1. Making multiple GET requests to pull the current list from the server
           Expected return: current task list with 200 response

        2. Making a GET request for specific tasks called by <task-id>
           Expected return: task specified by id with 200 response

        3. Making GET request for non existent task
           Expected return: error message with 404 response

        4. Making a POST request to valid URI
           Expected return: current posted task and 201 response

        5. Making a DELETE request specified by <task-id>
           Expected return: success message with a 200 response

        6. Making a POST request to an invalid URI
           Expected return: error message with 404 response

        7. Making a DELETE request to a non existent task
           Expected return: error message with 404 response
**/


var uri = 'http://127.0.0.1:5000/todo/tasks';

function test2(){

    var self = this;

    self.tasks = [
    {
            title: 'THESE ARE INSTRUCTIONS',
            description: 'this should not be deleted'
    }
    ];

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
                    console.log("ajax error " + jqXHR.status);
                },
                success: function(data, textStatus, xhr) {
                    console.log("response status: " + xhr.status);
                },
                
                complete: function(xhr, textStatus) {
                    console.log("response status: " + xhr.status);
                }   
            };

            return $.ajax(request);
        }


        self.get = function() {
            self.ajax(uri, 'GET').done(function(data) {
                // console.log("this kicks off GET");

                for(var i=0; i<data.tasks.length; i++) {
                    self.tasks.push({
                        title: data.tasks[i].title,
                        description: data.tasks[i].description,
                        uri: data.tasks[i].uri
                    });
                }
            });
        }


        self.post = function(task) {
            self.ajax(uri, 'POST', task).done(function(data) {
                console.log("this kicks off POST");
                    self.tasks.push({
                        title: task.title,
                        description: task.description
                    });
            });
        }


        self.delete = function(task) {
            self.ajax(task.uri, 'DELETE').done(function() {
                self.tasks.remove(task);
            });
        }


        self.printt = function() {
            for(var i=0; i<self.tasks.length; i++) {
                console.log("title: " + self.tasks[i].title + " @ uri: " + self.tasks[i].uri);
            }
        }

        //make this call
        self.get()
}

var runtest = new test2();

function test() {

    var task = {
        title: "test task number",
        description: "test task descriptiond"
    }

    console.log("making GET request to pull full list")
    runtest.get()

    console.log("making call to printt to print task list")
    runtest.printt();
    
    console.log("add 5 items")
    for(var i=0; i<5; i++) {
        task.title = "test task number" + i;
        runtest.post(task);
    }

    console.log("delete 5 items")
    for(var i=1; i<5; i++) {
        runtest.delete(runtest.tasks[i]);
    
    }

}

