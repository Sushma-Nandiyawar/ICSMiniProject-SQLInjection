var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var data = [];
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Server_123#',
	database : 'account_details'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use("/static", express.static('./static/'));

app.get('/',function(request,response){
    response.sendFile(path.join(__dirname + '/static/login.html'));
});

let Param;
app.post('/show',function(request,response){
    Param = request.body;
    console.log(Param);
});

app.get('/show',function(req, res){
    let pData = {
        data: []
    }
	query = "SELECT account_no, account_balance FROM bank_details WHERE username = '"+ Param.user+"' AND password= '"+ Param.password+"'";
    connection.query(query,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            pData.data = result;
            res.json(pData);
        }
    })

})

app.listen(8080);