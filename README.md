# Desafio Concrete Solutions
API de usuários criada para o desafio da Concrete Solutions

Endpoints
Sign in: (post) signin
Cadastro: (post) usuario
Busca: (get) usuario/id (com token no header "bearer")

Os tokens são JWT e as senhas são criptografadas no servidor para armazenamento e login utilizando SHA1.
