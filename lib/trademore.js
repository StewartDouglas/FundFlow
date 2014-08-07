	var bitcoin = require('bitcoin');
	var client = new bitcoin.Client({
	  host: 'localhost',
	  port: 18332,
	  user: 'bitcoinrpc',
	  pass: 'rpcpw1234'
	});

module.exports = {
	
	// send amount to address
	send: function(address, amount, callback){

		client.sendToAddress(address,amount,function(err, txid){
			if(err)
			{ 
				console.log('error: ' + err)
			}
			else 
			{
				callback(txid);
			}
		});

	},

	getnewaddress: function(callback){

		client.getNewAddress(function(err,address){
			callback(address);
		});

	},

	createMultiSig: function(address1,callback){

		client.getNewAddress(function(err,address2){
			console.log("Step 2. Server. Server's address: " + address2);
			client.validateAddress(address2, function(err,info2){
				client.validateAddress(address1, function(err, info1){
					client.addMultiSigAddress(2,[info2.pubkey,info1.pubkey],function(err,multiSigAddress){
						if(err) console.log('error: ' + err);
						console.log('Step 3. Server. Generate MultiSig address: ' + multiSigAddress);	
						callback(multiSigAddress);
					});
				});
			});
		});
	},

	confirm: function(rawTransaction,callback){

		client.getRawTransaction(rawTransaction,1,function(err,transaction){
			
			// TO DO: parse transaction and make sure it is valid
			// Need to confirm it actually appears on the blockchain

			// Placeholder logic
			if(true)
			{
				callback(transaction, true);
			}
			else
			{
				callback(transaction, false);
			}
		})

	}

}