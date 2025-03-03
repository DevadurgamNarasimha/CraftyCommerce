require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const morgan=require('morgan');
const fs=require('fs');
const path=require('path');
const userRoutes=require('./routes/userRoutes');
const app=express();
const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log('MongoDB Connected'))
  .catch(err=>console.log.error(err));
  app.use(express.json());
  const logStream=fs.createWriteStream(path.join(__dirname,'logs','activity.log'),{flags:'a'});
  app.use(morgan('combined',{stream:logStream}));
  app.use('/api/users',userRoutes);
  app.listen(PORT,()=>console.log(`server running on port ${PORT}`));