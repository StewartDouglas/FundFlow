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

      if(err) { console.log('Error attempting to create a withdrawal: ' + err) }
  		console.log('Withdrawal created, with id: ' + withdrawal.id);
      res.send(200);

  	}); // Withdrawal.create
  }, // create
  
  confirm: function(req,res){

    var trademore = require('../../lib/trademore');

  	Withdrawal.find()
      .where({loanID: req.query.id})
      .where({lenderID: req.query.lender })
      .exec(function withdrawalFound(err, withdrawal){

      console.log('JSON.stringify(withdrawal): ' + JSON.stringify(withdrawal))

      // iterate over each unsigned withdrawal, and sign it
      for(i in withdrawal)
      {
        //console.log('withdrawal[i].unsignedtx: ' + withdrawal[i].unsignedtx);
        trademore.signrawtransaction(withdrawal[i].unsignedtx, function(signedtransaction){ 

          // update the Withdrawal table
          Withdrawal.update( {id: withdrawal[i].id}, {outstanding: 0}, function(){
          });

          // now, broadcast the transaction
          trademore.sendrawtransaction(signedtransaction, function(confirmation){

            console.log('Transaction broadcast: ' + confirmation);

          });

        }); // signrawtransaction
      } // for

      res.redirect('/user/show/'+req.session.User.id);

  	}); // exec
  } // confirm

};
