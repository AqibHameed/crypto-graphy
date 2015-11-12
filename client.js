var http, crypto, sharedSecret, query, signature;

http = require("http");
crypto = require("crypto");

sharedSecret = "super-secret";
query = "key=value";
signature = crypto.createHmac("sha256", sharedSecret).update(query).digest("hex");

http.get({
    port: 1337,
    path: "/?" + query,
    headers: {
        "X-Signature": signature
    }
}, function (res) {
    console.log(res.statusCode);
});
