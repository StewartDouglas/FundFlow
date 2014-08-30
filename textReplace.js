var fs = require('fs')

fs.readFile('./hash.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/_BORROWER_/g, 'Stewart');

  fs.writeFile('./hash.txt', result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});