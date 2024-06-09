const userRoutes = require('./userRoutes/userRoutes');

const router = (req, res) => {
    const { method, url } = req;
    const id = url.split('/')[3]; // Assumes ID is in the 4th part of the URL

    if (url.startsWith('/api/users') && method === 'GET' && !id) {
        return userRoutes.listUsers(req, res);
    } else if (url.startsWith('/api/users') && method === 'POST') {
        return userRoutes.createUser(req, res);
    } else if (url.startsWith('/api/users') && method === 'GET' && id) {
        return userRoutes.getUser(req, res, id);
    } else if (url.startsWith('/api/users') && method === 'PUT' && id) {
        return userRoutes.updateUser(req, res, id);
    } else if (url.startsWith('/api/users') && method === 'DELETE' && id) {
        return userRoutes.deleteUser(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

module.exports = router;
