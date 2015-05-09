var UID = 0;

function getImageSource(cardname) {
	if(cardname === undefined || cardname.length == 0) {
		return;
	}

	var prefix = "http://www.wizards.com/global/images/magic/general/";
	var filename = cardname + ".jpg";

	filename = filename.toLowerCase();
	filename = filename.replace( / /g, "_" );
	filename = filename.replace( /'/g, "" ); //'
	filename = filename.replace( /,/g, "" );
	filename = filename.replace( /-/g, "_" );
	filename = filename.replace( /\/\//g, "_" );

	return prefix + filename;
}

function installCardTags() {
	var elements = document.getElementsByTagName("div");
	var elementsZeta = document.getElementsByTagName("td");   

	for(var ix = 0; ix < elementsZeta.length; ix++) {
		if(elementsZeta[ix].className == "c_post") {
			fixPost(elementsZeta[ix]);
		}

		if(elementsZeta[ix].className == "pformright") {
			inEl = elementsZeta[ix].getElementsByTagName("input");

			if(inEl.length > 0 && inEl[0].className == "codebuttons") {
				addButtons(elementsZeta[ix]);
			}
		}
	}   

	for(ix = 0; ix < elements.length; ix++) {
		if(elements[ix].className == "content") {
			fixPost(elements[ix].parentNode);
		}
	}
}

var CARD_open = 0;
var CARDIMG_open = 0;


function makeSimpleTagButton(tagName) {
	this[tagName + "_open"] = 0;
	
	var button = document.createElement("input");
	button.setAttribute("type", "button");
	button.setAttribute("value", " " + tagName + " ");
	button.className = "codebuttons";
	button.name = tagName;
	button.setAttribute("onclick", "simpletag('" + tagName + "')");

	return button;
}

function addButtons(inner) {
	var el = inner.getElementsByTagName("input");
	var lastEl = el[el.length - 1];
	
	while(lastEl.className != "codebuttons") {
		lastEl = lastEl.previousSibling;
	}

	var deckButton = makeSimpleTagButton("DECK");
	var cardButton = makeSimpleTagButton("CARD");
	var cardImgButton = makeSimpleTagButton("CARDIMG");

	lastEl.parentNode.insertBefore(cardButton, lastEl.nextSibling);
	lastEl.parentNode.insertBefore(cardImgButton, lastEl.nextSibling);
	lastEl.parentNode.insertBefore(deckButton, lastEl.nextSibling);   

	lastEl.parentNode.insertBefore(document.createElement("br"), lastEl.nextSibling);

}



function newWindow(url) {
	window.open(url,'Gatherer','width=725,height=600,resizable=yes');
}


function replaceTags(element, tag, getReplacement) {
	var begin, end;
	var opening = "[" + tag + "]";
	var closing = "[/" + tag + "]";

	while((begin = element.innerHTML.toLowerCase().lastIndexOf(opening)) != -1 ) {
		if((end = element.innerHTML.toLowerCase().indexOf(closing, begin)) == -1 ) {
			break;
		}

		var innerText = element.innerHTML.substring( begin + opening.length, end );
		var replacement = getReplacement( innerText );

		if(undefined != replacement) {      
			element.innerHTML = element.innerHTML.substring(0, begin) + replacement + element.innerHTML.substring(end + closing.length);
		} else {
			return;
		}
	}
}


// http://www.howtocreate.co.uk/tutorials/javascript/browserwindow

function getScrollXY() {
	var scrOfX = 0, scrOfY = 0;
	if(typeof(window.pageYOffset ) == 'number') {
		//Netscape compliant
		scrOfY = window.pageYOffset;
		scrOfX = window.pageXOffset;
	} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
		//DOM compliant
		scrOfY = document.body.scrollTop;
		scrOfX = document.body.scrollLeft;
	} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
		//IE6 standards compliant mode
		scrOfY = document.documentElement.scrollTop;
		scrOfX = document.documentElement.scrollLeft;
	}
	return { x : scrOfX, y : scrOfY };
}


