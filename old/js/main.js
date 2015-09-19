var fb = new Firebase("https://glaring-torch-6697.firebaseio.com/");
var users = fb.child("users");

var API_HOST = "https://hackerapi.com/v1";
var API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MzM5MTUyOTgsImlkIjoyLCJldnQiOlsxXSwidHlwIjoidXNyIn0.USfHFAJ_AYw4hP-wAjiVSWiXbwxPwWLjzzC5oXhVCws";

$(document).ready(function() {
    $('#login').click(function() {
        var username = $('#htn_username').val();
        var password = $('#htn_password').val();
        var uid = $('#uid').val();

        getToken(username, password, function(data) {
            if (data.id + '' != uid) {
                console.log("Not a valid token.");
                return;
            }
            
            users.push({
                id: data.id,
                name: data.name
            });
        });
    });
});

getToken = function(username, password, callback) {
    var req;
    req = {};
    req.method = 'POST';
    req.endpoint = '/auth/user';
    req.callback = callback;
    req.payload = {
        username: username,
        password: password
    };

    return makeRequest(req);
};

makeRequest = function(req) {
    var callback = req.callback;
    console.log(req);
    $.ajax({
        url: API_HOST + req.endpoint + '?token=' + API_TOKEN,
        method: req.method,
        data: JSON.stringify(req.payload),
        success: function(data) {
            if (callback === undefined) {
                console.log(data);
                return
            };

            callback(data);
        }
    });
}

