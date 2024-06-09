const db = require('../../sql3-data');

const listUsers = (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error retrieving users' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows));
    });
};

module.exports = listUsers;
