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
	img.setAttribute("width", "200%");
	img.setAttribute("height", "200%");
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
	img.setAttribute("width", "200%");
	img.setAttribute("height", "200%");
    p.appendChild(img);
}

});