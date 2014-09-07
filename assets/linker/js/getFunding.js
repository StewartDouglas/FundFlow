function updateTextInput(val) {
  document.getElementById('textInput').value=val; 
  var APR1 = val * 0.1;
  APR2 = APR1.toFixed(2);
  document.getElementById('APR1').textContent=APR2; 
  monthly1 = (val*(1+(APR2/100)))/12;
  monthly2 = monthly1.toFixed(2);
  document.getElementById('Monthly1').textContent=monthly2; 

  var APR1 = val * 0.2;
  APR2 = APR1.toFixed(2);
  document.getElementById('APR2').textContent=APR2; 
  monthly1 = (val*(1+(APR2/100)))/24;
  monthly2 = monthly1.toFixed(2);
  document.getElementById('Monthly2').textContent=monthly2; 

  var APR1 = val * 0.3;
  APR2 = APR1.toFixed(2);
  document.getElementById('APR3').textContent=APR2; 
  monthly1 = (val*(1+(APR2/100)))/36;
  monthly2 = monthly1.toFixed(2);
  document.getElementById('Monthly3').textContent=monthly2; 


  if(document.getElementById('1year').checked) {

    document.getElementById('inputExpires').value = 1;
    document.getElementById('inputInterest').value = Number(document.getElementById('APR1').textContent);    

  }else if(document.getElementById('2year').checked) {

    document.getElementById('inputExpires').value = 2;
    document.getElementById('inputInterest').value = Number(document.getElementById('APR2').textContent);  

  }else if(document.getElementById('3year').checked) {

    document.getElementById('inputExpires').value = 3;
    document.getElementById('inputInterest').value = Number(document.getElementById('APR3').textContent); 

  }

};

function updateDetailedDesc(){
  document.getElementById('detailedDescription').value = document.getElementById('detailedDesc').value;
};

/*
$("#loan-form").submit( function(eventObj) {
      $('<input />').attr('type', 'hidden')
          .attr('id', 'detailedDescription')
          .attr('name', 'detailedDescription')
          .attr('value', document.getElementById('detailedDesc').value)
          .appendTo('#loanform');
      console.log('Submitting loan details');
      $("#loan-form").submit();
});
*/

function generateNewAddress() {

  var bitcore = require('bitcore');
  var WalletKey = bitcore.WalletKey;
  var networks  = bitcore.networks;
  var Key = bitcore.Key;

  var k = bitcore.Key.generateSync();

  console.log('Generate Key Pair:');
  console.log('Private:' + bitcore.buffertools.toHex(k.private));
  console.log('Public:'  + bitcore.buffertools.toHex(k.public));

  priv = bitcore.buffertools.toHex(k.private);

   var s = new WalletKey({
    network: networks.testnet
  });
  s.fromObj({ priv: priv});
  var o = s.storeObj();
  console.log("Private: " + o.priv);
  console.log("Public: " + o.pub);
  console.log("Addr: " + o.addr);


  var pub = document.getElementById('newAddress');
  var pr = document.getElementById('privKey');
  pub.value = o.addr;
  pr.value = o.priv;

}; 

