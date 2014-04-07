var fillerPrototype = {
	// Defaults
	defaults: {
		source: 'lorem',
		randomize: false
	},

	// Sources
	SOURCES: {
		lorem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		pla: 'Com que hi ha tanta grip, han hagut de clausurar la Universitat. D’ençà d’aquest fet, el meu germà i jo vivim a casa, a Palafrugell, amb la família. Som dos estudiants desvagats. El meu germà, que és un gran afeccionat a jugar a futbol —malgrat haver-s’hi ja trencat un braç i una cama—, el veig purament a les hores de repàs. Ell fa la seva vida. Jo vaig tirant. No enyoro pas Barcelona i menys la Universitat. La vida de poble, amb els amics que hi tinc, m’agrada.',
	},
	
	// Instance options
	options: new Object(),
	
	// Elements to be filled	
	fillable: new Array(), 

	source: '',
	element: '',
	

	/**
	 * Methods
	 */

	/**
	 * Is Heading?
	 * Checks if tag is a heading
	 *
	 * @var tag, String
	 * @return bool
	 */
	isHeading: function (tag) {
		var h = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
		for (var i = 0; i < h.length; i++) {
			if (h[i] == tag) { return true; }
		}
		return false;
	},

	/**
	 * Strip Ending Punctuation
	 * Strips an ending dot or comma
	 *
	 * @var content, String
	 * @return String
	 */
	stripEndingPunctuation: function (content) {
		var lastCharacter = content.charAt(content.length - 1);
		if ( lastCharacter == ',' || lastCharacter == '.' ) {
			return content.substring(0, content.length - 1);
		}
		return content;
	},

	/**
	 * Get Content
	 * @return Array
	 */
	getContent: function () {
		var extension = this.element.getAttribute('filler'),
				content = [],
				limit = extension;
		
		// Fill the content array until the desired extension is reached
		do {
			var partial = [];

			var text;
			if ( this.options.randomize === true ) { 
				text = this.generateRandomOrder(limit);
			} else {
				text = this.source.split(' ', limit);
			}

			partial.push(text);
			content = content.concat.apply(content, partial);
					
			limit = extension - content.length;
		} 
		while ( content.length < extension );

		return this.clean(content);
	},

	/**
	 * Get Elements With Attribute
	 * Selects all elements that match a certain attribute
	 *
	 * @var attribute, String
	 * @return Array
	 */
	getAllElementsWithAttribute: function (attribute) {
	  var matchingElements = [];
	  var allElements = document.getElementsByTagName('*');
	  for (var i = 0, n = allElements.length; i < n; i++)
	  {
	    if (allElements[i].getAttribute(attribute))
	    {
	      // Element exists with attribute. Add to array.
	      matchingElements.push(allElements[i]);
	    }
	  }
	  return matchingElements;
	},

	/**
	 * Fill Elements
	 * Loops through all fillable elements and adds text to them
	 */
	fillElements: function () {
		this.fillable = this.getAllElementsWithAttribute('filler');
		
		for (var i = 0; i < this.fillable.length; i++) {
			this.element = this.fillable[i];
			this.element.innerHTML = this.getContent();
		}
	},

	/**
	 * Generate Random Order
	 * Returns source in random order
	 *
	 * @return Array
	 */
	generateRandomOrder: function (limit) {
		if ( this.options.randomize !== true ) return false;

		var parts = this.source.split('.');

		for (var i = 0; i < parts.length; i++) {
			if ( parts[i] === '' ) {
				parts.splice(parts.indexOf(i), 1);
			} else {
				parts[i] = parts[i].trim();
			}
		}

		return this.shuffle(parts).join('. ').split(' ', limit);
	},

	/**
	 *
	 */
	clean: function (content) {
		content = this.preventOrphans(content);

		if ( this.isHeading(this.element.tagName) ) {
			content = content.join(' ');
			return this.stripEndingPunctuation(content);
		} else {
			return content.join(' ');
		}
	},

	/**
	 *
	 */
	preventOrphans: function (content) {
		var affectedKey = content.slice((content.length - 2), (content.length - 1)).toString();
		var sep = affectedKey.charAt(affectedKey.length - 1);

		content[content.length - 2] = this.stripEndingPunctuation(content[content.length - 2]);
				
		if ( sep == '.' ) {
			content[content.length - 1] = content[content.length - 1].toLowerCase();
		}
		return content;
	},



	/**
	 * Shuffle
	 * The Fisher-Yates (aka Knuth) shuffle. 
	 * Returns an array keys in random order.
	 *
	 * @source https://github.com/coolaj86/knuth-shuffle
	 */
  shuffle: function (array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}

/* Constructor */
function Filler (arguments) {
	// Merge options
	for ( var k in this.defaults ) { this.options[k] = this.defaults[k]; }
	for ( var k in arguments ) 	{ this.options[k] = arguments[k]; }

	// Set source from options
	this.source = this.SOURCES[this.options.source];

	// Fill the goddam elements
	return this.fillElements();
}

Filler.prototype = fillerPrototype;
