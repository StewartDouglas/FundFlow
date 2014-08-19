/**
 * WithdrawalController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 */

module.exports = {
    
  create: function(req,res){

  	//console.log('req.body.loanID: ' + req.body.loanID);
  	//console.log('req.body.lenderID: ' + req.body.lenderID);
  	//console.log('req.body.transactionID: ' + req.body.transactionID);

  	var withdObj = {
  		unsignedtx: req.body.signedtransaction,
  		lenderID: req.body.lenderID,
  		transactionID: req.body.transactionID,
  		loanID: req.body.loanID,
  		outstanding: true
  	};

  	Withdrawal.create(withdObj, function (err, withdrawal){

  		console.log('Withdrawal created, with id: ' + withdrawal.id);
      res.send(200);

  	}); // Withdrawal.create

  }, // create
  
  confirm: function(req,res){

    var trademore = require('../../lib/trademore');

  	Withdrawal.find({loanID: req.query.id, lenderID: req.query.lender }, function withdrawalFound(err, withdrawal){

      // iterate over each unsigned withdrawal, and sign it
      for(i in withdrawal)
      {
        trademore.signrawtransaction(withdrawal[i].unsignedtx, function(signedtransaction){ 

          // update the Withdrawal table
          //Withdrawal.update()

          // now, broadcast the transaction
          trademore.sendrawtransaction(signedtransaction, function(confirmation){

            console.log('Transaction broadcast: ' + confirmation);

          });

        }); // signrawtransaction
      } // for

      res.redirect('/user/show/'+req.session.User.id);

  	});
  } // confirm

};
