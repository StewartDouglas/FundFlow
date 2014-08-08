/**
 * TransactionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  // Should only be allowed to execute
  // if administrator

  create: function(req,res){

    var trademore = require('../../lib/trademore');

    //console.log('loan: '+ req.param('loan_id'))
    //console.log('amount: '+ req.param('fund'))

    /*  
    var transObj = {
      loan: req.param('loan_id'),
      amount: req.param('fund')
    };

    // This throws an error
    Transaction.create(transObj, function transCreated(err, trans){
       console.log('Transaction created');
    });
    */

    // The above errors. Do the .create manually
    var qry = 'INSERT INTO transaction (createdAt,updatedAt,amount,loan) ' +
              'VALUES (now(),now(),' + req.param('fund') + ',' + req.param('loan_id') +')';


    Transaction.query(qry, function updateTransaction(err,trans){
    })


  	trademore.createMultiSig(req.body.client_address, function(multiSig){
  			res.send(multiSig);
  		});

  }, // create

  confirm: function(req,res){

    var trademore = require('../../lib/trademore');

    console.log('Step 6. Server. Server receives transaction: ' + req.body.txid);

    //check validity of transaction
    trademore.confirm(req.body.txid, function(transaction, validity){

      console.log('Step 7. Server. Server parses the transaction: ');
      console.log(transaction);

      if(validity==true)
      {
        res.send(200, {status: 'ok'});
      }
      else
      {
        // handle invalid transaction
        res.send({status: 'invalid'});
      }

    });

  } // confirm

}
