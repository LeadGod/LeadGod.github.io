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

	$( document ).on("leadGodDataLoaded", function () {
		if (gunsLoaded && itemsLoaded) {
			DYN_WEB.ContentSwap.setup(swapper);
		} else {
			console.log("Still waiting on JSON load callbacks...");
		}
	});

	$.getJSON('guns.json', function (data) {
	var object = null;
	var $section = $("#guns");

	for( var i = 0; i < data.length; i++ )
	{

		object = data[i];
		var $img = ('<img alt="' + object.Name + '" ' +
					'title="' + object.Name + '" ' +
					'class="gameObject"' +
					'src="/img/guns/' + object.Icon + '">'
		);

		var $a = $('<a href="#' + object.Name +
				'" class="showInfo" data-loc="' + object.Name + '">');

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
		$a.append($img);
		$section.append($a);
	}

	gunsLoaded = true;
	$( document ).trigger("leadGodDataLoaded");

	});

	$.getJSON('items.json', function (data) {
	var object = null;
	var $section = $("#items");

	for( var i = 0; i < data.length; i++ )
	{

		object = data[i];
		var $img = ('<img alt="' + object.Name + '" ' +
					'title="' + object.Name + '" ' +
					'class="gameObject"' +
					'src="/img/items/' + object.Icon + '">'
		);

		var $a = $('<a href="#' + object.Name +
				'" class="showInfo" data-loc="' + object.Name + '">');

		var itemHTML = '';
		itemHTML += '<h2>' + object.Name + '</h2>';
		itemHTML += '<p>"' + object.Quote + '"</p>';
		itemHTML += '<ul><li>Item Quality: ' + object.Quality + '</li>';
		itemHTML += '<li>Item Type: ' + object.Type + '</li>';
		itemHTML += '<li>Notes: ' + object.Effect + '</li></ul>';

		tempContent[object.Name] = itemHTML;
		$a.append($img);
		$section.append($a);
	}

	itemsLoaded = true;
	$( document ).trigger("leadGodDataLoaded");

	});

	var options =
    {
        srcNode: 'img',             // grid items (class, node)
        margin: '10px',             // margin in pixel, default: 0px
        width: '35px',             // grid item width in pixel, default: 220px
        max_width: '',              // dynamic gird item width if specified, (pixel)
        resizable: true,           // re-layout if window resize
        transition: 'all 0.5s ease' // support transition for CSS3, default: all 0.5s ease
    }
    $('.grid').gridify(options);
});