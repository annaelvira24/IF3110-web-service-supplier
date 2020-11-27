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

app.post('/supply/buy', (req,res) => {
    const {
        balance,
        items,
    } = req.body.BuySupp;
    console.log(req.body.BuySupp.balance);
    
    function getPrice(id) {
        return new Promise((resolve, reject) => {
            var q = 'SELECT harga_satuan FROM bahan WHERE id_bahan = ?';
            connection.query(q, [id], (err, result) => {
                if(err) {console.log(error);}
                resolve(result);
            });
        })
    }

    async function getTotal() {
        var total = 0;
        var status = '';
        let money = 0;
        for (const item of req.body.BuySupp.items) {
            let result = await getPrice(item.id);
            let priceStr = JSON.stringify(result);
            let priceJSON = JSON.parse(priceStr);
            let price = priceJSON[0].harga_satuan;
            let subtotal = item.amount * price;
            total += subtotal;
        }
        if(total > req.body.BuySupp.balance) {
            money = total - req.body.BuySupp.balance;
            status = 'failed';
        }
        else {
            money = req.body.BuySupp.balance - total;
            status = 'success';
        }
        const objRes = {'money': money, 'status': status}
        res.send(objRes);
    }
    
    getTotal();

});

app.listen(port, () => console.log("Backend server live on  " + port));