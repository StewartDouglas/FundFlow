/**
 * Withdrawal
 *
 * @module      :: Model
 * @description :: Description of withdrawals from the deposit esrow accounts
 */

module.exports = {

  schema: true,

  attributes: {
  	
  	// signed raw transaction
  	signature : {
  		type: 'string'
  	},

  	lender: {
  		type: 'integer'
  	},

  	outstanding: {
  		type: 'boolean'
  	}

  }

};
