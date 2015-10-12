
function startup() {
    console.log("I'm a startup function");
    $("#badger-name").change(function(event) {
	var name = event.target.value;
	$.ajax("http://192.168.1.115/config?n="+name, {
	    success: function(data) {
		console.log("changed name succesfully");
	    }
	});
    });


    $("body").pagecontainer({
	beforechange: function( event, ui ) {
	    var toPage = ui.toPage;
	    if (typeof(toPage) == 'string' && toPage.indexOf("#this-badger") > -1) {
		$.ajax("http://192.168.1.115/config", {
		    success: function(data) {
			$("#badger-name").attr("value", data.split(",",2)[1]);
			}
		    });
		$.ajax("http://192.168.1.115/blink?d=0", {
		    success: function(data) {
			var value = Math.round(data*100/1023.0);
			$("#tail").attr('value', value.toString());
			$("#tail").slider('refresh');
			$("#tail").on("slidestop", function( event, ui ) {
			    console.log("value:"+event.target.value);
			    var adjusted_value = Math.round(event.target.value * 1023/100.0);
			    var url = "http://192.168.1.115/blink?d=0&v=" + adjusted_value;
    			    $.ajax(url, {
				success: function(data) {
				    console.log("changed blink value success");
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
