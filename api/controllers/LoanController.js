/**
 * LoanController
 *
 * @module      :: LoanController
 * @description	:: Actions for manipulting loans
 */

module.exports = {

  // This loads the sign-up page --> new.ejs
  'new': function(req, res) {
    res.view();
  }, // new

  create: function(req,res, next){

    var duration = req.param('expires');
    var date = new Date();
    // The loan must be funded within two weeks
    date.setUTCDate(date.getUTCDate() + 14);

    var loanObj = {

      borrower: req.session.User.id,
      description: req.param('description'),
      amount: req.param('amount'),
      interest: req.param('interest'),
      sendaddress: req.param('address'),
      term: req.param('expires'),
      monthlyPayment: (req.param('amount') * (1 + (req.param('interest')/100)))/(req.param('expires')*12),

      // ** Current defaults **
      beginning: new Date(),
      completion:new Date(),
      expires: date,
      amountFunded: 0,
      // **********************

      extendedDescription: req.param('detailedDescription'),
      fullyFunded: false
    }

  	Loan.create(loanObj, function loanCreated(err,loan){
  		
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.redirect('/loan/new');

      }

		res.redirect('/loan/created');

  	}); // Loan.create
  }, // create

  created: function(req,res){
        res.view();
  }, // created

  show: function(req,res){

    //console.log('req.session.User.id: ' + req.session.User.id);

    // Create the query manually, since Sails doesn't support associations/JOINS
    var loanQuery = 'SELECT user.name AS borrower, '
                   + 'user.id AS user_id, '
                   + 'loan.description AS description, '
                   + 'loan.amount AS amount, '
                   + 'loan.interest AS interest, '
                   + 'loan.beginning AS beginning, '
                   + 'loan.id AS id, '
                   + 'TIMESTAMPDIFF(day,NOW(),loan.expires) AS daydiff, '
                   + 'TIMESTAMPDIFF(hour,NOW(),loan.expires) MOD 24 AS hourdiff, '                   
                   + '(loan.amountFunded/loan.amount)*100 AS amountFunded '
                   + 'FROM loan JOIN user ON user.id = loan.borrower '
                   + 'WHERE loan.fullyFunded=false '
                   + 'AND user.id != ' + req.session.User.id + ' '
                   + 'AND loan.expires >= CURDATE()';

    var withdrawalQuery = 'SELECT user.name AS borrower, '
                        + 'loan.id AS loanID, '
                        + 'loan.description AS description, '
                        + 'loan.amount AS amount, '
                        + 'loan.interest AS interest, '
                        + 'loan.completion AS matures, '
                        + 'SUM(transaction.amount) AS commitment, '
                        + 'user.id AS id, '
                        + req.session.User.id  + ' AS lender '
                        + 'FROM withdrawal JOIN loan ON withdrawal.loanID = loan.id '
                        + 'JOIN transaction ON withdrawal.transactionID = transaction.id '
                        + 'JOIN user ON loan.borrower = user.id '
                        + 'WHERE withdrawal.outstanding = 1 ' 
                        + 'AND withdrawal.lenderID=' + req.session.User.id + ' '
                        + 'GROUP BY user.name, loan.description, loan.amount, loan.interest, loan.completion, user.id';

    Loan.query(loanQuery, function foundLoan(err,loan){

      Withdrawal.query(withdrawalQuery, function(err, withdrawal){

      var months = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];

        res.view({
          loan: loan,
          withdrawal: withdrawal,
          months: months
        });
      }); // Withdrawal.find
    }); // Loan.query
  }, // show

  showOne: function(req, res, next) {

    var loanQuery = 'SELECT user.name AS borrower, '
                   + 'user.email AS email, '
                   + 'user.id AS user_id, '
                   + 'loan.description AS description, '
                   + 'loan.extendedDescription AS extendedDescription, '
                   + 'loan.amount AS amount, '
                   + 'loan.interest AS interest, '
                   + 'loan.beginning AS beginning, '
                   + 'loan.id AS id, '
                   + 'TIMESTAMPDIFF(day,NOW(),loan.expires) AS daydiff, '
                   + '(TIMESTAMPDIFF(hour,NOW(),loan.expires) - (24*TIMESTAMPDIFF(day,NOW(),loan.expires))) AS hourdiff, '                   
                   + '(loan.amountFunded/loan.amount) AS amountFunded '
                   + 'FROM loan JOIN user ON user.id = loan.borrower '
                   + 'WHERE loan.id = ' + req.param('id');

    Loan.query(loanQuery, function foundLoan(err,loan){


      var months = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];

      console.log('loan: ' + JSON.stringify(loan));

        res.view({
          loan: loan,
          months:months
        });
    }); // Loan.query
  }, // showOne

  fund: function(req,res){
    Loan.findOne(req.param('id'), function foundLoan(err, loan){

      var months = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];

      res.view({
        loan: loan,
        months: months
      });
    });
  }, // fund

  giveFunds: function(req,res){

    var FormData = require('form-data');
    var request = require('request');
    var trademore = require('../../lib/trademore');

    var createForm = new FormData();
    var confirmForm = new FormData();

    trademore.getnewaddress(function(clientAddress){

      console.log("Step 1. Client. Creates Address: " + clientAddress);
      sails.log.debug("Step 1. Client. Creates Address: " + clientAddress);

      createForm.append('clientAddress', clientAddress);
      createForm.append('loanId', req.param('id'));
      createForm.append('fund', req.param('fund'));
      createForm.append('userId', req.session.User.id)
      createForm.submit('http://localhost:1337/transaction/create', function(err,responseMultiSig){

          if(err) { console.log('Error: ' + error); }

          var resultObject; // store response of /create

          responseMultiSig.on("data", function(ms) {
            resultObject = JSON.parse(ms);
            console.log('Step 4. Client. Receive MultiSig address: ' + resultObject.ms + '; and TransactionID: ' + resultObject.id);

      // COMMENT OUT HERE

          // 1) Calcualte 5% of amount funded
          // 2) Get BTC/GBP exchange rate
          // 3) Convert to BTC
          // ** Also, generate full transaction but don't broadcast?

          // send the deposit
          // placeholder BTC
          trademore.send(resultObject.ms,0.00001,function(txid){

            console.log('Step 5. Client. Generate transaction with txid: ' + txid)

              confirmForm.append('txid', txid);
              confirmForm.append('fund', req.param('fund'));
              confirmForm.append('transID', resultObject.id);
              confirmForm.submit('http://localhost:1337/transaction/confirm', function(err,resp){

                 console.log('Step 8. Client. Transaction confirmed.'); 

                 // CAN BE CUT-PASTE OUT
                  // Use adapter here instead? e.g. .update()
                  var qry = 'UPDATE loan ' +
                            'SET amountFunded=amountFunded+' + req.param('fund') + ' ' +
                            'WHERE id='+ req.param('id')

                  Loan.query(qry, function updatedLoan(err, loan){

                    // ** Handle possible errors **

                    // ** Handle case where we have reached our target ** 
                    Loan.findOne(req.param('id'), function foundLoan(err, updateLoan){

                      if(err) 
                      { 
                        console.log('Error: ' + err)
                      }
                      else // we found a loan
                      {
                        if(updateLoan.amountFunded >= updateLoan.amount){
                            Loan.update({id: updateLoan.id},{fullyFunded : 1},function(err,fundedLoan){
                              if(err) { console.log('Error trying to update loan'); }
                            }); // Loan.update

                            var replace = require('../../lib/textReplace').replace;

                            var q = 'SELECT user.name AS borrower, '
                                  + 'transaction.amount AS principal, '
                                  + 'loan.interest AS interest, '
                                  + 'loan.term*12 AS numPayments, '
                                  + '(transaction.amount*(1+(loan.interest/100)))/(loan.term*12) AS monthlyPayment, '
                                  + 'loan.expires AS beginning '
                                  + 'FROM transaction '
                                  + 'JOIN loan ON loan.id = transaction.loan ' 
                                  + 'JOIN user ON user.id = loan.borrower '
                                  + 'WHERE loan.id = ' + updateLoan.id;

                            User.query(q, function(err, deposits){

                              // Create the contract
                              for(i in deposits){

                                replace(deposits[i].borrower, 
                                        deposits[i].principal, 
                                        deposits[i].interest, 
                                        deposits[i].numPayments, 
                                        deposits[i].monthlyPayment, 
                                        deposits[i].beginning,
                                        updateLoan.id);
                              };


                            });


                          // GENERATE COUNTERPARTY TOKEN
                          /*
                            1) Create contract
                            2) Hash contract
                            3) Counterparty Issuance
                            4) Counterparty Send
                            send --source=[source] --asset=[asset] --quantity=[quantity] --destination=[destination]
                          */

                          // ** loan has been fully funded. release the funds **
                          var releaseForm = new FormData();
                          releaseForm.append('loanId', updateLoan.id);
                          releaseForm.append('lender', req.session.User.id);
                          releaseForm.append('sendaddress', updateLoan.sendaddress);
                          releaseForm.submit('http://localhost:1337/transaction/release', function(err, release){
                            

                            res.redirect('/loan/show');

                          }); //releaseForm.submit
                        } // if
                        else {
                          res.redirect('/loan/show');
                        }; // else
                      }; // else
                    }); // Loan.findOne
                    
                   }); // Loan.query


                 // CAN BE CUT-PASTE OUT

              }); // confirmForm.submit
            //}); // request.get -- CSRF
          }); // trademore.send 
  
        });      


      // COMMENT OUT HERE

      }); // createForm.submit 


    }); // trademore.getnewaddress
  }, // giveFunds

  repay: function(req,res){
    console.log('In loan/replay');
  }, // repay

  destroy: function(req, res, next){

    Loan.findOne(req.param('id'), function foundLoan(err, loan){
      if (err) return next(err);
      if (!loan) return next('Loan doesn\'t exist.');

      console.log('Loan found');
      Loan.destroy(req.param('id'), function loanDestroyed(err){
        if (err) {
          console.log('An error occured');
          return next(err);
        }

        // ** Publish update 

      }); // Loan.destroy

      res.redirect('/user/show/'+req.session.User.id);

    }); // Loan.findOne
  } // destroy

};
