$(function() {

 function connect(){
     var host = window.location.host;
     if(host.indexOf(':')>0){
        host = host.substring(0, host.indexOf(':'));
     }
     var wsHost = "ws://" + host + ":8090/";

    try{
        socket = new WebSocket(wsHost);

        console.log("Socket Status: "+socket.readyState);
        console.log(wsHost);

        socket.onopen = function(){
       	    console.log("Socket Status: "+socket.readyState+' (open)');
        }
        socket.onmessage = function(message){
       	    console.log("Received: " + message.data);
			var alert = eval('(' + message.data + ')');

			$('#twittsLeader').fadeOut("slow", function () {
                $('#twittsLeader').empty();
                $( "#twittTemplate" ).tmpl(alert).appendTo('#twittsLeader');
                $('#twittsLeader').fadeIn("slow", function () {
                if(previousAlert != null)
                    $( "#twittTemplate" ).tmpl( previousAlert ).prependTo('#twitts');
                    $('#twitts div:first-child').fadeIn("slow");
                });
            });
            previousAlert = alert;
        }
        socket.onclose = function(){
            console.log("Socket Status: "+socket.readyState+' (Closed)');
            retryConnect();
        }
    } catch(exception){
       console.log("Error"+exception);
    }
}

    var socket;
    var previousAlert;

    function retryConnect(){
        while(socket==null || socket.readyState==3 ){
            console.log("Trying to connect");
            connect();
        }
    }
    retryConnect()
});



/*$(function() {
	var feedSocket = {
		socket: null,
	  	init: function() {
	  	    this.socket = new WebSocket('ws://localhost:8081/');
		  	this.socket.onopen = this.open;
		  	this.socket.onclose = this.close;
		  	this.socket.onmessage = this.message;
		  	this.socket.onerror = this.error;
	  	},
		open: function() {
		  	console.log('open');
		},
		close: function() {
		  	console.log('close');
		  	feedSocket.init();
		},
		message: function(message) {
		    console.log(message.data);
			var alert = eval('(' + message.data + ')');

			$('#alerts-principal').fadeOut("slow", function () {
    $('#alerts-principal').empty();
    $.tmpl( 'alertTmpl', alert).appendTo('#alerts-principal');
    $('#alerts-principal').fadeIn("slow", function () {
         if(previousAlert != null)
      //$.tmpl( 'alertTmpl2', previousAlert).prependTo('#alerts-feed');
      $( "#alertTmpl2" ).tmpl( previousAlert ).prependTo('#alerts-feed');
         $('#alerts-feed li:first-child').fadeIn("slow");
    });
      });
      previousAlert = alert;
		},
		error: function(e) {
		  	console.log(e);
		}
  	};

  	var previousAlert;

  	$.template( "alertTmpl", "<li><b>${user}</b> ${message}</li>" );

  	feedSocket.init();
});  */