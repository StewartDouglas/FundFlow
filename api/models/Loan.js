/**
 * Loan
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {
  	
  	description: {
  		type: 'string',
  		required: true
  	},

  	amount: {
  		type: 'FLOAT'
  	},

    interest: {
      type: 'FLOAT',
      required: true
    },

    num_coupons: {
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

    outstanding: {
      type: 'BOOLEAN',
      required: true
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
