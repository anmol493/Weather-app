var express=require('express');
var bodyParser=require('body-parser');
var https=require('https');
var app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

var url1="https://api.openweathermap.org/data/2.5/weather?q=";
var url2="&appid=627e0cf38f12d40ca0b74e5e25721d85&units=metric";

app.get("/",function(request,response){
    response.sendFile(__dirname+'/index.html');
});


app.post("/",function(request,response){

   var url3=request.body.city;
    https.get(url1+url3+url2,function(resp){
        console.log(resp.statusCode);
        if(resp.statusCode===200){
        resp.on("data",function(data){
            data=JSON.parse(data);
            response.render('index',{city:url3,temp1:data.main.temp,mi:data.main.temp_min,ma:data.main.temp_max,wea:data.weather[0].description});
        });
    }
    else response.sendFile(__dirname+'/fail.html');
    });
});

app.listen(3000,function(request,respond){
    console.log('server started!');
});
