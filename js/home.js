function addElement(divId, divString) {
    var ni = document.getElementById(divId);
    ni.innerHTML = divString;
}

function setClient(data, t, p) {
    console.log(data);
    var divElement = "";

    for (var i = 0; i < data.length; i++) {
        var name = data[i]['name'];
        var logo = data[i]['logo'];
        var price = data[i]['price'];
        var region = data[i]['region'];
        console.log(

            data[i]['name'] + " logo :" + data[i]['logo'] + " price :" + data[i]['price'] + "region " + data[i]['region']);
        //divElement = divElement + "<div class=\'col-xs-3 tile\'><img src=\'" + logo + "\'/><p>" + name + "</p></div>";
        divElement = divElement + "<img src=\'" + logo + "\'/>";
    }
    console.log(divElement);
    addElement('content', divElement);
    // outputs 'Foo'
}