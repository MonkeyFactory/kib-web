function parseLine( line ) {
	line = line.replace(/^\s*/, "");
	if(line.toLowerCase().indexOf("sideboard") == 0 || line.toLowerCase().indexOf("maindeck") == 0 || line.match(/^\s*(\/\/.*)?\s*$/)) {
		return undefined;
	}

	var cardname = line;
	var cardcount = 1;
	
	// ignore extra info for lists from apprentice
	cardname = cardname.replace(/^SB: /, "");
	cardname = cardname.replace(/\[.*?\]/, "" );

	if(/^\d+x?\s+/.test(cardname)) {
		var name = cardname.replace(/^\d+\s*(x\s+)?/, "");
		cardcount = cardname.substr(0, cardname.length - name.length);
		cardcount = parseInt(cardcount);
		cardname = name;
	}   

	return { name : cardname, count : cardcount };
}

function Decklist(text) {
	this.maindeck = new Array;
	this.sideboard = new Array;
	
	if(typeof(text) != "string" ) {
		return this;
	}

	var lines = text.split("\n");
	var mode = "maindeck";
	
	for(var ix = 0; ix < lines.length; ix++ ) {
		var line = lines[ix].replace(/^\s*/, "");

		if(line.toLowerCase().indexOf("sideboard") == 0 || line.toLowerCase().indexOf("// sideboard") == 0) {
			mode = "sideboard";
		} else if(line.toLowerCase().indexOf("maindeck") == 0) {
			mode = "maindeck";
		} else {
			var parsed = parseLine(line);
			if(parsed != undefined) {
				this[mode].push( parsed );
			}
		}
	}
}

