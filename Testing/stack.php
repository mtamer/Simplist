<script type="text/javascript">
	function httpGet(url){
		var xmlHttp=null;

		xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", url, false);
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}

	document.writeln(httpGet("http://httpbin.org/get"));

	document.writeln("you are working at this line ");
</script>