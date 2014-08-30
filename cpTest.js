var request = require('request');
var response;
var url = "http://localhost:4000/api/";
var payload = {
	"method": "get_balances",
  	"params": {"filters": {'field': 'address', 'op': '==', 'value': "miEqHpNNQWejM4aL8MUApUcDRh51PzDaed"}},
  	"jsonrpc": "2.0",
  	"id": 0
	}
response = request.post(url, payload).auth("rpc","foo");
console.log(response);