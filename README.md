sudo -u postgres psql
sudo service postgresql start

cd onu_api/
rails s

cd onu_painel/
npm start