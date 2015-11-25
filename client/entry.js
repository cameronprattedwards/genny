process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

require('babel-core/register');
require('./server.js');
