start: #start docker container
	@sudo docker-compose up -d && npx nodemon server.js

stop: #stop docker container
	@sudo docker-compose down

show: #show docker's containers
	@sudo docker ps

connect_db: #Connect
	@sudo docker-compose exec db bash

refresh: #refresh DB & seed
	@sequelize db:migrate:undo:all && sequelize db:migrate && sequelize db:seed:all