
$(document).ready(function () {
	var ROW_LENGTH = 10;

	$.getJSON('guns.json', function (data) {
	var object = null;
	// var p = document.getElementById("guns");
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
		$span.append($img);
		$div.append($span);
	}

	});

	$.getJSON('items.json', function (data) {
	var object = null;
	// var p = document.getElementById("items");
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
		$span.append($img);
		$div.append($span);
	}

	});
});