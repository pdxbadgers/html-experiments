urlBase = "http://192.168.0.100";

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

    //todo:
    // make it such that the switches hide when you hit anything but none
    // wire up switches and buttons to hit urls
    // fix config

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
                $.ajax(urlBase+"/leds?d=0", {
                    success: function(data) {
                        var obj = JSON.parse(data);
                        if (obj["s"]=="on") $("#tail").click(); // this really sucks but it works
                        $("#tail").on("change", function( event, ui ) {
                            console.log("value:"+event.target.value);
                            var adjusted_value = (event.target.value == "on") ? 1 : 0;
                            var url = urlBase+"/leds?d=0&s=" + adjusted_value;
                            $.ajax(url, {
                                success: function(data) {
                                    console.log("changed light state");
                                }
                            });

                        });
                    }
                });
                $.ajax(urlBase+"/leds?d=1", {
                    success: function(data) {
                        var obj = JSON.parse(data);
                        if (obj["s"]=="on") $("#back-foot").click(); // this really sucks but it works
                        $("#back-foot").on("change", function( event, ui ) {
                            console.log("value:"+event.target.value);
                            var adjusted_value = (event.target.value == "on") ? 1 : 0;
                            var url = urlBase+"/leds?d=1&s=" + adjusted_value;
                            $.ajax(url, {
                                success: function(data) {
                                    console.log("changed light state");
                                }
                            });

                        });
                    }
                });
                $.ajax(urlBase+"/leds?d=2", {
                    success: function(data) {
                        var obj = JSON.parse(data);
                        if (obj["s"]=="on") $("#front-foot").click(); // this really sucks but it works
                        $("#front-foot").on("change", function( event, ui ) {
                            console.log("value:"+event.target.value);
                            var adjusted_value = (event.target.value == "on") ? 1 : 0;
                            var url = urlBase+"/leds?d=2&s=" + adjusted_value;
                            $.ajax(url, {
                                success: function(data) {
                                    console.log("changed light state");
                                }
                            });

                        });
                    }
                });
                $.ajax(urlBase+"/leds?d=3", {
                    success: function(data) {
                        var obj = JSON.parse(data);
                        if (obj["s"]=="on") $("#nose").click(); // this really sucks but it works
                        $("#nose").on("change", function( event, ui ) {
                            console.log("value:"+event.target.value);
                            var adjusted_value = (event.target.value == "on") ? 1 : 0;
                            var url = urlBase+"/leds?d=3&s=" + adjusted_value;
                            $.ajax(url, {
                                success: function(data) {
                                    console.log("changed light state");
                                }
                            });

                        });
                    }
                });
                $.ajax(urlBase+"/leds?d=4", {
                    success: function(data) {
                        var obj = JSON.parse(data);
                        if (obj["s"]=="on") $("#eye").click(); // this really sucks but it works
                        $("#eye").on("change", function( event, ui ) {
                            console.log("value:"+event.target.value);
                            var adjusted_value = (event.target.value == "on") ? 1 : 0;
                            var url = urlBase+"/leds?d=4&s=" + adjusted_value;
                            $.ajax(url, {
                                success: function(data) {
                                    console.log("changed light state");
                                }
                            });

                        });
                    }
                });

                console.log("going to this badger");
            }
        }
    });

}

$(document).ready(startup);
