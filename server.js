var http = require('http');
var app = require('./config/express')();
require('./config/database.js')('mongodb://fandrade:usuarios@ds055565.mongolab.com:55565/fandrade_usuarios');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta ' + app.get('port'));
});
