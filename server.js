var express = require("express");
var app = express();
var path= require("path");
var dataService = require("./data-service.js");
var HTTP_PORT = process.env.PORT || 8080;



function onHttpStart() {

    console.log("Express http server listening on "+ HTTP_PORT);
    return new Promise(function(reslove, reject){
        dataService.initialize().then(function(value){
            console.log(value);
        }).catch(function(reason){
                console.log(reason);
            });
    });

}

app.use(express.static('public'));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});


app.get("/employees", function(req, res){
    dataService.getAllEmployees().then((data)=>{
        res.json(data);
    }).catch((error)=>{
        res.json({message, error})
    });
    
});

app.get("/managers", function(req,res){
   
   dataService.getManagers().then(function(data){
        res.json(data);
   }).catch(function(err){
       res.json({message: err});
   });

 
 });


app.get("/departments", function(req,res){
    
    dataService.getDepartments().then(function(data){
        res.json(data);
    }).catch(function(err){
        res.json({message: err});
    });
   
});

app.use(function(req, res){
    res.status(404).send("PAGE NOT FOUND!!!!!!!!!!!");
});

app.listen(HTTP_PORT, onHttpStart);


