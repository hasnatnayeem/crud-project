docker build -t hasnatnayeem/frontend .

docker run -d --name frontend -p 4200:80 hasnatnayeem/frontend

docker-compose up -d