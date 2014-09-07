  var bitcore = require('bitcore');
  var Key = bitcore.Key;
  var Address = bitcore.Address;



  var a, k;
    k = Key.generateSync();
    a = Address.fromKey(k);

  console.log('Address: ' + a.toString());
  console.log('Private Key: ' + k.private.toString('hex'));