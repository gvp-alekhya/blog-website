
The application allows user to upload and display content to users.

It has a specific template where user can upload a title, description, audio and viode for a blog.

To set up container on AWS EC2 instance:

sudo yum install -y docker
sudo service docker start
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

 ~/.nvm/nvm.sh
nvm install node

docker run -d -p 80:8080 <dockerrepo>/<appname>:<tagname(V1)>

docker build -t  <dockerrepo>/<appname>:<tagname(V1)> .

publish 
docker login registry-1.docker.io

push
docker push orugantialekhya15/<appname>:<tagname(V1)>


This is a starter template for [Learn Next.js](https://nextjs.org/learn).