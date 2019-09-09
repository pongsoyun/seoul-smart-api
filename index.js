const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({success:"실패!!!!"});
});

app.listen(3000, () => {
    console.log('listening 3000 port...');
});
