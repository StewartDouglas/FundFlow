/**
 * TransactionController
 *
 * @module      :: Controller
 * @description	:: Actions for manipulting transactions
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  // Should only be allowed to execute
  // if administrator

  create: function(req,res){

    var trademore = require('../../lib/trademore');

  	trademore.createMultiSig(req.body.clientAddress, function(multiSig){
       
      var transObj = {
        createAt: new Date(),
        updatedAt: new Date(),
        amount: req.param('fund'),      
        loan: req.param('loanId'),
        lender: req.param('userId'),
        toaddress: multiSig
      };

      Transaction.create(transObj, function transCreated(err, trans){

        // Create JSON here
        var response = {ms: multiSig, id: trans.id}; 
        var responseJSON = JSON.stringify(response);
        res.write(responseJSON);
        res.end();

      }); // Transaction.create

  	}); // trademore.createMultiSig

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
        Transaction.update({id: req.body.transID}, {txid: req.body.txid} , function(err, conf){

          if(err) { console.log('Error trying to update Transaction: ' + err) }
          else { console.log('Transaction updated') }


        })
      }
      else
      {
        // handle invalid transaction
        res.send({status: 'invalid'});
      }

    });

  }, // confirm

  release: function(req,res){

    var FormData = require('form-data');
    var trademore = require('../../lib/trademore');

    console.log('Step 9. Server. Releasing funds for loan: ' + req.body.loanId);

    // get deposits associated with loanId
    Transaction.find({loan: req.body.loanId}, function(err, deposits){

      for(i in deposits)
      {
        // create the transaction: deposit --> borrower
        trademore.createrawtransaction(deposits[i].txid, 'mnedNAgowyPETk2ym4a3b8sCyzh65wEuiA', 0.00001, function(rawtransaction){

            // sign the transaction
            trademore.signrawtransaction(rawtransaction, function(signedtransaction){

              // save the output in MySQL, so lender can sign and broadcast              
              console.log('signedtransaction: ' + signedtransaction); 
              var withdrawForm = new FormData();
              withdrawForm.append('signedtransaction', signedtransaction);
              withdrawForm.append('lenderID', req.body.lender);
              withdrawForm.submit('http://localhost:1337/withdrawal/create', function(err, response){
                // withdrawal created
              }); // withdrawForm.submit


            }) // signrawtransaction
        }); // createrawtransaction

      } // for

    }); // Transaction.find

    res.send(200);

  } // release

}
