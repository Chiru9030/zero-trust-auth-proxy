const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;
const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-zero-trust-key';

// 1. Logging and basic middleware
app.use(morgan('combined'));
app.use(express.json());

// 2. Rate Limiting (Prevent Brute Force/DDoS)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    message: { error: 'Too many requests, please try again later.' }
});

app.use(apiLimiter);

// Mock token generation for testing
app.post('/api/login', (req, res) => {
    // In reality, check DB credentials here.
    const token = jwt.sign({ user: 'admin', role: 'admin_sys' }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// 3. Zero-Trust Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access Denied: Missing Token' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Access Denied: Invalid Token' });
        req.user = user;
        next(); // Authorized! Proceed to the protected microservice boundary
    });
};

// Protected routes (Simulating internal microservices)
app.get('/api/internal/customer-data', authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.user}. You have accessed the protected internal tier securely.` });
});

app.listen(PORT, () => {
    console.log(`[+] Zero-Trust Auth Proxy listening on port ${PORT}`);
});
