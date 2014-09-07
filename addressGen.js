#!/usr/local/bin/node

var bitcore = require('bitcore');
var RpcClient = bitcore.RpcClient;

var config = {
  protocol: 'http',
  user: 'bitcoinrpc',
  pass: 'rpcpw1234',
  host: '127.0.0.1',
  port: '18332'
};

var rpc = new RpcClient(config);

rpc.getNewAddress('',function(err, ret) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(ret);
  //var div = document.getElementById('newAddress');
});