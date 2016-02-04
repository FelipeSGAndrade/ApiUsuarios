var erro = {'mensagem': 'Usuário e/ou senha inválidos'};

module.exports = function(app){
  var controller = {};
  var Contato = app.models.contato;

  controller.listaContatos = function(req, res){
    Contato.find().populate('emergencia').exec()
      .then(function(contatos){
        res.json(contatos);
      }, function(erro){
        console.error(erro);
        res.status(500).json(erro);
      });
  };

  controller.obtemContato = function(req, res){
    var id = req.params.id;

    Contato.findById(id).exec()
      .then(function(contato){
        if(!contato) throw new Error("Contato não encontrado.");
          res.json(contato);
      }, function(erro){
        console.error(erro);
        res.status(404).json(erro);
      });
  };

  controller.salvaContato = function(req, res){
    var id = req.body._id;

    //testa por undefined
    req.body.emergencia = req.body.emergencia || null;

    if(id){
      Contato.findByIdAndUpdate(id, req.body).exec()
        .then(function(contato){
          res.json(contato);
        }, function(erro){
          console.error(erro);
          res.status(500).json(erro);
        });
    } else {
      Contato.create(req.body)
        .then(function(contato){
          res.status(201).json(contato);
        }, function(erro){
          console.erro(erro);
          res.status(500).json(erro);
        })
    }
  };

  controller.removeContato = function(req, res){
    var id = req.params.id;
    Contato.remove({"_id" : id}).exec()
      .then(function(){
        res.end();
      }, function(erro){
        return console.erro(erro);
      });
  };

  function adiciona(contatoNovo){
    contatoNovo._id = ++ID_CONTATO_INC;
    contatos.push(contatoNovo);
    return contatoNovo;
  }

  function atualiza(contatoAlterar){
    contatos = contatos.map(function(contato){
      if(contato._id == contatoAlterar._id){
        contato = contatoAlterar;
      }
      return contato;
    });

    return contatoAlterar;
  }

  return controller;
};
