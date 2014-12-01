var jsonData = [];
var regionData = [];
var subCategoryData = [];
var selectedRegionID = 0;
var selectedSubCategoryID = 0;

function regionClicked(val) {
    var ni = document.getElementById("regionBtn");
    ni.innerHTML = val;
    $("#regionWindow").popup("close");
}

function subCategoryClicked(val) {
    var ni = document.getElementById("subCategoryBtn");
    ni.innerHTML = val;
    $("#subCategoryWindow").popup("close");
}

$(document).ready(function() {

    $("#region").change(function() {

        alert("sssss");
        // $.mobile.loading( "show", {
        //      text: "",
        //      textVisible: false,
        //      theme: "z",
        //      html: ""
        //  });
        filterData($("#title-filter-menu").val(), $("#title-filter-menu1").val());
    });

    $("#title-filter-menu1").change(function() {
        // $.mobile.loading( "show", {
        //      text: "",
        //      textVisible: false,
        //      theme: "z",
        //      html: ""
        //  });
        filterData($("#title-filter-menu").val(), $("#title-filter-menu1").val());
    });

    //Contact Us
    $('#send-feedback').click(function() {
        var url = 'send.php';
        var error = 0;
        var $contactpage = $(this).closest('.ui-page');
        var $contactform = $(this).closest('.contact-form');
        $('.required', $contactform).each(function(i) {
            if ($(this).val() === '') {
                error++;
            }
        }); // each
        if (error > 0) {
            alert('Please fill in all the mandatory fields. Mandatory fields are marked with an asterisk *.');
        } else {
            //var firstname = $contactform.find('input[name="firstname"]').val();
            var firstname = $('#firstname').val()
                //var surname = $contactform.find('input[name="surname"]').val();
            var address = $('#address').val();
            var mobilephone = $('#mobilephone').val();
            //var email = $contactform.find('input[name="email"]').val();	
            var message = $('#message').val();

            var body = "First Name : " + firstname + "\n Address : " + address + "\n Contact No. : " + mobilephone + "\n Message : \n" + message;
            alert(body);
            window.open("mailto:amit.stiffy90@gmail.com?subject=The%20subject%20of%20the%20email&body=" + body + "");
            //submit the form
            /*	$.ajax({
			type: "GET",
			url: url,
			data: {firstname:firstname, surname:surname, state: state, mobilephone: mobilephone, email: email, message: message},
            success: function (data) {
				if (data == 'success') {
					// show thank you 
					$contactpage.find('.contact-thankyou').show();
					$contactpage.find('.contact-form').hide();
				}  else {
					alert('Unable to send your message. Please try again.');
				}
			}
		}); */

        }
        return false;
    });

    $("#seg").on("click", ">li", function() {
        var catID = $(this).attr('value');
        $('#subCategory').empty();
        $('#subCategory').append($("<li id=0>").append("<a href=\"javascript:subCategoryClicked('ALL')\" data-rel=\"dialog\"  class=\"ui-btn ui-btn-icon-right ui-icon-carat-l\">ALL</a>"));
        for (var i = 0; i < subCategoryData.length; i++) {
            if (subCategoryData[i]['typeid'] == catID) {
                var name = subCategoryData[i]['name'];
                var id = subCategoryData[i]['id'];
                $('#subCategory').append($("<li id=" + id + " class=\"iconLeft\">").append("<a href=\"javascript:subCategoryClicked('" + name + "')\" data-rel=\"dialog\" class=\"ui-btn ui-btn-icon-right ui-icon-carat-l\">" + name + "</a>"));
            }
            /*else if(catID == 1)
			{
				var name = subCategoryData[i]['name'];
				var id = subCategoryData[i]['id'];
				$('#subCategory').append($("<li id="+id+">").append("<a href=\"javascript:subCategoryClicked('"+name+"')\" data-rel=\"dialog\" class=\"ui-btn ui-btn-icon-right ui-icon-carat-r\">"+name+"</a>"));
			}*/
        }
        var ni = document.getElementById("regionBtn");
        ni.innerHTML = "Region";
        ni = document.getElementById("subCategoryBtn");
        ni.innerHTML = "Sub-Category";
        selectedRegionID = 0;
        selectedSubCategoryID = 0;
        divElement = "";

        for (var i = 0; i < subCategoryData.length; i++) {
            if (subCategoryData[i]['typeid'] == catID) {
                var subID = subCategoryData[i]['id'];
                for (var i = 0; i < jsonData.length; i++) {
                    var subId = jsonData[i]['subTypeID'];
                    if (subID == subId) {
                        var id = jsonData[i]['id'];
                        var name = jsonData[i]['name'];
                        var logo = jsonData[i]['logo'];
                        var phone = jsonData[i]['phone'];
                        var address = jsonData[i]['address'];
                        divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";

                    }
                }
            }
        }
        addElement('photographersList', divElement);
    });

    $("#region").on("click", ">li", function() {
        filterData($(this).attr('id'), selectedSubCategoryID);
        selectedRegionID = $(this).attr('id');
    });
    $("#subCategory").on("click", ">li", function() {
        filterData(selectedRegionID, $(this).attr('id'));
        selectedSubCategoryID = $(this).attr('id');
    });
    $("#video").on("click", function() {
        $("#video-gallery-1").removeClass("display-call");
        $("#photographer-info-slide").removeClass("display-call");
        $("#photographer-info-slide").addClass("display-call");
        $("#photogallery-div").removeClass("display-call");
        $("#photogallery-div").addClass("display-call");
    });
    $("#gallery").on("click", function() {
        $("#video-gallery-1").removeClass("display-call");
        $("#video-gallery-1").addClass("display-call");
        $("#photographer-info-slide").removeClass("display-call");
        $("#photographer-info-slide").addClass("display-call");
        $("#photogallery-div").removeClass("display-call");
    });

    $("#about").on("click", function() {
        $("#video-gallery-1").removeClass("display-call");
        $("#video-gallery-1").addClass("display-call");
        $("#photographer-info-slide").removeClass("display-call");
        $("#photogallery-div").removeClass("display-call");
        $("#photogallery-div").addClass("display-call");
    });

    /**
     * Event handlers for forum code.
     */
    $('a[href="#forum"]').on('click', function() {
        var forumUrl = "http://forum-hatunot.com/forum-custom/script/index.php?tab1=custom_timeline&id=wedAppForumTest";
        var forumDiv = $('#forum_content');
        if (forumDiv.html().trim() === "") {
            $('#forum_content').load(forumUrl, function() {
                $(".header-join-wrapper").on('click', function() {
                    var url = $('.header-join-wrapper').attr('href');
                    $('.header-join-wrapper').attr('href', "");
                    var ref = window.open(url, '_blank', 'location=no');
                    ref.addEventListener('loadstop', function(event) {
                        var success = "http://forum-hatunot.com/forum-custom/Script//index.php?tab1=home#_=_";
                        if (event.url === success) {
                            ref.close();
                            $('#forum_content').load(forumUrl);
                        }
                    });
                })
            });
        }

    });
    //	$('.header-join-wrapper').on('click', function(){
    //		openFB.init({appId:716728658405527,tokenStore:window.localStorage});
    ////		openFB.init('YOUR_FB_APP_ID', 'http://localhost/openfb/oauthcallback.html', window.localStorage);
    //		openFB.login();
    //	});

});

