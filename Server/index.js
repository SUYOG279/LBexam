const express =  require('express');
const config = require('config');


const empsRelatedRoutes = require('./routes/emps');


const app = express();

app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods', "*")
    next();
})

app.use(express.json()); 


app.use('/emps',empsRelatedRoutes)

const portNo = config.get("PORT");
app.listen(portNo,()=>{console.log("Server Started at " + portNo)})