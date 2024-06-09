const db = require('../../sql3-data');

const getUser = (req, res, id) => {
    db.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error retrieving user' }));
            return;
        }

        if (!row) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(row));
    });
};

module.exports = getUser;
