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

	createMultiSig: function(clientAddress,callback){

		client.getNewAddress(function(err,serverAddress){
			console.log("Step 2. Server. Server's address: " + serverAddress);
			client.validateAddress(serverAddress, function(err,serverInfo){
				client.validateAddress(clientAddress, function(err, clientInfo){
					client.addMultiSigAddress(2,[serverInfo.pubkey,clientInfo.pubkey],function(err,multiSigAddress){
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
			// Here we are confirming it actually appears on the blockchain

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

	},

	createrawtransaction: function(txid,address,amount, callback){

		console.log('Creating transaction using txid: ' + txid + ', sending: ' + amount + ' to ' + address);

		callback('placeholder');

		/*
		client.createRawTransaction([{"txid": txid, "vout": 0}], {address: amount}, function(err, rawtransaction){

			if(err) { console.log('Error creating transaction: ' + err) }

			callback(rawtransaction);

		});
		*/

	},

	signrawtransaction: function(rawtransaction, callback){

		console.log('Signing transaction: placeholder raw transaction');

		callback('placeholder');

		/*
		client.signRawTransaction(rawtransaction, function(err, signedtransaction){

			if(err) { console.log('Error signing transaction: ' + err) }

			callback(signedtransaction);

		});

		*/
	}

}