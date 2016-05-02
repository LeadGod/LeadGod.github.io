$(document).ready(function() {

    var swapper = {
        className: 'showInfo',
        displayId: 'itemInfo',
        displayDefault: true,
        restoreDefault: false,

        content: {}
    }

    var tempContent = swapper.content;
    $.getJSON('/JSON/guns.json', function(data) {
        var object = null;
        var $guns = $("#guns");

        for (var i = 0; i < data.length; i++) {
            object = data[i];

            var str = object.Name;
            var res = str.replace(/ /g, "-").replace("'", "_");
            var $div = $('<div class="grid-item1" data-name="' + object.Name.toLowerCase() + '" />');
            var $img = ('<img alt="' + object.Name + '" ' +
                'title="' + object.Name + '" ' +
                'class="gameObject gameObject-' + res +
                '" src="/img/trans.png">'
            );
            var $a = $('<a href="#modal' + res +
                '" class="showInfo" data-loc="' + object.Name + '" data-toggle="modal">');

            $a.append($img);
            $div.append($a);

            var $container = $('<div class="modal fade" id="modal' + res + '" tabindex="-1" role="dialog" aria-labelledby="modal' + res + '" aria-hidden="true" />');
            var $dialog = $('<div class="modal-dialog" />')
            var $content = $('<div class="modal-content" />')
            var $header = $('<div class="modal-header" />');

            var $close = $('<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
            var $title = $('<h4 class="modal-title" id="modalLabel">' + object.Name + '</h4>');

            $header.append($close);
            $header.append($title);
            $content.append($header);

            var $body = $('<div class="modal-body" />');

            // Item descriptions
            var itemHTML = '';
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

            $body.append(itemHTML);
            $content.append($body);

            $dialog.append($content);
            $container.append($dialog);
            $div.append($container);

            $guns.append($div);
        }
    });

    $.getJSON('/JSON/items.json', function(data) {
        var object = null;
        var $items = $("#items");

        for (var i = 0; i < data.length; i++) {
            object = data[i];

            var str = object.Name;
            var res = str.replace(/ /g, "-").replace("'", "_");
            var $div = $('<div class="grid-item2" data-name="' + object.Name.toLowerCase() + '" />');
            var $img = ('<img alt="' + object.Name + '" ' +
                'title="' + object.Name + '" ' +
                'class="gameObject gameObject-' + res +
                '" src="/img/trans.png">'
            );
            var $a = $('<a href="#modal' + res +
                '" class="showInfo" data-loc="' + object.Name + '" data-toggle="modal">');

            $a.append($img);
            $div.append($a);

            var $container = $('<div class="modal fade" id="modal' + res + '" tabindex="-1" role="dialog" aria-labelledby="modal' + res + '" aria-hidden="true" />');
            var $dialog = $('<div class="modal-dialog" />')
            var $content = $('<div class="modal-content" />')
            var $header = $('<div class="modal-header" />');

            var $close = $('<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
            var $title = $('<h4 class="modal-title" id="modalLabel">' + object.Name + '</h4>');

            $header.append($close);
            $header.append($title);
            $content.append($header);

            var $body = $('<div class="modal-body" />');

            // Item descriptions
            var itemHTML = '';
            itemHTML += '<p>"' + object.Quote + '"</p>';
            itemHTML += '<ul><li>Item Quality: ' + object.Quality + '</li>';
            itemHTML += '<li>Item Type: ' + object.Type + '</li>';
            itemHTML += '<li>Notes: ' + object.Effect + '</li></ul>';

            $body.append(itemHTML);
            $content.append($body);

            $dialog.append($content);
            $container.append($dialog);
            $div.append($container);

            $items.append($div);
        }
    });
});
