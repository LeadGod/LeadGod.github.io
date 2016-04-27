
$(document).ready(function () {
	var ROW_LENGTH = 10;
	var gunsLoaded  = false;
	var itemsLoaded = false;

	var opts = {
		className: 'showInfo',
		displayId: 'itemInfo',
		displayDefault: true,
		restoreDefault: false
	}

	var content = {

	}

	$( document ).on("leadGodDataLoaded", function () {
		if (gunsLoaded && itemsLoaded) {
			$( document ).dw_hoverSwapContent(content, opts);
		} else {
			console.log("Still waiting on JSON load callbacks...");
		}
	});

	$.getJSON('guns.json', function (data) {
	var object = null;
	var $section = $("#guns");
	var $div = $('<div class="iconRow">');
	var $span = $('<span class="iconContainer">');

	for( var i = 0; i < data.length; i++ )
	{
		$span = $('<span class="iconContainer">');

		if ((i + 2) % ROW_LENGTH === 0) {
			$div = $('<div class="iconRow">');
			$section.append($div);
		}

		object = data[i];
		var $img = ('<img alt="' + object.Name + '" ' +
					'title="' + object.Name + '" ' +
					'class="gameObject"' +
					'src="/img/guns/' + object.Icon + '">'
		);

		var $a = $('<a href="#" id="' + object.Name +
				'" class="showInfo" data-loc="' + object.Name + '">');

		var itemHTML = '';
		itemHTML += '<h2>' + object.Name + '</h2>';
		itemHTML += '<p>"' + object.Quote + '"</p>';
		itemHTML += '<ul><li>' + object.Type + '</li>';
		itemHTML += '<li>Clip Size: ' + object["Clip Size"] + '</li>';
		itemHTML += '<li>Ammo: ' + object.Ammo + '</li>';
		itemHTML += '<li>Notes: ' + object.Notes + '</li></ul>';

		content[object.Name] = itemHTML;
		$a.append($img);
		$span.append($a);
		$div.append($span);
	}

	gunsLoaded = true;
	$( document ).trigger("leadGodDataLoaded");

	});

	$.getJSON('items.json', function (data) {
	var object = null;
	var $section = $("#items");
	var $div = $('<div class="iconRow">');
	var $span = $('<span class="iconContainer">');

	for( var i = 0; i < data.length; i++ )
	{
		$span = $('<span class="iconContainer">');

		if ((i + 2) % ROW_LENGTH === 0) {
			$div = $('<div class="iconRow">');
			$section.append($div);
		}

		object = data[i];
		var $img = ('<img alt="' + object.Name + '" ' +
					'title="' + object.Name + '" ' +
					'class="gameObject"' +
					'src="/img/items/' + object.Icon + '">'
		);

		var $a = $('<a href="#" id="' + object.Name +
				'" class="showInfo" data-loc="' + object.Name + '">');

		var itemHTML = '';
		itemHTML += '<h2>' + object.Name + '</h2>';
		itemHTML += '<p>"' + object.Quote + '"</p>';
		itemHTML += '<ul><li>' + object.Type + '</li>';
		itemHTML += '<li>Notes: ' + object.Effect + '</li></ul>';

		content[object.Name] = itemHTML;
		$a.append($img);
		$span.append($a);
		$div.append($span);
	}

	itemsLoaded = true;
	$( document ).trigger("leadGodDataLoaded");

	});
});