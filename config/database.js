var mongoose = require('mongoose');

module.exports = function(uri, usuario, senha){
  mongoose.connect('mongodb://' + usuario +':' + senha + '@' + uri);

  mongoose.connection.on('connected', function(){
    console.log('Mongoose! Conectado');
  });

  mongoose.connection.on('disconnected', function(){
    console.log('Mongoose! Desconectado');
  });

  mongoose.connection.on('error', function(){
    console.log('Mongoose! Erro na conexão: ' + erro);
  });

  process.on('SIGINT', function(){
    mongoose.connection.close(function(){
      console.log('Mongoose! Desconectado pelo término da aplicação');
      process.exit(0);
    });
  });
};
