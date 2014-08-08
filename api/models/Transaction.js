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
    	require: true
    },

    loan: {
    	type: 'INTEGER',
    	require: true
    },

    // Should be a Foreign Key of User::id
    lender: {
    	type: 'INTEGER',
    	require: true
    }
    
  }

};
