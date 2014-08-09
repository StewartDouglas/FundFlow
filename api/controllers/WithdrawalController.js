/**
 * WithdrawalController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

module.exports = {
    
  create: function(req,res){
  	
  	var withdObj = {
  		signature: req.body.signedtransaction,
  		lender: req.body.lenderID,
  		outstanding: true
  	};

  	Withdrawal.create(withdObj, function (err, withdrawal){

  		console.log('Withdrawal created, with id: ' + withdrawal.id);

  	}); // Withdrawal.create

  } // create
  
};
