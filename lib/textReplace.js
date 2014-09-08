module.exports = {

	replace: function(borrower,principal,interest,numPayments,monthlyPayments,beginning,id){
		var fs = require('fs');
		var ripemd160 = require('ripemd160');

		fs.readFile('/Users/stewart/Documents/My\ Work/1\)\ ICL/\*BitCoin/App/trademore/lib/hash.txt', 'utf8', function (err,data) {
		  if (err) {
		    return console.log(err);
		  }
		  var today = new Date();
		  var result = data.replace(/_BORROWER_/g, borrower);
		  var result = result.replace(/_DATE_/g, today);
		  var result = result.replace(/_INTEREST_/g, interest);
		  var result = result.replace(/_PRINCIPAL_/g, principal);
		  var result = result.replace(/_NUM_PAYMENTS_/g, numPayments);
		  var result = result.replace(/_INSTALLMENT_AMOUNT_/g, monthlyPayments);
		  var result = result.replace(/_BEGINNING_/g, beginning);
		  var ripemd = ripemd160(result).toString('hex');

		  // supply the command line arguments
		  var exec = require('child_process').exec;
			exec('python3 ' + __dirname + '/issue.py ' + ripemd, function(error, stdout, stderr) {
			    if (error !== null) {
			        console.log('Sorry, unable to issue assets at this time');
			    }
			});

		  fs.writeFile('/Users/stewart/Documents/My\ Work/1\)\ ICL/\*BitCoin/App/trademore/lib/contracts/LegalContract' + id +'.txt', result, 'utf8', function (err) {
		     if (err) return console.log(err);
		  });
		});
	}
}