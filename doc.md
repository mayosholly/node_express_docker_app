install express 

npm install --save express

install sequelize

npm install -g sequelize-cli

sequelize init

install mysql2

sequelize model:generate --name Post --attributes title:string, content:text, imageUrl:string, categoryId:integer, userId:integer 


sequelize db:migrate

npm install --save body-parser
allows to pass data from request, json data from request


sequelize db:seed  --seed 20240219124252-category-seeder.js


sequelize db:seed:undo 
sequelize db:seed:undo --seed  name
sequelize db:seed:undo:all 

npm install --save multer

install bcryptjs , jsonwebtoken , nodemon

npm i faster-validator