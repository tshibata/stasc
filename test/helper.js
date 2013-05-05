window.onload = function() {
	var req = new XMLHttpRequest();
	var href = "http://" + window.location.host + (test() ? "/ok" : "/ng");
	req.open("GET", href);
	req.send("");
	window.close();
};