function filterData(regionID, subCategID) {
    var divElement = "";
    tempRegionJsonData = [];
    tempSubCategoryData = [];
    counter = 0;

    if (subCategID == 0) {
        for (var i = 0; i < subCategoryData.length; i++) {
            if (subCategoryData[i]['typeid'] == $('#seg li .ui-btn-active').attr('value')) {
                var subID = subCategoryData[i]['id'];
                for (var i = 0; i < jsonData.length; i++) {
                    var subId = jsonData[i]['subTypeID'];
                    if (subID == subId) {
                        if (regionID == 0) {
                            var id = jsonData[i]['id'];
                            var name = jsonData[i]['name'];
                            var logo = jsonData[i]['logo'];
                            var phone = jsonData[i]['phone'];
                            var address = jsonData[i]['address'];
                            divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";
                        } else {
                            var regID = jsonData[i]['regionID'];
                            if (regionID == regID) {
                                var id = jsonData[i]['id'];
                                var name = jsonData[i]['name'];
                                var logo = jsonData[i]['logo'];
                                var phone = jsonData[i]['phone'];
                                var address = jsonData[i]['address'];
                                divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";

                            }
                        }

                    }
                }
            }
        }
    } else {
        for (var i = 0; i < jsonData.length; i++) {
            var subId = jsonData[i]['subTypeID'];
            if (subCategID == subId) {
                if (regionID == 0) {
                    var id = jsonData[i]['id'];
                    var name = jsonData[i]['name'];
                    var logo = jsonData[i]['logo'];
                    var phone = jsonData[i]['phone'];
                    var address = jsonData[i]['address'];
                    divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";
                } else {
                    var regID = jsonData[i]['regionID'];
                    if (regionID == regID) {
                        var id = jsonData[i]['id'];
                        var name = jsonData[i]['name'];
                        var logo = jsonData[i]['logo'];
                        var phone = jsonData[i]['phone'];
                        var address = jsonData[i]['address'];
                        divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";

                    }
                }

            }
        }
    }

    addElement('photographersList', divElement);
}

function addElement(divId, divString) {
    var ni = document.getElementById(divId);
    ni.innerHTML = divString;
}

