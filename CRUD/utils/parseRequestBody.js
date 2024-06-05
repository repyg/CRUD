const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const parsedBody = JSON.parse(body);
                console.log('Parsed Body:', parsedBody); 
                resolve(parsedBody);
            } catch (err) {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = {
    parseRequestBody
};
