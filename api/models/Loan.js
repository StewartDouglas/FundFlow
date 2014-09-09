/**
 * Loan
 *
 * @module      :: Model
 * @description :: A representation of a Loan
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {

    borrower: {
      type: 'INTEGER',
      required: true
    },
  	
  	description: {
  		type: 'string',
  		required: true
  	},

    extendedDescription: {
      type: 'string',
      size: 1000
    },

  	amount: {
  		type: 'FLOAT',
  		required: true
  	},

    interest: {
      type: 'FLOAT',
      required: true
    },

    term: {
      type: 'INTEGER',
      required: true
    },

    beginning: {
      type: 'DATE',
      required: true
    },

    completion: {
      type: 'DATE',
      required: true
    },

    // The date by which the loan must be funded
    expires: {
      type: 'DATETIME',
      required: true
    },

    fullyFunded: {
      type: 'BOOLEAN',
      required: true
    },

    // Default = 0
    amountFunded: {
      type: 'FLOAT',
      required: true
    },

    // The address to send BTC funds
    sendaddress: {
      type: 'string',
      required: true,
      minLength: 27,
      maxLength: 34
    },

    monthlyPayment: {
      type: 'FLOAT'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
    
  }

};
