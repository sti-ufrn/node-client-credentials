var http = require("https");

var options = {
  "method": "POST",
  "hostname": "apitestes.info.ufrn.br",
  "port": null,
  "path": "/authz-server/oauth/token?client_id=<client_id>&client_secret=<client_secret>&grant_type=client_credentials"
};

var body;
var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    body = Buffer.concat(chunks);
    var json = JSON.parse(body.toString());
    var token = json['access_token'];
    console.log(body.toString());
    getData("/curso/<VERSION>/modalidades-educacao", token);
  });
});

req.end();

function getData(path, token) {
  var http = require("https");

  var options = {
    "method": "GET",
    "hostname": "apitestes.info.ufrn.br",
    "port": null,
    "path": path,
    "headers": {
      "authorization": "bearer " + token,
      "x-api-key": "X-API-KEY",
    }
  };

  var body;
  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.end();
} 