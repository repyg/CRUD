const db = require('../../sql3-data');
const { parseRequestBody } = require('../../utils/parseRequestBody');

const createUser = async (req, res) => {
    try {
        const { name, email, age } = await parseRequestBody(req);
        if (!name || !email || !age) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Name, email, and age are required' }));
            return;
        }

        db.run('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age], function(err) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error inserting user' }));
                return;
            }

            const newUser = { id: this.lastID, name, email, age };
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        });
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

module.exports = createUser;
