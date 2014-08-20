var bitcoin = require('bitcoin');
var client = new bitcoin.Client({
	 host: 'localhost',
	 port: 18332,
	 user: 'bitcoinrpc',
	 pass: 'rpcpw1234'
});

client.getRawTransaction('130cb54b1462d8406d53f6f9a3a1a9743796d84150958f33b183ea42c65e8a2f',1,function(err,transaction){

	if(err) { console.log('error: ' + err) }
	else {
		console.log(transaction);
	}
})