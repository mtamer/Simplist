Simplist
====================
Janac Meena
Mark Tamer
Adnan Khan

Me and my teamates made a web app called Simplist.This was Client Server UOttawa Project. 
It's pretty much a ToDo list web application that allows you add task and take off task using Get/Post/Delete Request using Restful API. To be able to run this you will need to run this on a server since every task you add and delete stays in the "cloud". So pretty much if you add/delete/post a task and open up another browser on the same computer or different PC using the same host name you will see the added/post/deleted task.

Course: SEG2105
Date: 30 November 2013

---
Directory Contents
---

/static
	index.html
	----this contains the html for the ui
	pencil.png
	----image for the ui
	style.css
	----the css for the ui
	todolist-js.js
	----the computing logic for the client

test.py
----this is to test the webserver and check localhost

todolist.py
----the computing logic for the webserver to handle restful resources

/venv
----this contains all the dependencies for the webserver


Resources:

<table>
    <tr>
        <td>method</td>
        <td>uri</td>
        <td>what it do</td>
    </tr>

    <tr>
        <td>GET</td>
        <td>http://[hostname]/todo/tasks</td>
        <td>retrieve list of tasks</td>
    </tr>

    <tr>
        <td>GET</td>
        <td>http://[hostname]/todo/tasks/[task_id]</td>
        <td>retrieve a task</td>
    </tr>

    <tr>
        <td>POST</td>
        <td>http://[hostname]/todo/tasks</td>
        <td>create a new task</td>
    </tr>

    <tr>
        <td>DELETE</td>
        <td>http://[hostname]/todo/tasks/[task_id]</td>
        <td>delete a task</td>
    </tr>

</table>