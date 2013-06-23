
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
	var g = function(o) {
		var container;
		switch (Object.prototype.toString.call(o)) {
		case "[object Number]":
			return document.createTextNode(o);
		case "[object String]":
			return document.createTextNode('"' + o + '"');
		case "[object Array]":
			container = doc.list();
			for (var i = 0; i < o.length; i++) {
				container.Items.appendChild(doc.item(g(o[i])));
			}
			return container;
		default:
			container = doc.map();
			for (var key in o) {
				if (key === "nodeType") {
					container.Type = o.nodeType;
				} else {
					container.Entries.appendChild(doc.entry(key, g(o[key])));
				}
			}
			return container;
		}
	};
	f(document);
	var element = g(JSON.parse(lastComment.nodeValue));
	lastElement.parentNode.insertBefore(element, lastElement);
})();

