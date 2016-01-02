console.log(new Date().toString());

process.on('uncaughtException', function(err) {
  console.log(`Caught exception: ${err}`);
  console.log(err.stack);
});

require('babel-core/register');
require('./server.js');
