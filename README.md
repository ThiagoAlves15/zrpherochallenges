- sudo -u postgres psql
- sudo service postgresql start

## With docker

# Setup
$ docker-compose run onu_painel yarn
$ docker-compose run onu_api bin/rails db:create db:migrate db:seed

# Start
$ docker-compose up -d

## Without docker
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