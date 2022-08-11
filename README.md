- sudo -u postgres psql
- sudo service postgresql start

- cd onu_api/
- rails s

- cd onu_painel/
- npm start

TODO:
 - Refatorar componentes (AppBar, Forms, Slices em especial);
 - Resolução de ocorrências por timer (Etapa 4);
 - Dois herois em uma ocorrência (Etapa 5);
 - Polling de ocorrências fora do front-end;
 - Diferentes níveis de acesso (Admin / User);
 - (Maybe) paginizar respostas da API;
 - Testes. Todos eles;
 - Dockerizar;
 - Pipeline de testes no Github;
 - Subir no Heroku;