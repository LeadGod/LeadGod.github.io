
$(document).ready(function () {
	var ROW_LENGTH = 10;

	var opts = {
    	className: 'showInfo',
    	displayId: 'itemInfo',
        displayDefault: true
    }

    var content = {

    }

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
                '" class="showInfo ' + object.Name + '"</a>');

        var itemHTML += '';
        var itemName += '<h2>' + object.Name + '</h2>';
        var itemQuote += '<p>"' + object.Quote + '"</p>';
        var itemType += '<ul><li>' + object.Type + '</li>';
        var itemClip += '<li>Clip Size: ' + object["Clip Size"] + '</li>';
        var itemAmmo += '<li>Ammo: ' + object.Ammo + '</li>';
        var itemNotes += '<li>Notes: ' + object.Notes + '</li></ul>';

        content[object.Name] = itemHTML;
        $a.append($img);
		$span.append($a);
		$div.append($span);
	}

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
                '" class="showInfo ' + object.Name + '"</a>');

        var itemHTML = '';
        var itemName += '<h2>' + object.Name + '</h2>';
        var itemQuote += '<p>"' + object.Quote + '"</p>';
        var itemType += '<ul><li>' + object.Type + '</li>';
        var itemEffect += '<li>Notes: ' + object.Effect + '</li></ul>';

        content[object.Name] = $itemHTML;
        $a.append($img);
        $span.append($a);
        $div.append($span);
	}

	});

    $( document ).dw_hoverSwapContent(content, opts);
});