const express = require('express');
const config = require('config');
const appForUser = express.Router();
const mysql = require('mysql');
var connection = mysql.createConnection({
    host : config.get("host"),
    user : config.get("user"),
    password : config.get("password"),
    database : config.get("database")
});
appForUser.get("/",(request,response)=>{
    connection.query("SELECT * FROM Employee_Tb;",(error,result)=>{
        if(error == null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)

        }
        response.end();
    })
})


appForUser.post("/",(request,response)=>{
   
    var query = `insert into Employee_Tb values(${request.body.ename},'${request.body.email}','${request.body.password}','${request.body.empid}','${request.body.dname}','${request.body.doj}')`;
    connection.query(query,(error,result)=>{
        if(error == null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json");
            response.write(data);
        }
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)

        }
        response.end();
    })  
  })
  appForUser.put("/:id",(request,response)=>{
    var query = `update Employee_Tb set ename = '${request.body.ename}', email = '${request.body.email}' , password = '${request.body.password}', empid = '${request.body.empid}', dname = '${request.body.dname}', doj = '${request.body.doj}' where id = ${request.params.id}`;
    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
        })
  })
  appForUser.delete("/:id",(request,response)=>{
    var query = `delete from Employee_Tb where id = ${request.params.id}`;
    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result)
            response.setHeader("Content-Type","application/json");
            response.write(data);
            }
            else
            {
                console.log(error);
                response.setHeader("Content-Type","application/json");
                response.write(error)
                }
                response.end();
                })
  })

module.exports = appForUser;





















/*INSERT INTO Employee_Tb (ename, email, password, empid, dname, doj)
VALUES ('suyog', 'suyog@gmail.com', '123', 1001, 'Marketing', '2023-07-10');*/

