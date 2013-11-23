<!DOCTYPE html>
<html>
<head>
	<title>Requesting Test</title>
</head>
<body>
	<script type="text/javascript">
		function makeHttpObject() {
	  		return new XMLHttpRequest();
	  	}

	  	var request = makeHttpObject();
	  	// request.open("GET", "mylist.json", false);
	  	// request.open("GET", "mylist.json", false);
	  	request.open("GET", "janac.json", false);
	  	request.send(null);

	  	var json1 = JSON.parse(request.responseText);
	 	// document.writeln("Origin is: ", json1.origin, "<br>");
	 	document.writeln("ID is: ", json1.name, "<br>");
	 	document.writeln("you are here");

	</script>
</body>
</html>