let users = [];
let nextId = 1;

const getAllUsers = () => users;

const getUserById = (id) => users.find(user => user.id === id);

const createUser = (name, email, age) => {
    const newUser = { id: nextId++, name, email, age };
    users.push(newUser);
    return newUser;
};

const updateUser = (id, name, email, age) => {
    const user = users.find(user => user.id === id);
    if (!user) return null;
    user.name = name;
    user.email = email;
    user.age = age;
    return user;
};

const deleteUser = (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    users.splice(userIndex, 1);
    return true;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};