# API de Usuários
Desenvolvido em NodeJS

<b>Endpoints</b>
<br />Sign in: (post) signin
<br />Cadastro: (post) usuario
<br />Busca: (get) usuario/id (com token no header "bearer")

Os tokens são JWT e as senhas são criptografadas no servidor para armazenamento e login utilizando SHA1.
