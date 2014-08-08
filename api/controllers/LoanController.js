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

    //console.log(req.session.User.id);

    var loanObj = {

      borrower: req.session.User.id,
      description: req.param('description'),
      amount: req.param('amount'),
      interest: req.param('interest'),

      // ** Current defaults **
      num_coupons: 12,
      beginning: new Date(),
      completion:new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
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


  },

  created: function(req,res){
  	res.view();
  },

  show: function(req,res){

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
  },

  fund: function(req,res){
    Loan.findOne(req.param('id'), function foundLoan(err, loan){
      res.view({
        loan: loan
      });
    });
  },

  giveFunds: function(req,res){

    var FormData = require('form-data');
    var request = require('request');
    var trademore = require('../../lib/trademore');

    var createForm = new FormData();
    var confirmForm = new FormData();

    trademore.getnewaddress(function(client_address){

      console.log("Step 1. Client. Creates Address: " + client_address);

      createForm.append('client_address', client_address);
      createForm.append('loan_id', req.param('id'));
      createForm.append('fund', req.param('fund'));
      //console.log('req.param(fund)' + req.param('fund'));
      createForm.submit('http://localhost:1337/transaction/create', function(err,res1){
        
          console.log('Step 4. Client. Receive MultiSig address: ' + res1);

          // 1) Calcualte 5% of amount funded
          // 2) Get BTC/GBP exchange rate
          // 3) Convert to BTC
          // prompt the user whether they wish to continue
          // e.g using jQuery & Bootstrap
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
              confirmForm.submit('http://localhost:1337/transaction/confirm', function(err,res){

                 console.log('Step 8. Client. Receive confirmation message: ' + res); 

                 // var transQuery = 'INSERT INTO '





              }); // confirmForm.submit
            //}); // request.get -- CSRF
          }); // trademore.send     
      }); // createForm.submit 
    }); // trademore.getnewaddress
    
    // ****************************************

    var qry = 'UPDATE loan ' +
              'SET amountFunded=amountFunded+' + req.param('fund') + ' ' +
              'WHERE id='+ req.param('id')

    Loan.query(qry, function updatedLoan(err, loan){

      // ** Handle possible errors **

      // ** Handle case where we have reached our target ** 

      res.redirect('/loan/show');

    })
  },

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

      })

      res.redirect('/user/show/'+req.session.User.id);

    })

  }
};
