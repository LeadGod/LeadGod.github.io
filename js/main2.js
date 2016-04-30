// $.fn.hideReveal = function( options ) {
//     options = $.extend({
//         filter: '*',
//         hiddenStyle: { opacity: 0.2 },
//         visibleStyle: { opacity: 1 },
//     }, options );
//     this.each( function() {
//         var $items = $(this).children();
//         var $visible = $items.filter( options.filter );
//         var $hidden = $items.not( options.filter );
//         // reveal visible
//         $visible.animate( options.visibleStyle );
//         // hide hidden
//         $hidden.animate( options.hiddenStyle );
//     });
// };

$(document).ready(function () {
	var ROW_LENGTH = 10;
	var gunsLoaded  = false;
	var itemsLoaded = false;

	var swapper = {
		className: 'showInfo',
		displayId: 'itemInfo',
		displayDefault: true,
		restoreDefault: false,

		content: {
		}
	}
	var tempContent = swapper.content;

	// var qsRegex;
	// var $grid1 = $('.grid1').isotope({
	// 	// options
	// 	itemSelector: '.grid-item1',
	// 	layoutMode: 'fitRows',
	// 	fitRows: {
	// 		gutter: 10
	// 	}
	// });

	// var $grid2 = $('.grid2').isotope({
	// 	// options
	// 	itemSelector: '.grid-item2',
	// 	layoutMode: 'fitRows',
	// 	fitRows: {
	// 		gutter: 10
	// 	}
	// });

	// // use value of search field to filter
	// var $search = $('.search').keyup( debounce( function() {
	// 	qsRegex = new RegExp( $search.val(), 'gi' );
	// 	$grid1.hideReveal({		filter: function() {
	// 		return qsRegex ? $(this).attr('data-name').match( qsRegex ) : true;
	// 	}});
	// 	$grid2.hideReveal({		filter: function() {
	// 		return qsRegex ? $(this).attr('data-name').match( qsRegex ) : true;
	// 	}});
	// }, 200 ) );

	// // debounce so filtering doesn't happen every millisecond
	// function debounce( fn, threshold ) {
	// 	var timeout;
	// 	return function debounced() {
	// 		if ( timeout ) {
	// 			clearTimeout( timeout );
	// 		}
	// 		function delayed() {
	// 			fn();
	// 			timeout = null;
	// 		}
	// 		timeout = setTimeout( delayed, threshold || 100 );
	// 	}
	// }

	$( document ).on("leadGodDataLoaded", function () {
		if (gunsLoaded && itemsLoaded) {
			DYN_WEB.ContentSwap.setup(swapper);
		}
	});

	$.getJSON('guns.json', function (data) {
	var object = null;
	var $guns = $("#guns");

	for( var i = 0; i < data.length; i++ )
	{
		object = data[i];

		var str = object.Name;
		var res = str.replace(/ /g, "-").replace("'", "_");
		var $div = $('<div class="grid-item1" data-name="' + object.Name + '" />');
		var $img = ('<img alt="' + object.Name + '" ' +
					'title="' + object.Name + '" ' +
					'class="gameObject gameObject-' + res +
					'" src="/img/trans.png">'
					);
		var $a = $('<a href="#' + object.Name +
				'" class="showInfo" data-loc="' + object.Name + '">');

		$a.append($img);
		$div.append($a);
		$guns.append($div);
		// $grid1.isotope('insert', $div);

		// Item descriptions
		var itemHTML = '';
		itemHTML += '<h2>' + object.Name + '</h2>';
		itemHTML += '<p>"' + object.Quote + '"</p>';
		itemHTML += '<ul><li>Gun Quality: ' + object.Quality + '</li>';
		itemHTML += '<li>Gun Type: ' + object.Type + '</li>';
		itemHTML += '<li>Magazine Size: ' + object["Magazine Size"] + '</li>';
		itemHTML += '<li>Ammo Capacity: ' + object["Ammo Capacity"] + '</li>';
		itemHTML += '<li>Damage: ' + object.Damage + '</li>';
		itemHTML += '<li>Fire Rate: ' + object["Fire Rate"] + '</li>';
		itemHTML += '<li>Shot Speed: ' + object["Shot Speed"] + '</li>';
		itemHTML += '<li>Range: ' + object.Range + '</li>';
		itemHTML += '<li>Force: ' + object.Force + '</li>';
		itemHTML += '<li>Spread: ' + object.Spread + '</li>';
		itemHTML += '<li>Notes: ' + object.Notes + '</li></ul>';

		tempContent[object.Name] = itemHTML;
	}

	gunsLoaded = true;
	$( document ).trigger("leadGodDataLoaded");

	});

	$.getJSON('items.json', function (data) {
	var object = null;
	var $items = $("items");

	for( var i = 0; i < data.length; i++ )
	{
		object = data[i];

		var str = object.Name;
		var res = str.replace(/ /g, "-").replace("'", "_").replace("+", "-");
		var $div = $('<div class="grid-item2" data-name="' + object.Name + '" />');
		var $img = ('<img alt="' + object.Name + '" ' +
					'title="' + object.Name + '" ' +
					'class="gameObject gameObject-' + res +
					'" src="/img/trans.png">'
					);
		var $a = $('<a href="#' + object.Name +
				'" class="showInfo" data-loc="' + object.Name + '">');

		$a.append($img);
		$div.append($a);
		$items.append($div);
		// $grid2.isotope('insert', $div);

		// Item descriptions
		var itemHTML = '';
		itemHTML += '<h2>' + object.Name + '</h2>';
		itemHTML += '<p>"' + object.Quote + '"</p>';
		itemHTML += '<ul><li>Item Quality: ' + object.Quality + '</li>';
		itemHTML += '<li>Item Type: ' + object.Type + '</li>';
		itemHTML += '<li>Notes: ' + object.Effect + '</li></ul>';

		tempContent[object.Name] = itemHTML; 
	}

	itemsLoaded = true;
	$( document ).trigger("leadGodDataLoaded");
	});

	// Layout fixes and forced sorting.
	// $grid1.imagesLoaded( function() {
	// 	$grid1.isotope('layout');
	// });
	// $grid2.imagesLoaded(function() {
	// 	$grid2.isotope('layout');
	// });


});