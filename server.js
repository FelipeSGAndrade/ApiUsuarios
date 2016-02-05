var http = require('http');
var app = require('./config/express')();
require('./config/database.js')('ds027759.mongolab.com:27759/desafio_concrete', 'fandrade', 'usuarios');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta ' + app.get('port'));
});
