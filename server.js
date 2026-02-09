const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/api/generate') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const { videoUrl } = JSON.parse(body);
            console.log('Processing video:', videoUrl);
            
            // Имитация работы AI транскрибатора для MVP
            setTimeout(() => {
                const mockSOP = `# Standard Operating Procedure: Process Overview\n\n## 1. Introduction\nAnalyzed video from ${videoUrl}...\n\n## 2. Steps\n1. Login to the dashboard.\n2. Navigate to Settings.\n3. Toggle the "Automation" switch.\n\n## 3. Conclusion\nProcess verified successfully.`;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ markdown: mockSOP }));
            }, 2000);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`MVP Server running at http://localhost:${PORT}`);
});
