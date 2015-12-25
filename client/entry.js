console.log(new Date().toString());

process.on('uncaughtException', function(err) {
  console.log(`Caught exception: ${err}`);
});

require('babel-core/register');
require('./server.js');
