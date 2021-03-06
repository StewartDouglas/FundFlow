/**
 * TransactionController
 *
 * @module      :: TransactionController
 * @description	:: Actions for manipulting transactions
 */

module.exports = {
    
  // Should only be allowed to execute
  // if administrator

  create: function(req,res){

    var trademore = require('../../lib/trademore');

  	trademore.createMultiSig(req.body.clientAddress, function(multiSig){
       
      var transObj = {
        amount: req.param('fund'),      
        loan: req.param('loanId'),
        lender: req.param('userId'),
        toaddress: multiSig
      };

      Transaction.create(transObj, function transCreated(err, trans){

        if(err) { console.log('Error creating transaction: ' + err); }

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

      console.log('Step 7. Server. Server parses the transaction, to confirm validity. ');
      //console.log(transaction);
      //console.log('And now the vin scriptSig');
      //console.log(JSON.stringify(transaction.vin[0].scriptSig));
      //console.log('And now the 1st vout scriptSig');
      //console.log(JSON.stringify(transaction.vout[0].scriptPubKey));
      //console.log('And now the 2nd vout scriptSig');
      //console.log(JSON.stringify(transaction.vout[1].scriptPubKey));

      if(validity==true)
      {
        res.send(200, {status: 'ok'});

        // GENERATE COUNTERPARTY TOKEN
        /*
          1) Create contract
          2) Hash contract
          3) Counterparty Issuance
          4) Counterparty Send
          send --source=[source] --asset=[asset] --quantity=[quantity] --destination=[destination]
        */

        Transaction.update({id: req.body.transID}, {txid: req.body.txid} , function(err, conf){

          if(err) { console.log('Error trying to update Transaction: ' + err) }


        })
      }
      else
      {
        // handle invalid transaction
        res.send({status: 'invalid'});
      }

    });
  }, // confirm

  // 
  release: function(req,res){

    var FormData = require('form-data');
    var trademore = require('../../lib/trademore');

    console.log('Step 9. Server. Releasing funds for loan with id ' + req.body.loanId);

    // get deposits associated with loanId
    Transaction.find({loan: req.body.loanId}, function(err, deposits){

      // console.log('lenderID: ' + deposits[0].lender);
      // console.log('transactionID: ' + deposits[0].id);
      // console.log('loanID:' + deposits[0].loan);

      for(i in deposits)
      {
        // create the transaction: deposit --> borrower
        // createrawtransaction(source,destination,amount,callback)
        trademore.createrawtransaction(deposits[i].txid, req.body.sendaddress, 0.00001, function(rawtransaction){
          console.log('Step 9.1 Server. Creating transaction: ' + 0.00001 + ' BTC --> ' + req.body.sendaddress);

            // sign the transaction
            trademore.signrawtransaction(rawtransaction, function(signedtransaction){
              console.log('Step 9.2 Server. Signing transaction. ');
              // save the output in MySQL, so lender can sign and broadcast              
              var withdrawForm = new FormData();
              withdrawForm.append('signedtransaction', signedtransaction);
              withdrawForm.append('lenderID', deposits[i].lender);
              withdrawForm.append('transactionID', deposits[i].id);
              withdrawForm.append('loanID', deposits[i].loan);
              withdrawForm.submit('http://localhost:1337/withdrawal/create', function(err, response){
              
                res.send(200);

              }); // withdrawForm.submit
            }) // signrawtransaction
        }); // createrawtransaction

      } // for

    }); // Transaction.find

    res.send(200);
  } // release

}