function setClientsDet(data, regionJson, subCategoryJson) {
    var divElement = "";
    for (var i = 0; i < subCategoryJson.length; i++) {
        if (subCategoryJson[i]['typeid'] == 2) {
            var subID = subCategoryJson[i]['id'];
            for (var i = 0; i < data.length; i++) {
                jsonData = data;
                var subId = data[i]['subTypeID'];
                if (subID == subId) {
                    var id = data[i]['id'];
                    var name = data[i]['name'];
                    var logo = data[i]['logo'];
                    var phone = data[i]['phone'];
                    var address = data[i]['address'];
                    divElement = divElement + " <li id=" + id + " style=\"padding-left:15px;padding-right:15px;padding-bottom:5px;\" class=\"iconLeft\" data-icon=\"\"><a href='#about' class=\"ui-btn ui-btn-icon-right ui-nodisc-icon ui-icon-carat-l\"style=\"background: #222528;\"><div style=\"display: inline-block; float: right\"><img src=\'" + logo + "\' style=\"width:90px;height:90px\"/></div><div align=\"right\"style=\"display: inline-block; float: right; padding-right: 10px;font-weight: 100;color:#EAEAEA\">" + name + "</br>&nbsp;<h2 align=\"right\" style=\"color: #7F7F7F;font-size: small;\">" + address + "</h2><h2 align=\"right\" style=\"color:#C0C0C0;font-size: small;\">" + phone + "</h2></div></a></li>";

                }
            }
        }
    }
    $('#region').append($("<li id=0 class=\"iconLeft\" >").append("<a href=\"javascript:regionClicked('ALL')\" class=\"ui-nodisc-icon ui-icon-carat-l \" data-rel=\"dialog\"><span style=\"float:right\">ALL</span></a>"));
    for (var i = 0; i < regionJson.length; i++) {
        regionData = regionJson;
        var name = regionJson[i]['name'];
        var id = regionJson[i]['id'];
        $('#region').append($("<li id=" + id + " class=\"iconLeft\">").append("<a href=\"javascript:regionClicked('" + name + "')\" class=\"ui-nodisc-icon ui-icon-carat-l \" data-rel=\"dialog\"><span style=\"float:right\">" + name + "</span></a>"));
    }
    $('#subCategory').append($("<li id=0 class=\"iconLeft\">").append("<a href=\"javascript:subCategoryClicked('ALL')\" class=\"ui-nodisc-icon ui-icon-carat-l \" data-rel=\"dialog\"><span style=\"float:right\">ALL</span></a>"));
    for (var i = 0; i < subCategoryJson.length; i++) {
        subCategoryData = subCategoryJson;
        var name = subCategoryJson[i]['name'];
        var catid = subCategoryJson[i]['typeid'];
        var id = subCategoryJson[i]['id'];
        if (catid == 2)
            $('#subCategory').append($("<li id=" + id + " class=\"iconLeft\">").append("<a href=\"javascript:subCategoryClicked('" + name + "')\" class=\"ui-nodisc-icon ui-icon-carat-l\" data-rel=\"dialog\"><span style=\"float:right\">" + name + "</span></a>"));
    }
    // console.log(divElement);
    addElement('photographersList', divElement);
    // outputs 'Foo'
}

//For Region and Price Select menu
(function($) {
    function pageIsSelectmenuDialog(page) {
        var isDialog = false,
            id = page && page.attr("id");
        $(".filterable-select").each(function() {
            if ($(this).attr("id") + "-dialog" === id) {
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
        .on("selectmenucreate", ".filterable-select", function(event) {
            var input,
                selectmenu = $(event.target),
                list = $("#" + selectmenu.attr("id") + "-menu"),
                form = list.jqmData("filter-form");
            // We store the generated form in a variable attached to the popup so we avoid creating a
            // second form/input field when the listview is destroyed/rebuilt during a refresh.
            if (!form) {
                input = $("<input data-type='search'></input>");
                form = $("<form></form>").append(input);
                input.textinput();
                list
                    .before(form)
                    .jqmData("filter-form", form);
                form.jqmData("listview", list);
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
                .on("filterablefilter", function() {
                    selectmenu.selectmenu("refresh");
                });
        })
        // The custom select list may show up as either a popup or a dialog, depending on how much
        // vertical room there is on the screen. If it shows up as a dialog, then the form containing
        // the filter input field must be transferred to the dialog so that the user can continue to
        // use it for filtering list items.
        .on("pagecontainerbeforeshow", function(event, data) {
            var listview, form;
            // We only handle the appearance of a dialog generated by a filterable selectmenu
            if (!pageIsSelectmenuDialog(data.toPage)) {
                return;
            }
            listview = data.toPage.find("ul");
            form = listview.jqmData("filter-form");
            // Attach a reference to the listview as a data item to the dialog, because during the
            // pagecontainerhide handler below the selectmenu widget will already have returned the
            // listview to the popup, so we won't be able to find it inside the dialog with a selector.
            data.toPage.jqmData("listview", listview);
            // Place the form before the listview in the dialog.
            listview.before(form);
        })
        // After the dialog is closed, the form containing the filter input is returned to the popup.
        .on("pagecontainerhide", function(event, data) {
            var listview, form;
            // We only handle the disappearance of a dialog generated by a filterable selectmenu
            if (!pageIsSelectmenuDialog(data.toPage)) {
                return;
            }
            listview = data.prevPage.jqmData("listview"),
                form = listview.jqmData("filter-form");
            // Put the form back in the popup. It goes ahead of the listview.
            listview.before(form);
        });



})(jQuery);