$.getJSON('guns.json', function (data) {
var o = null;
var ul = document.getElementById("guns");
console.dir(ul);
var myArray = new Array();

for( var i = 0; i < data.length; i++ )
{
    o = data[i];
    var li = document.createElement("li");
	var img = document.createElement("img");
	img.setAttribute("src", "/img/guns/" + o.Icon);
	img.setAttribute("alt", o.Name);
    li.appendChild(img);
    ul.appendChild(li);
}

});

$.getJSON('items.json', function (data) {
var o = null;
var ul = document.getElementById("items");
console.dir(ul);
var myArray = new Array();

for( var i = 0; i < data.length; i++ )
{
    o = data[i];
    var li = document.createElement("li");
	var img = document.createElement("img");
	img.setAttribute("src", "/img/items/" + o.Icon);
	img.setAttribute("alt", o.Name);
    li.appendChild(img);
    ul.appendChild(li);
}

});