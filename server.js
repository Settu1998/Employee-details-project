require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const tasks = require('./backend/routes/tasks');
const connectDB = require('./backend/db/connect');
const notFound = require('./backend/middleware/not-found');


app.use(cors());
//app.use(express.static('./Fronend'))
app.use(express.json());


app.use('/api/v1/tasks',tasks);

app.use(notFound);

const port = 5000
const start = async () =>{
try{
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}... oik`));
}
catch(error){
console.log(error);
}
}

start();
