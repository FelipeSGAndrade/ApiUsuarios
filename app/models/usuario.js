var mongoose = require('mongoose');

module.exports = function(){
  var schema = mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, index: { unique:true } },
    senha: { type: String, required: true },
    telefones: [{ numero: { type: Number }, ddd: { type: Number } }],
    data_criacao: { type: Date, default: Date.now },
    data_atualizacao: { type: Date, default: Date.now },
    ultimo_login: { type: Date, default: Date.now },
    token: { type: String }
  });

  return mongoose.model('Usuario', schema);
};
