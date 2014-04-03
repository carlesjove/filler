var Filler = function (options) {

	// Defaults
	var defaults = {
		source: 'lorem'
	}

	// Sources
	var SOURCES = {
		lorem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		pla: 'Com que hi ha tanta grip, han hagut de clausurar la Universitat. D’ençà d’aquest fet, el meu germà i jo vivim a casa, a Palafrugell, amb la família. Som dos estudiants desvagats. El meu germà, que és un gran afeccionat a jugar a futbol —malgrat haver-s’hi ja trencat un braç i una cama—, el veig purament a les hores de repàs. Ell fa la seva vida. Jo vaig tirant. No enyoro pas Barcelona i menys la Universitat. La vida de poble, amb els amics que hi tinc, m’agrada.',
	}
	
	// Merge options
	var opt = {};
	for ( var k in defaults ) { opt[k] = defaults[k]; }
	for ( var k in options ) 	{ opt[k] = options[k]; }

	// Get all elements to be filled
	var $fillable = getAllElementsWithAttribute('filler');

	// Fill the goddam elements
	for (var i = 0; i < $fillable.length; i++) {
		var $el = $fillable[i],
				content = getContent($el);
		
		if ( isHeading($el.tagName) ) {
			$el.innerHTML = stripEndingPunctuation(content.join(' '));
		} else {
			$el.innerHTML = content.join(' ');
		}
	}

	/**
	 * Functions
	 */

	/**
	 * Get Elements With Attribute
	 * Selects all elements that match a certain attribute
	 *
	 * @var attribute, String
	 * @return Array
	 */
	function getAllElementsWithAttribute(attribute) {
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
	}

	/**
	 * Is Heading?
	 * Checks if tag is a heading
	 *
	 * @var tag, String
	 * @return bool
	 */
	function isHeading(tag) {
		var h = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
		for (var i = 0; i < h.length; i++) {
			if (h[i] == tag) { return true; }
		}
		return false;
	}

	/**
	 * Strip Ending Punctuation
	 * Strips an ending dot or comma
	 *
	 * @var content, String
	 * @return String
	 */
	function stripEndingPunctuation(content) {
		var lastCharacter = content.charAt(content.length - 1);
		if ( lastCharacter == ',' || lastCharacter == '.' ) {
			return content.substring(0, content.length - 1);
		}
		return content;
	}

	/**
	 * Get Content
	 * @return Array
	 */
	function getContent(el) {
		var extension = el.getAttribute('filler'),
				content = [],
				limit = extension;
		
		// Fill the content array until the desired extension is reached
		do {
			var partial = [];
			
			partial.push(SOURCES[opt.source].split(' ', limit));
			content = content.concat.apply(content, partial);
					
			limit = extension - content.length;
		} 
		while ( content.length < extension );

		return content;
	}
}
