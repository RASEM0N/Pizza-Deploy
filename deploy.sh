rm -rf backend
rm -rf frontend

git clone https://github.com/RASEM0N/Pizza-Client.git frontend
git clone https://github.com/RASEM0N/Pizza-Backend.git backend

cp ./DockerfileBackend ./backend/Dockerfile
cp ./DockerfileFrontend ./frontend/Dockerfile

cp ./.env ./backend/.env
cp ./.env ./frontend/.env

docker-compose up --build