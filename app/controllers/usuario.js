var naoEncontrado = {'mensagem': 'Usuário e/ou senha inválidos'};

module.exports = function(app){
  var controller = {};
  var Usuario = app.models.usuario;

  controller.signin = function(req, res){
    var email = req.body.email;

    Usuario.findOne().where({email: email}).exec()
      .then(function(usuario){
        if(!usuario){
          res.status(401).json(naoEncontrado);
        }

        var hash = app.crypto.createHash('sha1').update(req.body.senha).digest('hex');

        if(usuario.senha != hash){
          res.status(401).json(naoEncontrado);
        }

        var token = app.jwt.sign({ email: usuario.email }, app.get('secret'), { expiresIn: 3600 });
        usuario.token = token;
        usuario.ultimo_login = Date.now();

        Usuario.findByIdAndUpdate(usuario._id, usuario, { new: true }).exec()
          .then(function(usuario){
            res.json(usuario);
          }, function(erro){
            console.error(erro);
            res.status(500).json(erro);
          });
      }, function(erro){
        console.error(erro);
        res.status(500).json(erro);
      });
  };

  controller.obtemUsuario = function(req, res, token){
    var id = req.params.id;

    Usuario.findById(id).exec()
      .then(function(usuario){
        if(usuario.token != token){
          res.status(403).json({ "mensagem": "Não autorizado." });
        }

        var limite = new Date(usuario.ultimo_login);
        limite.setTime(limite.getTime() + 30*60*1000);

        if(Date.now() >= limite){
          res.status(403).json({ "mensagem": "Sessão inválida." });
        }

        if(!usuario) throw new Error("Usuario não encontrado.");
          res.json(usuario);
      }, function(erro){
        console.error(erro);
        res.status(404).json(erro);
      });
  };

  controller.salvaUsuario = function(req, res){
    var id = req.body._id;

    if(id){
      Usuario.findByIdAndUpdate(id, req.body).exec()
        .then(function(usuario){
          res.json(usuario);
        }, function(erro){
          console.error(erro);
          res.status(500).json(erro);
        });
    } else {
      var token = app.jwt.sign({ email: req.body.email }, app.get('secret'), { expiresIn: 3600 });

      req.body.token = token;

      var hash = app.crypto.createHash('sha1').update(req.body.senha).digest('hex');
      req.body.senha = hash;

      Usuario.create(req.body)
        .then(function(usuario){
          res.status(201).json(usuario);
        }, function(erro){
          if (erro.code == 11000)
            res.json({ "mensagem": "E-mail existente." });

          console.error(erro.toString());
          res.status(500).json(erro);
        });
    }
  };

  controller.removeUsuario = function(req, res){
    var id = req.params.id;
    Usuario.remove({"_id" : id}).exec()
      .then(function(){
        res.end();
      }, function(erro){
        return console.erro(erro);
      });
  };

  return controller;
};
