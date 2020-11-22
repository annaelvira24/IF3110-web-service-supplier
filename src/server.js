var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
var cors = require("cors");
var bodyParser = require('body-parser');
var connection = require('./db/connection');


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/supply', (req, res) => {
    connection.query('SELECT * FROM bahan', (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});

app.get('/supply/:id', (req, res) => {
    var id = req.params.id;
    connection.query('SELECT * FROM bahan WHERE id_bahan = ' + id, (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});

app.post('/supply/buy', (req,res) => {
    const {
        balance,
        supp_id,
        amount,
    } = req.body.BuySupp;
    console.log(balance);
})

app.listen(port, () => console.log("Backend server live on  " + port));