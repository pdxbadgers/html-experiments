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

function enableIndividual(state) {
    console.log("all "+state);
    $("#switch_container").toggle(state);
}


function startup() {
    console.log("I'm a startup function");
    $("#badger-name").change(function(event) {
        var name = event.target.value;
        $.ajax(urlBase+"/config?n="+encodeURIComponent(name), {
            success: function(data) {
            console.log("changed name succesfully");
            }
        });
    });
    $("#badger-flag").change(function(event) {
        var flag = event.target.value;
        $.ajax(urlBase+"/flag?newflag="+encodeURIComponent(flag), {
            success: function(data) {
            console.log("changed flag succesfully");
            }
        });
    });
    $("#nonebutton").on("click", function(event, ui) {
        enableIndividual(true);
        $.ajax(urlBase+"/leds?m=none", {
            success: function(data) {
                console.log("mode none");
            }
        });
    });
    $("#allbutton").on("click", function(event, ui) {
        enableIndividual(false);
        $.ajax(urlBase+"/leds?m=all", {
            success: function(data) {
                console.log("mode none");
            }
        });
    });
    $("#blinkbutton").on("click", function(event, ui) {
        enableIndividual(false);
        $.ajax(urlBase+"/leds?m=blink", {
            success: function(data) {
                console.log("mode none");
            }
        });
    });
    $("#chasebutton").on("click", function(event, ui) {
        enableIndividual(false);
        $.ajax(urlBase+"/leds?m=chase", {
            success: function(data) {
                console.log("mode none");
            }
        });
    });
    $("#twinklebutton").on("click", function(event, ui) {
        enableIndividual(false);
        $.ajax(urlBase+"/leds?m=twinkle", {
            success: function(data) {
                console.log("mode none");
            }
        });
    });
    $("#tail").change({d:0}, ledSwitchChange);
    $("#back-foot").change({d:1}, ledSwitchChange);
    $("#front-foot").change({d:2}, ledSwitchChange);
    $("#nose").change({d:3}, ledSwitchChange);
    $("#eye").change({d:4}, ledSwitchChange);

    var ledMap = {
        0: "#tail",
        1: "#back-foot",
        2: "#front-foot",
        3: "#nose",
        4: "#eye"
    };

    $.ajax(urlBase+"/config", {
        success: function(data) {
            var obj = JSON.parse(data);
            $("#badger-name").attr("value", decodeURIComponent(obj["n"]));
        }
    });
    $.ajax(urlBase+"/leds", {
        success: function(data) {
            var obj = JSON.parse(data);
            if (obj["m"]=="none") {
                $('#nonebutton').addClass('ui-btn-active');
                enableIndividual(true);
                $.ajax(urlBase+"/leds/", {
                    success: function(data) {
                        var obj = JSON.parse(data);
                        console.log("data!");
                        console.log(data);
                        for (led in obj) {
                            if (obj[led]["s"]=="on") $(ledMap[obj[led]["d"]]).click();
                        }
                    }
                });
            }
            else {
                enableIndividual(false);
                switch (obj["m"]) {
                    case "all":
                        $('#allbutton').addClass('ui-btn-active');
                        break;
                    case "blink":
                        $('#blinkbutton').addClass('ui-btn-active');
                        break;
                    case "chase":
                        $('#chasebutton').addClass('ui-btn-active');
                        break;
                    case "twinkle":
                        $('#twinklebutton').addClass('ui-btn-active');
                        break;
                }

            }
        }
    });
    $.ajax(urlBase+"/flag", {
        success: function(data) {
            $("#badger-flag").attr("value", decodeURIComponent(data));
        }
    });

}

$(document).ready(startup);
