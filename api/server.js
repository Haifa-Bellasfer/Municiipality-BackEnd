const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

//Import Routes
const authRoute = require('./routes/authRouter');
const userRoute = require('./routes/userRouter');
const reclamationRoute = require('./routes/reclamationRouter');
const uploadRoute = require('./routes/uploadRouter');

const cors = require('cors');
app.use(
  cors({
    origin: '*',
  })
);

dotenv.config();

const { DB_CONNECT } = process.env;

//connect to DB
mongoose.connect(
  DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log('connected to database')
);

//Middleware
app.use(express.json());
app.use(bodyParser.json());

//Route Middleware
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/reclamation', reclamationRoute);
app.use('/api/upload', uploadRoute);

app.listen(3000, () => console.log(' server running at 3000'));
