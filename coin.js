var async   = require('async');
var http    = require('http');
var https   = require('https');
var crypto = require('crypto');

var key = 'some_key_from_coinbasecom';
var secret = 'some_secret_from_coinbasecom';

var nonce = String(Date.now() * 1e6);
var url = 'https://coinbase.com/api/v1/account/balance';
var message = nonce + url + ''; // if body is not empty then put here body
var signature = crypto.createHmac('sha256', secret).update(message).digest('hex');

var options = {
    method: 'GET',
    path:   '/api/v1/account/balance',
    hostname: 'coinbase.com',
    headers: {
        ACCESS_KEY: key,
        ACCESS_SIGNATURE: signature,
        ACCESS_NONCE: nonce,
    }
};

  https.get(options, function(res) {
    var body = '';
    res.on('data', function(chunk) {body += chunk;});
    res.on('end', function() {

      try {
        var balance_json = JSON.parse(body);
        if (balance_json.error) {
        console.log(balance_json.error);
          return;
        } else {
    // Here I have expected to get my balance json data
      console.log(balance_json);
        }
      } catch (error) {
    console.log(error);
    console.log("error parsing json");
      }
    });
    res.on('error', function(e) {
       console.log(e);
      console.log("error syncing balance");
    });
  });
