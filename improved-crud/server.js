const http = require('http');
const router = require('./routes/routerWithUsers');
const db = require('./sql3-data'); // Ensure the database is initialized

const server = http.createServer((req, res) => {
    router(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
