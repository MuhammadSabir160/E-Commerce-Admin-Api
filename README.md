Use node version 20
PostGresSql is being used as a Database.
Node express is used for creating api.


-------------------------------------------------------------

In Database product, inventory and Sale are connected.
Product Id is being used as a foreign key in sales and inventory table.

-------------------------------------------------------------


Get a clone of a project.
Install packages using npm install
Install a docker 
create a container in docker using command : docker-compose up -d
run  migration using command : npx sequelize-cli db:migrate
run seed command to insert records : npx sequelize-cli db:seed:all

--------------------------------------------------------------


run command to start the project: npm run dev

---------------------------------------------------------------

test the api in postman using : 
http://localhost:3000/api/products/          ===>   use specified path given in routes
