(function() {
	var lastElement;
	var lastComment;
	var f = function(o) {
		if (o.nodeType == 1) {
			lastElement = o;
		} else if (o.nodeType == 8) {
			lastComment = o;
		}
		for (var i = 0; i < o.childNodes.length; i++) {
			f(o.childNodes[i]);
		}
	};
	var h = function(o, d) {
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
						container[key].appendChild(h(o[key][i]));
					}
					break;
				default:
					container[key] = h(o[key], container[key]);
					break;
				}
			}
		}
		return container;
	};
	f(document);
	var element = h(JSON.parse(lastComment.nodeValue));
	lastElement.parentNode.insertBefore(element, lastElement);
})();

