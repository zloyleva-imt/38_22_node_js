start: start_container start_server#start docker container
	@echo Start

stop: #stop docker container
	@sudo docker-compose down

start_container: #start docker container
	@sudo docker-compose up -d

start_server: #start docker container
	@sudo docker-compose exec nodejs npm run dev

show: #show docker's containers
	@sudo docker ps

connect_db: #Connect
	@sudo docker-compose exec db bash
connect_nodejs: #Connect
	@ docker-compose exec nodejs /bin/sh