var http = require("https");

var url_base_autenticacao = "autenticacao.info.ufrn.br";
var client_id = "<my_client_id>";
var client_secret = "<my_client_secret>";

var url_base = "api.info.ufrn.br";
var versao = "<versao_api>";
var x_api_key = "<x_api_key>";

var options = {
  "method": "POST",
  "hostname": url_base_autenticacao,
  "port": null,
  "path": "/authz-server/oauth/token?client_id=" + client_id + "&client_secret=" + client_secret + "&grant_type=client_credentials"
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
    getData("/curso/" + versao + "/modalidades-educacao", token);
  });
});

req.end();

function getData(path, token) {
  var http = require("https");

  var options = {
    "method": "GET",
    "hostname": url_base,
    "port": null,
    "path": path,
    "headers": {
      "authorization": "bearer " + token,
      "x-api-key": x_api_key,
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
