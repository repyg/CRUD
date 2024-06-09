const db = require('../../sql3-data');

const deleteUser = (req, res, id) => {
    db.run('DELETE FROM users WHERE id = ?', id, function(err) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error deleting user' }));
            return;
        }

        if (this.changes === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User deleted successfully' }));
    });
};

module.exports = deleteUser;
