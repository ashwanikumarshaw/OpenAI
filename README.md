# OpenAI

AI like ChatGPT AI App in JavaScript

## step by step:

npm create vite@latest client --template vanilla

cd .\client\

npm install

import asserts zip form : https://github.com/adrianhajdin/project_openai_codex/tree/main/client/assets

Add style css for app

Move favicon.ico from assets to public folder

Delete vite.svg and counter.js

Goto the index.html and script.js - add the javascript functions

To run frontend - npm rum dev

create server folder
cd..
cd .\server\

npm init -y

npm install cors dotenv express nodemon openai

Goto openai.com/api
create account

click on accouct name and select api key and create an api key

Create a .ENV file in root of the folder and add a variable OPENAI_API_KEY with value as key

Update package.json
"type": "module",
"scripts": {
"server": "nodemon server"
}

To run server - npm run server
