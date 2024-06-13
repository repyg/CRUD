const userModel = require('../models/userModel');
const { parseRequestBody } = require('../utils/parseRequestBody');

const createUser = async (req, res) => {
    try {
        const { name, email, age } = await parseRequestBody(req);
        console.log('Create User:', { name, email, age });
        if (!name || !email || !age) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Name, email, and age are required' }));
            return;
        }
        const newUser = userModel.createUser(name, email, age);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    } catch (err) {
        console.error('Error:', err.message); 
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

const getAllUsers = (req, res) => {
    const users = userModel.getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
};

const getUserById = (req, res, id) => {
    const user = userModel.getUserById(id);
    if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
};

const updateUser = async (req, res, id) => {
    try {
        const { name, email, age } = await parseRequestBody(req);
        console.log('Update User:', { name, email, age });
        if (!name || !email || !age) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Name, email, and age are required' }));
            return;
        }
        const updatedUser = userModel.updateUser(id, name, email, age);
        if (!updatedUser) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
    } catch (err) {
        console.error('Error:', err.message); 
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

const deleteUser = (req, res, id) => {
    const deleted = userModel.deleteUser(id);
    if (!deleted) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User deleted successfully' }));
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
