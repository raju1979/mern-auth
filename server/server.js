const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

//connect to mongo
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('db connected'))
.catch(err => console.log('DB ERR', err))

// import routes
const authRoutes = require('./routes/auth');

// app middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParse.json());

// if(process.env.NODE_ENV == 'development') {
//     app.use(cors({origin: `http://localhost:3000`}))
// }

// middleware
app.use('/api',authRoutes);


app.listen(port, () => {
    console.log(`App started on ${port} ${process.env.NODE_ENV}`)
})