const db = require('../../sql3-data');
const { parseRequestBody } = require('../../utils/parseRequestBody');

const updateUser = async (req, res, id) => {
    try {
        const { name, email, age } = await parseRequestBody(req);
        if (!name || !email || !age) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Name, email, and age are required' }));
            return;
        }

        db.run('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', [name, email, age, id], function(err) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error updating user' }));
                return;
            }

            if (this.changes === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
                return;
            }

            const updatedUser = { id, name, email, age };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updatedUser));
        });
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

module.exports = updateUser;
