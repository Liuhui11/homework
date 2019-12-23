const express = require('express');
const app = express();

app.get('/api/info', (req, res) => {
    res.json({
        name: '刘慧',
        age: 18,
        msg: '测试'
    });
});

app.listen('9000');

// http://localhost:9000/api/info