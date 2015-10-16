urlBase = "http://192.168.0.100";

function ledSwitchChange(event, ui) {
    params = event.data;
    console.log("value:"+event.target.value);
    var adjusted_value = (event.target.value == "on") ? 1 : 0;
    var url = urlBase+"/leds?d="+params.d+"&s=" + adjusted_value;
    $.ajax(url, {
        success: function(data) {
            console.log("changed light state");
        }
    });
}

function startup() {
    console.log("I'm a startup function");
    $("#badger-name").change(function(event) {
        var name = event.target.value;
        $.ajax(urlBase+"/config?n="+name, {
            success: function(data) {
            console.log("changed name succesfully");
            }
        });
    });
    $("#tail").change({d:0}, ledSwitchChange);
    $("#back-foot").change({d:1}, ledSwitchChange);
    $("#front-foot").change({d:2}, ledSwitchChange);
    $("#nose").change({d:3}, ledSwitchChange);
    $("#eye").change({d:4}, ledSwitchChange);

    $("body").pagecontainer({
        beforechange: function( event, ui ) {
            var toPage = ui.toPage;
            if (typeof(toPage) == 'string' && toPage.indexOf("#this-badger") > -1) {
                $.ajax(urlBase+"/config", {
                    success: function(data) {
                        var obj = JSON.parse(data);
                        $("#badger-name").attr("value", obj["n"]);
                    }
                });
                $.ajax(urlBase+"/leds/", {
                    success: function(data) {
                        var obj = JSON.parse(data);
                        for (led in obj) {
                            switch (led["d"]) {
                                case 0:
                                    if (led["s"]=="on") $("#tail").click();
                                    break;
                                case 1:
                                    if (led["s"]=="on") $("#back-foot").click();
                                    break;
                                case 2:
                                    if (led["s"]=="on") $("#front-foot").click();
                                    break;
                                case 3:
                                    if (led["s"]=="on") $("#eye").click();
                                    break;
                                case 4:
                                    if (led["s"]=="on") $("#eye").click();
                                    break;
                            }
                        }
                    }
                });

                console.log("going to this badger");
            }
        }
    });

}

$(document).ready(startup);
