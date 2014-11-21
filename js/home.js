var jsonData;
function clicked(val)
{
    var ni = document.getElementById("btn");
    ni.innerHTML = val;
    $( "#positionWindow" ).popup( "close" );
//     document.getElementById("positionWindow").style.display = 'none';
}
$( document ).ready(function() {  

    $("#region").change(function () {
        
        alert("sssss");
       $.mobile.loading( "show", {
            text: "",
            textVisible: false,
            theme: "z",
            html: ""
        });
          filterData($("#title-filter-menu").val(),$("#title-filter-menu1").val());
    }); 

   $("#title-filter-menu1").change(function () {
       $.mobile.loading( "show", {
            text: "",
            textVisible: false,
            theme: "z",
            html: ""
        });
       filterData($("#title-filter-menu").val(),$("#title-filter-menu1").val());
    }); 

});
function filterData(regionData,priceData)
{
    //filter by region
        divElement="";
        tempRegionJsonData = [];
        tempPriceJsonData = [];
        counter=0;
    
        if(regionData == -1 || regionData == 0)
        {
            tempRegionJsonData = jsonData;
        }
        else
        {
             for (var i = 0; i < jsonData.length; i++) {
                    var region = jsonData[i]['region'];
                    if(regionData == region)
                    {
                         tempRegionJsonData[counter] = jsonData[i];
                        counter = counter + 1;
                    }
             }
        }

        //Filter by Price
        if(priceData == -1 || priceData == 0)
        {
            tempPriceJsonData = tempRegionJsonData;
        }
        else
        {
            counter = 0;
             for (var i = 0; i < tempRegionJsonData.length; i++) {
                    var price = tempRegionJsonData[i]['price'];
                    if(priceData >= price)
                    {
                         tempPriceJsonData[counter] = tempRegionJsonData[i];
                        counter = counter + 1;
                    }
             }
        }
        //Add filtered Data to div
         for (var i = 0; i < tempPriceJsonData.length; i++) {
                    var name = tempPriceJsonData[i]['name'];
                    var logo = tempPriceJsonData[i]['logo'];
                    var price = tempPriceJsonData[i]['price'];
                    var region = tempPriceJsonData[i]['region'];
                     divElement = divElement + "<a href='#about'><img src=\'" + logo + "\' alt=\'"+name+"\' style=\"width:100px;height:100px;\"></a>";
                   // divElement = divElement + "<a href='#about'><div style=\"width:100px;height:100px;border:1px solid black;background:url('"+logo+"');\"></div></a>";
             }
    addElement('content', divElement);
}
function addElement(divId, divString) {
    var ni = document.getElementById(divId);
    ni.innerHTML = divString;
     $.mobile.loading("hide");
}

function setClient(data, t, p) {
    console.log(data);
    var divElement = "";
     $.mobile.loading( "show", {
            text: "",
            textVisible: false,
            theme: "z",
            html: ""
        });
    for (var i = 0; i < data.length; i++) {
        jsonData = data;
        var name = data[i]['name'];
        var logo = data[i]['logo'];
        var price = data[i]['price'];
        var region = data[i]['region'];
      //  console.log(
        //    data[i]['name'] + " logo :" + data[i]['logo'] + " price :" + data[i]['price'] + " region " + data[i]['region']);
        //divElement = divElement + "<div class=\'col-xs-3 tile\'><img src=\'" + logo + "\'/><p>" + name + "</p></div>";
      // divElement = divElement + "<div class=\"content_div\"><a href='#about'><img src=\'" + logo + "\' alt=\'"+name+"\' style=\"width:100px;height:100px;\"><p style=\"margin-top:0%\">\'"+name+"\'</p></a></div>";
     //   divElement = divElement + "<a href='#about'><div style=\"width:100px;height:100px;border:1px solid black;background:url('"+logo+"');\"></div></a>";
         divElement = divElement + " <li class=\"iconLeft\" data-icon=\"arrow-l\"><a href='#about'><div style=\"display: inline-block; float: right;\"><img src=\'" + logo + "\' style=\"width:100px;height:100px\"/></div><div style=\"display: inline-block; float: right; padding-right: 10px;\"><h1>"+name+"</h1><h2 align=\"right\">"+price+"</h2></div></a></li>"
    }
    console.log(divElement);
    addElement('photographersList', divElement);
    // outputs 'Foo'
}

//For Region and Price Select menu
( function( $ ) {
function pageIsSelectmenuDialog( page ) {
    var isDialog = false,
        id = page && page.attr( "id" );
    $( ".filterable-select" ).each( function() {
        if ( $( this ).attr( "id" ) + "-dialog" === id ) {
            isDialog = true;
            return false;
        }
    });
    return isDialog;
}
$.mobile.document
    // Upon creation of the select menu, we want to make use of the fact that the ID of the
    // listview it generates starts with the ID of the select menu itself, plus the suffix "-menu".
    // We retrieve the listview and insert a search input before it.
    .on( "selectmenucreate", ".filterable-select", function( event ) {
        var input,
            selectmenu = $( event.target ),
            list = $( "#" + selectmenu.attr( "id" ) + "-menu" ),
            form = list.jqmData( "filter-form" );
        // We store the generated form in a variable attached to the popup so we avoid creating a
        // second form/input field when the listview is destroyed/rebuilt during a refresh.
        if ( !form ) {
            input = $( "<input data-type='search'></input>" );
            form = $( "<form></form>" ).append( input );
            input.textinput();
            list
                .before( form )
                .jqmData( "filter-form", form ) ;
            form.jqmData( "listview", list );
        }
        // Instantiate a filterable widget on the newly created selectmenu widget and indicate that
        // the generated input form element is to be used for the filtering.
        selectmenu
            .filterable({
                input: input,
                children: "> option[value]"
            })
            // Rebuild the custom select menu's list items to reflect the results of the filtering
            // done on the select menu.
            .on( "filterablefilter", function() {
                selectmenu.selectmenu( "refresh" );
            });
    })
    // The custom select list may show up as either a popup or a dialog, depending on how much
    // vertical room there is on the screen. If it shows up as a dialog, then the form containing
    // the filter input field must be transferred to the dialog so that the user can continue to
    // use it for filtering list items.
    .on( "pagecontainerbeforeshow", function( event, data ) {
        var listview, form;
        // We only handle the appearance of a dialog generated by a filterable selectmenu
        if ( !pageIsSelectmenuDialog( data.toPage ) ) {
            return;
        }
        listview = data.toPage.find( "ul" );
        form = listview.jqmData( "filter-form" );
        // Attach a reference to the listview as a data item to the dialog, because during the
        // pagecontainerhide handler below the selectmenu widget will already have returned the
        // listview to the popup, so we won't be able to find it inside the dialog with a selector.
        data.toPage.jqmData( "listview", listview );
        // Place the form before the listview in the dialog.
        listview.before( form );
    })
    // After the dialog is closed, the form containing the filter input is returned to the popup.
    .on( "pagecontainerhide", function( event, data ) {
        var listview, form;
        // We only handle the disappearance of a dialog generated by a filterable selectmenu
        if ( !pageIsSelectmenuDialog( data.toPage ) ) {
            return;
        }
        listview = data.prevPage.jqmData( "listview" ),
        form = listview.jqmData( "filter-form" );
        // Put the form back in the popup. It goes ahead of the listview.
        listview.before( form );
    });

   

})( jQuery );

    