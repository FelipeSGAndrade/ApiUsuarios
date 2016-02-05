module.exports = function(app){
  var controller = app.controllers.usuario;

  app.post('/signin', controller.signin);

  app.post('/usuario', controller.salvaUsuario);

  app.get('/usuario/:id', function(req, res){
    var token = req.headers.bearer;

    if(!token){
        res.status(403).json({ "mensagem" : "Não autorizado." });
    }

    app.jwt.verify(token, app.get('secret'), function(err, decoded){
      if(err){
        res.status(403).json({ "mensagem" : "Não autorizado" });
      }

      controller.obtemUsuario(req, res, token);
    });
  });

  app.use(function(req, res){
    res.status(404).json({ "mensagem" : "Enpoint não encontrado"});
  })
};
