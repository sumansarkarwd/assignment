# Installation
```console
git clone https://github.com/sumansarkarwd/assignment
cd assignment
npm i
cp .env.example .env
node ./seeder/admin_seeder.js -i
node ./seeder/country_seeder.js -i
node ./seeder/states_seeder.js -i
node server.js
```

## Admin login URL
http://localhost:4000/admin/login
## API URL => 
http://localhost:4000/api/user/register 
 ```js
 body
 {
    "first_name": "example",
    "last_name": "USER",
    "email": "example1@gmail.com",
    "password": "123456",
    "formatted_address": "Kolkata",
    "state_id": "5f9d2c284a258e3cd329989e",
    "country_id": "5f9d2d5fd04b513f5d554141",
    "phone": "7531594563",
    "dob": "14-06-1996"
}
 ```
 http://localhost:4000/api/user/login
 ```js
 body
 {
    "email": "example@gmail.com",
    "password": "123456"
}
 ```
http://localhost:4000/api/user/me
 ```js
 header
 Authorization:JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZXN0Iiwic3ViIjoiNWY5ZDZmOWU4YWIyYjgxZDUyYzhiNzc4IiwiaWF0IjoxNjA0MTUzMjQ2MjczLCJleHAiOjE2MDQyMzk2NDYyNzN9.vE3LT19lQ2pJhgIxvnCgOVfjcCabIRbJujQ-bMC99vM
 ```


