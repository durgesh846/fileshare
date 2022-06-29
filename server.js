// express server
const express=require('express');
const app =express();
const path=require('path');
const cors=require('cors');

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
  app.use('/api/files',require('./routes/files'));
  app.use('/files',require('./routes/show'));
  app.use('/files/download',require('./routes/download'));

  // Template engine
  app.set('views',path.join(__dirname,'/views'));
  app.set('view engine','ejs');



  