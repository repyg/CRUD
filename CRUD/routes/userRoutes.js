const userController = require('../controllers/userController');

const userRoutes = (req, res) => {
    const method = req.method;
    const url = req.url;

    if (url === '/api/users' && method === 'POST') {
        userController.createUser(req, res);
    } else if (url === '/api/users' && method === 'GET') {
        userController.getAllUsers(req, res);
    } else if (url.match(/\/api\/users\/\d+/) && method === 'GET') {
        const id = parseInt(url.split('/')[3]);
        userController.getUserById(req, res, id);
    } else if (url.match(/\/api\/users\/\d+/) && method === 'PUT') {
        const id = parseInt(url.split('/')[3]);
        userController.updateUser(req, res, id);
    } else if (url.match(/\/api\/users\/\d+/) && method === 'DELETE') {
        const id = parseInt(url.split('/')[3]);
        userController.deleteUser(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

module.exports = userRoutes;
