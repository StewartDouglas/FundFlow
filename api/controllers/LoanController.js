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
      description: req.param('description'),
      amount: req.param('amount'),
      interest: req.param('interest'),

      // ** Current defaults **
      num_coupons: 12,
      beginning: new Date(),
      completion:new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      // **********************

      outstanding: 1
    }

  	Loan.create(loanObj, function loanCreated(err,loan){
  		      // // If there's an error
      // if (err) return next(err);

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

    var qry = 'SELECT * FROM loan WHERE outstanding=true';
    Loan.query(qry, function foundLoan(err,loan){
      res.view({
        loan: loan
      });
    });
  } 
  
};
