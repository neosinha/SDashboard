
var BackendFunctions = function () {

    var serverLocation = location.host;
    var server = "http://" + serverLocation ;
    console.log("Location: "+ server);


    this.services = function() {
        var tx = new Date();
        alert('Alert: ----');
    }



};