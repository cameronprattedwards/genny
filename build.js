var fs = require('fs');
var path = require('path');

var files = fs.readdirSync(path.join(__dirname, 'steps/html'));
console.log(JSON.stringify(files));
