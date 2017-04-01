window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");
    var spinners = [
        "◰◳◲◱",
    ];

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }

    });

    // spinner
    for(var s=0; s<spinners.length; ++s) {
        var spinner = spinners[s];
            var el = document.getElementById('send');

            (function(spinner,el) {
                var i = 0;
                setInterval(function() {
                    el.value = spinner[i];
                    i = (i + 1) % spinner.length;
                }, 300);
            })(spinner,el);
    }

    sendButton.onclick = sendMessage = function() {
        if(name.value == "") {
            //alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            //field.value = "";
        }
    };



}