const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/", function(req, res){
    let currency = req.body.currency;
    
    request(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`, function(error, response, body){
    console.log("Status message: ", response.statusMessage);
    console.log("Server Status Code: ", response.statusCode);

    console.log(response.body);

    let data = JSON.parse(response.body);
    let price;

    if(currency === "EUR") {
        price = data.bpi.EUR.rate;
        console.log("Price in EUR ", price);
    }else{
        price = data.bpi.EUR.rate;
        console.log("Price in USD ", price);
    }

    let diclaimer = data.disclaimer;

    res.write(`${diclaimer}`);
    res.write('<br>');
    res.write(`Current prise in ${currency} is ${price}`);
    res.send();

    });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
}); 	