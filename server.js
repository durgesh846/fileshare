// express server
const express=require('express');
const app =express();
const path=require('path');
const cors=require('cors');
const auth=require('./middleware/auth');
const bcrypt=require('bcrypt');

// Cors

const corsOptions={
  origin:'*'
}

const PORT=process.env.PORT || 3000;
app.use(express.static('public'))
app.use(cors(corsOptions))
app.use(express.json());
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
// main ke nneche
// "scripts": {
  //   "test": "echo \"Error: no test specified\" && exit 1"
  // },


  // database ko server se connect krne ke liye
  const connectDB=require('./config/db');
  connectDB();
  // Routes
  app.use('/register',require('./routes/register'))// to register user
  app.use('/login',require('./routes/login'))// to login user
  app.use('/api/files',require('./routes/files'));
  app.use('/files',require('./routes/show'));
  app.use('/files/download',require('./routes/download'));

  app.get('/home',auth,(req,res)=>{
    res.render('home');
});

app.get('/logout',auth,async (req,res)=>{
    try{
        res.clearCookie('jwt');
        res.redirect('/');
    }catch(error){
        res.status(500).send(error);
    }

})

  // Template engine
  app.set('views',path.join(__dirname,'/views'));
  app.set('view engine','ejs');



  