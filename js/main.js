$.getJSON('guns.json', function (data) {
var o = null;
var ul = document.getElementById("guns");
var myArray = new Array();
document.open();

for( var i = 0; i < data.length; i++ )
{
    o = data[i];
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(o.Name));
    ul.appendChild(li);
}

function makeUL(array) {
    var list = document.createElement('ul');
    for(var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(array[i]));
        list.appendChild(item);
    }


  return list;
  }

});