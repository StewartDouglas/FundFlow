/**
 * WithdrawalController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

module.exports = {
    
  create: function(req,res){

  	console.log('req.body.loanID: ' + req.body.loanID);
  	console.log('req.body.lenderID: ' + req.body.lenderID);
  	console.log('req.body.transactionID: ' + req.body.transactionID);

  	var withdObj = {
  		signature: req.body.signedtransaction,
  		lenderID: req.body.lenderID,
  		transactionID: req.body.transactionID,
  		loanID: req.body.loanID,
  		outstanding: true
  	};

  	Withdrawal.create(withdObj, function (err, withdrawal){

  		console.log('Withdrawal created, with id: ' + withdrawal.id);

  	}); // Withdrawal.create

  }, // create
  
  confirm: function(req,res){

  	Withdrawal.findOne(req.param('id'), function withdrawalFound(err, withdrawal){

  	});
  } // confirm

};
