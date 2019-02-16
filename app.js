/*jshint esversion: 6 */
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const apiKey = "76fc34b989eee84e583fe1dd3f6ea19d-us20";
const apiList = "1905666fc7";

app.get("/", function(req, res){
  //res contiene la direccion del que hizo el get para que le devolvamos la info.
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
   var firstName = req.body.fName;
   var lastName = req.body.lName;
   var email = req.body.email;
   var data = {
     members: [
       {
         email_address: email,
         status:"subscribed",
         merge_fields: {
           FNAME: firstName,
           LNAME: lastName
          }
       }
      ]
    };

   var jsonData = JSON.stringify(data);

   var options = {
      url : "https://us20.api.mailchimp.com/3.0/lists/1905666fc7" ,
      method: "POST",
      //esta es la forma de authenticar usando http para cualquier api, username espacio password
      headers:{
        "Authorization": "lamarquenet 76fc34b989eee84e583fe1dd3f6ea19d-us20"
      },
      body: jsonData
   };

   request(options, function(error, response, body){
      if(error){
        res.sendFile(__dirname+"/failure.html");
      }
      else {
        res.sendFile(__dirname+"/Success.html");
      }
    });
});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("Server started, listening port 3000");
});


//76fc34b989eee84e583fe1dd3f6ea19d-us20
//1905666fc7
