/**
 * LoanController
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



  // This loads the sign-up page --> new.ejs
  'new': function(req, res) {
    res.view();
  },

  create: function(req,res, next){

  	console.log('Creating loan now');

    var loanObj = {

      borrower: req.session.User.id,
      description: req.param('description'),
      amount: req.param('amount'),
      interest: req.param('interest'),

      // ** Current defaults **
      num_coupons: 12,
      beginning: new Date(),
      completion:new Date(),
      expires: new Date(),
      amountFunded: 0,
      // **********************


      fullyFunded: false
    }

  	Loan.create(loanObj, function loanCreated(err,loan){
  		
      // If there's an error
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.redirect('/loan/new');

		}

		res.redirect('/loan/created');

  	})


  }, // create

  created: function(req,res){
  	res.view();
  }, // created

  show: function(req,res){

    //console.log(session);
    //console.log(user);
    //console.log('req.session.User.id: ' + req.session.User.id);

    var qry = 'SELECT user.name AS borrower, '
                   + 'user.id AS user_id, '
                   + 'loan.description AS description, '
                   + 'loan.amount AS amount, '
                   + 'loan.interest AS interest, '
                   + 'loan.beginning AS beginning, '
                   + 'loan.id AS id, '
                   + 'loan.expires AS expires, '
                   + 'loan.amountFunded AS amountFunded '
                   + 'FROM loan JOIN user ON user.id = loan.borrower '
                   + 'WHERE loan.fullyFunded=false';
    Loan.query(qry, function foundLoan(err,loan){
      res.view({
        loan: loan
      });
    });
  }, // show

  fund: function(req,res){
    Loan.findOne(req.param('id'), function foundLoan(err, loan){
      res.view({
        loan: loan
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
          });

      // COMMENT OUT HERE

          // 1) Calcualte 5% of amount funded
          // 2) Get BTC/GBP exchange rate
          // 3) Convert to BTC
          // ** Also, generate full transaction but don't broadcast?

          // send the deposit
          // placeholder address and BTC
          trademore.send('mnedNAgowyPETk2ym4a3b8sCyzh65wEuiA',0.00001,function(txid){

            console.log('Step 5. Client. Generate transaction with txid: ' + txid)

            //request.get('http://localhost:1337/csrfToken', function(error, getResponse, getBody){
              // CRSF currently turned off. See config/csrf.js
              //console.log('JSON.parse(getBody) :' + JSON.parse(getBody)._csrf);

              confirmForm.append('txid', txid);
              confirmForm.append('fund', req.param('fund'));
              confirmForm.append('transID', resultObject.id);
              confirmForm.submit('http://localhost:1337/transaction/confirm', function(err,resp){

                 console.log('Step 8. Client. Receive confirmation message: ' + resp); 

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
                            console.log('Loan ' + updateLoan.id + ' has been fully funded.');
                            Loan.update({id: updateLoan.id},{fullyFunded : 1},function(err,fundedLoan){
                              if(err) { console.log('Error trying to update loan'); }
                              else { console.log('Loan status updated to fully funded'); }
                            }); // Loan.update
                          
                          // ** loan has been fully funded. release the funds **
                          var releaseForm = new FormData();
                          releaseForm.append('loanId', updateLoan.id);
                          releaseForm.append('lender', req.session.User.id);
                          releaseForm.submit('http://localhost:1337/transaction/release', function(err, release){
                            console.log('Executing Transaction::release');

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
  
      // COMMENT OUT HERE

      }); // createForm.submit 


    }); // trademore.getnewaddress
  }, // give Funds

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

    })

  }
};
