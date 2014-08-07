/**
 * Transaction
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    amount: {
    	type: 'FLOAT',
    	require: true
    },

    loan: {
    	type: 'INTEGER',
    	require: true
    }
    
  }

};
