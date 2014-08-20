/**
 * Logger configuration
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which 
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#documentation
 */



  // Valid `level` configs:
  // i.e. the minimum log level to capture with sails.log.*()
  //
  // 'error'	: Display calls to `.error()`
  // 'warn'	: Display calls from `.error()` to `.warn()`
  // 'debug'	: Display calls from `.error()`, `.warn()` to `.debug()`
  // 'info'	: Display calls from `.error()`, `.warn()`, `.debug()` to `.info()`
  // 'verbose': Display calls from `.error()`, `.warn()`, `.debug()`, `.info()` to `.verbose()`
  //


  //var winston = require('winston');
  module.exports = {

    log: {
     level: 'info'
    }
    
      // 'log': {
      //     'custom': new (winston.Logger)({
      //         'transports': [
      //             new (winston.transports.Console)({
      //                 'level': 'info',
      //                 'colorize': true,
      //                 'timestamp': false,
      //                 'json': false
      //             }),
      //             new winston.transports.File({
      //                 'level': 'debug',
      //                 'colorize': false,
      //                 'timestamp': true,
      //                 'json': true,
      //                 'filename': './logs/trademore.log',
      //                 'maxsize': 5120000,
      //                 'maxFiles': 3
      //             })
      //         ]
      //     })
      // }

  };

