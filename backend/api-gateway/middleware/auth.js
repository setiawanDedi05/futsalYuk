const emoji = require('node-emoji')
const http = require('http');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({
        message: `Unauthorized ${emoji.get(':confused:')}`
    });

    const options = {
        hostname: 'localhost',
        port: 4000,
        path: '/verify-token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    };

    const proxyReq = http.request(options, (proxyRes) => {
        let body = '';
        proxyRes.on('data', (chunk) => {
            body += chunk;
            const verifyResponse = JSON.parse(body);
            if (verifyResponse.valid) {
                req.user = verifyResponse.user;
                next();
            } else {
                res.status(403).json({ message: `token not valid ${emoji.get(':cry:')}` });
            }
        });
    });

    proxyReq.end();
};

module.exports = { authenticateToken }