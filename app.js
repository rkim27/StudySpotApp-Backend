const express = require('express'); //load up express
const app = express(); //create new instance of express
const morgan = require('morgan'); //load in other dependenciesw
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('.'));
app.use(morgan('short'));

const insertRouter = require('./routes/insert.js'); //create router
app.use('/insert', insertRouter);

app.get('/', (req,res)=>{
    res.send('Hi, root');
});


//server can be pinged at localhost:3002
app.listen(3002, ()=>{ //set up server to listen to port 3002
    console.log('Server is up and listening on port 3001');
});