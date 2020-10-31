# Installation
```console
git clone https://github.com/sumansarkarwd/assignment-webskitters.git
cd assignment-webskitters
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
 - http://localhost:4000/api/user/register 
 - http://localhost:4000/api/user/login
 - http://localhost:4000/api/user/me


