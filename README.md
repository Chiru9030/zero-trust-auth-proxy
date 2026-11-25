# Zero-Trust Authentication Proxy

A lightweight Node.js/Express middleware layer that enforces Zero-Trust principles (identity verification and rate limiting) before routing traffic to internal microservices.

## 📖 Complete Brief
The "Zero-Trust" security model operates on the principle of "never trust, always verify." Regardless of where a request originates—even if it's coming from an internal corporate network—it must be cryptographically authenticated. This proxy acts as a secure gateway. It intercepts incoming HTTP requests, validates JSON Web Tokens (JWTs) to confirm identity (`authenticateToken`), and implements strict Rate Limiting to mitigate Distributed Denial of Service (DDoS) and brute-force attacks. Only after all checks pass is the traffic allowed to proceed to the simulated internal microservices.

## ✨ Features
- **JWT Authentication:** Cryptographically verifies user identity using JSON Web Tokens.
- **Anti-DDoS Rate Limiting:** Uses `express-rate-limit` to throttle aggressive IPs and stop automated brute-forcing.
- **REST API Middleware:** Designed to sit in front of vulnerable applications as a protective reverse-proxy layer.
- **Access Logging:** Employs `morgan` for standardized HTTP request logging, vital for post-incident forensics.

## 🛠 Prerequisites
- Node.js
- npm or yarn

## 🚀 How to Run

1. **Navigate to the proxy directory:**
   ```bash
   cd ./zero-trust-auth-proxy/
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the proxy server:**
   ```bash
   node server.js
   ```

4. **Testing the Proxy Environment:**
   Open a separate terminal to test the API using `curl`.

   *Try to access the protected route without a token (Will receive 401 Unauthorized):*
   ```bash
   curl http://localhost:8080/api/internal/customer-data
   ```

   *Generate a valid token by simulating a login:*
   ```bash
   curl -X POST http://localhost:8080/api/login
   ```

   *Use the generated token to access the internal tier (Replace `<YOUR_TOKEN>` with the token from the previous step):*
   ```bash
   curl -H "Authorization: Bearer <YOUR_TOKEN>" http://localhost:8080/api/internal/customer-data
   ```
