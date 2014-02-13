from flask import Flask, jsonify, abort, request, make_response, url_for
from flask.ext.restful import Api, Resource, reqparse, fields, marshal

app = Flask(__name__, static_url_path = "")
api = Api(app)


"""
Here we add a dummy task that also acts as instructions for how to add and delete tasks on the UI
"""
tasks = [
    {
        'id': 1,
        'title': u'how to post tasks?',
        'description': u'press add task to add a new task,\
         press delete to remove a task', 
        'priority': 5,
        'done': False
    }
]

"""
This is the data structure that holds each task object.
"""
task_fields = {
    'title': fields.String,
    'description': fields.String,
    'done': fields.Boolean,
    'uri': fields.Url('task'),
    'priority': fields.Integer
}

# test root
class Root(Resource):
    def get(self):
        return {'hello': 'todo-list'}


"""
Here we extend the Resource class to create our own resource Tasklist.
The access point for this is at /<localhost>/todo/tasks
This class extends the base Resource class and wraps the get, post handlers in their own methods
"""
class TaskList(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type = str, required = True, 
            help = 'No task title provided', location = 'json')

        self.reqparse.add_argument('description', type = str, default = "empty!", 
            location = 'json')

        self.reqparse.add_argument('priority', type = int, default = 0, 
            location = 'json')

        super(TaskList, self).__init__()

    def get(self):
        return { 'tasks': map(lambda t: marshal(t, task_fields), tasks) }

    def post(self):
        args = self.reqparse.parse_args()
        task = {
            'id': tasks[-1]['id'] + 1,
            'title': args['title'],
            'description': args['description'],
            'done': False,
            'priority': args['priority']
        }
        tasks.append(task)
        return { 'task': marshal(task, task_fields) }, 201


"""
Here we extend the Resource class to create our own resource Task.
The access point for this is at /<localhost>/todo/tasks/<id>
This class extends the base Resource class and wraps the get, post handlers in their own methods
"""
class Task(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type = str, location = 'json')
        self.reqparse.add_argument('description', type = str, location = 'json')
        self.reqparse.add_argument('done', type = bool, location = 'json')
        super(Task, self).__init__()

    def get(self, id):
        task = filter(lambda t: t['id'] == id, tasks)
        if len(task) == 0:
            abort(404)
        return { 'task': marshal(task[0], task_fields) }


    def put(self, id):
        task = filter(lambda t: t['id'] == id, tasks)
        if len(task) == 0:
            abort(404)
        task = task[0]
        args = self.reqparse.parse_args()
        task['title'] = args.get('title', task['title'])
        task['description'] = args.get('description', task['description'])
        task['done'] = args.get('done', task['done'])
        return jsonify( { 'task': make_public_task(task) } )

    def delete(self, id):
        task = filter(lambda t: t['id'] == id, tasks)
        if len(task) == 0:
            abort(404)
        tasks.remove(task[0])
        return { 'result': True }


api.add_resource(Root, '/')
api.add_resource(TaskList, '/todo/tasks', endpoint = 'tasks')
api.add_resource(Task, '/todo/tasks/<int:id>', endpoint = 'task')

if __name__ == '__main__':
    app.run(debug=True)