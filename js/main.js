$.getJSON('guns.json', function (data) {
var o = null;
var ul = document.getElementById("guns");
console.dir(ul);
var myArray = new Array();

for( var i = 0; i < data.length; i++ )
{
    o = data[i];
    var li = document.createElement("li");
    li.appendChild(document.createTextNode('<img src="/img/guns/"' + o.Icon + '>'));
    ul.appendChild(li);
}

});