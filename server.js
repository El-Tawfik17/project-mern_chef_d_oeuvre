const express = require('express');
const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');
require('dotenv').config({path:'./config/.env'});

const cors = require('cors');


const app = express();
const userRoutes = require('./routes/user.routes');

const {checkUser,requireAuth} =require('./middleware/auth.middleware');
const postRoutes= require('./routes/post.routes');

require('./config/db');
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  };
app.use(cors(corsOptions));
app.use('/client/public/uploads/profil',express.static('client/public/uploads/profil'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser()); 

// jwt
app.get('*',checkUser);

app.get('/jwtid',requireAuth, (req,res)=>{  res.status(200).send(res.locals.user._id);
});

//user routes
app.use('/api/user',userRoutes);
//post routes
app.use('/api/post',postRoutes);
//server connection
app.listen(process.env.PORT,()=>{console.log(`connected on port  ${process.env.PORT}`)});









