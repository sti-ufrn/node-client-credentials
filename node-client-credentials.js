var http = require("http");

var options = {
  "method": "POST",
  "hostname": "apitestes.info.ufrn.br",
  "port": null,
  "path": "/authz-server/oauth/token?client_id=<client_id>&client_secret=<client_secret>&grant_type=client_credentials"
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();