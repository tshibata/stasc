(function() {
	var lastElement;
	var lastComment;
	var scanHtml = function(o) {
		if (o.nodeType == 1) {
			lastElement = o;
		} else if (o.nodeType == 8) {
			lastComment = o;
		}
		for (var i = 0; i < o.childNodes.length; i++) {
			scanHtml(o.childNodes[i]);
		}
	};
	var scanJson = function(o, d) {
		var container;
		if (o.nodeType) {
			container = window[o.nodeType]();
		} else if (d) {
			container = d;
		} else {
			//FIXME: handle error
		}
		for (var key in o) {
			if (key !== "nodeType") {
				switch (Object.prototype.toString.call(o[key])) {
				case "[object Number]":
				case "[object String]":
					container[key] = o[key];
					break;
				case "[object Array]":
					for (var i = 0; i < o[key].length; i++) {
						container[key].appendChild(scanJson(o[key][i]));
					}
					break;
				default:
					container[key] = scanJson(o[key], container[key]);
					break;
				}
			}
		}
		return container;
	};
	scanHtml(document);
	var element = scanJson(JSON.parse(lastComment.nodeValue));
	lastElement.parentNode.insertBefore(element, lastElement);
})();