//http://www.quirksmode.org/js/findpos.html

function findPos(obj) {
	var curleft = curtop = 0;
	if(obj) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while(obj = obj.offsetParent);
	}
	return { left: curleft, top: curtop };
}

function Hover() {};

Hover.lastID = 0;
Hover.show = function( cardname, hid) {
	Hover.hide();
	Hover.sib = document.getElementById("id-" + hid);
	if(Hover.sib != undefined && Hover.sib.parentNode != undefined) {
		var offsets = getScrollXY();
		var pos = findPos( Hover.sib );

		Hover.el = document.createElement("div");
		Hover.el.style.border= "3px solid #000000";
		Hover.el.style.position = "absolute";
		Hover.el.style.left = pos.left + "px";

		var divHeight = 291;
		var topAbove = pos.top - divHeight;

		if(topAbove >= offsets.y) {
			Hover.el.style.top = pos.top - divHeight + "px";
		} else {
			Hover.el.style.top = pos.top + Hover.sib.offsetHeight + "px";
		}

		var img = document.createElement("img");
		img.src = cardname;

		Hover.el.appendChild( img );
		setTimeout("if( Hover.el != undefined ) { document.body.appendChild( Hover.el ); }", 200);
	}
};

Hover.hide = function() {
	if(Hover.el != undefined) {
		if(Hover.el.parentNode != undefined) {
			Hover.el.parentNode.removeChild( Hover.el );
		}
	}

	Hover.sib = undefined;
	Hover.el = undefined;
};


function proxyWindow(deck) {
	OpenWindow = window.open("", "newwin", "toolbar=no,menubar=no,scrollbars=yes");
	OpenWindow.document.write("<TITLE>Printable Proxies</TITLE>");

	var lines = deck.split ("&");
	var text = "";

	for(var i = 0; i < lines.length - 1; i++) {
		text += "<img src=" + lines[i] + " />";
	}

	OpenWindow.document.write(text);
	OpenWindow.document.write("</BODY></HTML>");
	OpenWindow.document.close();
}


function fixPost(post) {
	replaceTags(post, "deck", function(inner) {
		inner = inner.replace(/<br>/gi, "\n");

		var lines = inner.split("\n");
		var text = "";
		var cardList = "";

		for(var ix = 0; ix < lines.length; ix++) {
			var parsed = parseLine(lines[ix]);

			if(parsed == undefined) {
				text += lines[ix] + "<br>";
			} else {
				text += parsed.count + " [card]" + parsed.name + "[/card]<br>";
				for(var jx = 0; jx < parsed.count; jx++) {
					cardList += getImageSource(parsed.name) + "&";
				}
			}
		}

		var anchor = "";
		anchor += "<a onclick=";
		anchor += "proxyWindow(";
		anchor += "\'" + cardList + "\'";
		anchor += ")>Print Proxies</a>";
		
		text += "<br>" + anchor + "<br>";
		return text;
	});

	replaceTags( post, "card", function(inner) {
		var escaped = inner.replace( /'/g, "\\'" ); //'"
		var strID = "" + ++Hover.lastID;
		var imgURL = "http://ww2.wizards.com/gatherer/CardDetails.aspx?name=" + escaped;
		var href = 'javascript:newWindow(\'' + imgURL + '\');';
		var mouseover = 'Hover.show(\'' + getImageSource(inner) + '\', ' + strID + ');"';
		var mouseout = 'Hover.hide();';

		var anchor = "";
		anchor += '<a id="' + 'id-' + strID + '" ';
		anchor += ' href="' + href + '" ';
		anchor += ' onmouseover="' + mouseover + '" ';
		anchor += ' onmouseout="' + mouseout + '" ';
		anchor += '>' + inner + '</a>';

		return anchor;
	});

	replaceTags( post, "cardimg", function cardImgReplace(inner) {
		var url = getImageSource(inner);
		if(url != undefined) {
			return '<img style="border: 3px solid #000000" src="' + url + '" alt="' + inner + '"/>';
		}

		return undefined;
	});
}

