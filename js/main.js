$(window).load(function () {
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

	// init Isotope
	var $grid1 = $('.grid1').isotope({
		// options
		itemSelector: '.grid-item1',
		layoutMode: 'fitRows',
		fitRows: {
			gutter: 10
		}
	});

	$( document ).on("leadGodDataLoaded", function () {
		if (gunsLoaded && itemsLoaded) {
			DYN_WEB.ContentSwap.setup(swapper);
		} else {
			console.log("Still waiting on JSON load callbacks...");
		}
	});

	$.getJSON('guns.json', function (data) {
	var object = null;

	for( var i = 0; i < data.length; i++ )
	{
		var $div = $('<div class="grid-item1" />');

		object = data[i];
		var $img = ('<img alt="' + object.Name + '" ' +
					'title="' + object.Name + '" ' +
					'class="gameObject"' +
					'src="/img/guns/' + object.Icon + '">'
		);

		var $a = $('<a href="#' + object.Name +
				'" class="showInfo" data-loc="' + object.Name + '">');

		$a.append($img);
		$div.append($a);
		$grid1.isotope('insert', $div);

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

	// init Isotope
	var $grid2 = $('.grid2').isotope({
		// options
		itemSelector: '.grid-item2',
		layoutMode: 'fitRows',
		fitRows: {
			gutter: 10
		}
	});

	$.getJSON('items.json', function (data) {
	var object = null;

	for( var i = 0; i < data.length; i++ )
	{
		var $div = $('<div class="grid-item2" />');

		object = data[i];
		var $img = ('<img alt="' + object.Name + '" ' +
					'title="' + object.Name + '" ' +
					'class="gameObject"' +
					'src="/img/items/' + object.Icon + '">'
		);

		var $a = $('<a href="#' + object.Name +
				'" class="showInfo" data-loc="' + object.Name + '">');
		$a.append($img);
		$div.append($a);
		$grid2.isotope('insert', $div);

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

	// layout Isotope after each image loads
	$grid1.imagesLoaded() function() {
		$grid1.isotope('layout');
	};
	$grid2.imagesLoaded(function() {
		$grid2.isotope('layout');
	};
});