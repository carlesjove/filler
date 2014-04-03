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
		var content = SOURCES[opt.source].split(' ', $fillable[i].getAttribute('filler'));
		$fillable[i].innerHTML = content.join(' ');
	}

	/**
	 * Functions
	 */

	// Get elements
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
}
