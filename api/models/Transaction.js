/**
 * Transaction
 *
 * @module      :: Model
 * @description :: A representation of (atomic) transactions, e.g. deposits
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {

  	// The amount deposited
    amount: {
    	type: 'FLOAT',
    	required: true
    },

    loan: {
    	type: 'INTEGER',
    	required: true
    },

    // Should be a Foreign Key of User::id
    lender: {
    	type: 'INTEGER',
    	required: true
    },

    toaddress: {
    	type: 'string'
    },

    txid: {
    	type: 'string'
    }
    
  }

};
