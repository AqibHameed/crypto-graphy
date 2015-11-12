var http, url, crypto, sharedSecret;

http = require("http");
url = require("url");
crypto = require("crypto");

sharedSecret = "super-secret";

http.createServer(function (req, res) {
    var retrievedSignature, parsedUrl, computedSignature;
 // Deal with CORS.
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Headers", "X-Signature");
        res.writeHead(204);
        res.end();
    } else {
     // Get signature.
        retrievedSignature = req.headers["x-signature"];
     // Recalculate signature.
        parsedUrl = url.parse(req.url);
        computedSignature = crypto.createHmac("sha256", sharedSecret).update(parsedUrl.query).digest("hex");
     // Compare signatures.
        if (computedSignature === retrievedSignature) {
            res.writeHead(200, {
                "Content-Type": "text/plain"
            });
            res.end("Hello World\n");
        } else {
            res.writeHead(403, {
                "Content-Type": "text/plain"
            });
            res.end("Get Out\n");
        }
    }
}).listen(1337);

console.log("Server running on port 1337");
