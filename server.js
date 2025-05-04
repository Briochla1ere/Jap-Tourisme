const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    let ext = path.extname(filePath);
    let contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
    }[ext] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}).listen(port, () => {
    console.log(`Server running on port ${port}`);
});
