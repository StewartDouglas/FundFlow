/**
 * Withdrawal
 *
 * @module      :: Model
 * @description :: Description of withdrawals from the deposit escrow accounts
 */

module.exports = {

  schema: true,

  types: {
    size: function() {
       return true;
    }
  },

  attributes: {
  	
  	// signed raw transaction
  	signature : {
  		type: 'string'
  	},

  	lenderID: {
  		type: 'integer'
  	},

  	outstanding: {
  		type: 'boolean'
  	},

  	transactionID: {
  		type: 'integer'
  	},

  	loanID: {
  		type: 'integer'
  	},

    // signed by platform, but not yet by user
    unsignedtx: {
      type: 'string',
      size: 1000
    }

  }

};
