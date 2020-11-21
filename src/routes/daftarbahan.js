const router = require('express').Router();
const connection = require('../db/connection');
// const cors = require("cors");

router.get('/', (req, res) => {
    connection.query('SELECT * FROM bahan', (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});

module.exports = router;