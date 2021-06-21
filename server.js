const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register =require('./controlllers/register');
const signin = require('./controlllers/signin');
const profile =require('./controlllers/profile');
const imageurl=require('./controlllers/imageurl');
require('dotenv').config();

const db = knex({
  client: 'pg',

  connection:`${process.env.DATABASE_URL}`,

});



const app = express();
app.use(cors())
app.use(express.json());

app.get('/', async(req, res)=> {
const data= await db.select('*').from('users');
console.log(data);
res.send('hello');
});

app.post('/imageurl', (req, res) => {
  imageurl.handleImageUrl(req, res);
});

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, bcrypt, db);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.listen( 3000, ()=> {
  console.log('app is running on port 3000');
});

