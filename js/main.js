$.getJSON('guns.json', function (data) {
var o = null;
var p = document.getElementById("guns");
var myArray = new Array();

for( var i = 0; i < data.length; i++ )
{
    o = data[i];
	var img = document.createElement("img");
	img.setAttribute("src", "/img/guns/" + o.Icon);
	img.setAttribute("alt", o.Name);
	img.setAttribute("id", "gameObject");
    p.appendChild(img);
}

});

$.getJSON('items.json', function (data) {
var o = null;
var p = document.getElementById("items");
var myArray = new Array();

for( var i = 0; i < data.length; i++ )
{
    o = data[i];
	var img = document.createElement("img");
	img.setAttribute("src", "/img/items/" + o.Icon);
	img.setAttribute("alt", o.Name);
	img.setAttribute("id", "gameObject")
    p.appendChild(img);
}

});

$( "img" ).each( function() {
    var $img = $( "#gameObject" ); 
	$img.width( $img.width() * 2 );
});