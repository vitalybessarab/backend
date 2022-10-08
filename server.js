const express = require('express');
const mysql = require('mysql')
const http = require('http');
const fs = require('fs');

const connection = mysql.createConnection({
    host: "localhost",
    user: "itea",
    password: "itea",
    database: 'itea'
});

const getModulesCount = async (req, res) => {
    const query = 'SELECT * FROM modules';
    connection.query(query, (error, rows) => {
        if(error) throw error;  
        res.json({ count: rows.length });
    });
};

connection.connect(error => {
    if (error) throw error;
    console.log("Connected!");
});

const main = () => {
    const app = express();
	const port = process.env.PORT || 8000;

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });

    app.get('/modules-count', getModulesCount);

    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
};

main();
