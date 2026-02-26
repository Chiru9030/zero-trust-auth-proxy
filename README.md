# Zero-Trust Auth Proxy

A secure Node.js (Express) middleware representing an "identity-aware proxy" conceptualized in Zero-Trust architectures.

## Features
- **JWT Authorization**: All internal routes are blocked by default. Requests must contain a dynamically-signed JSON Web Token.
- **Rate-Limiting**: Enforces strict endpoint throttling per IP address to resist DDoS and Brute Force automated attacks.
- **Audit Logging**: Uses Morgan middleware to maintain standardized Apache-style logs for all traffic flowing into the internal network.

## Setup
```bash
# Install dependencies
npm install

# Run proxy node
npm start
```

## Usage
1. Obtain an auth token via the `/api/login` endpoint.
2. Inject the JWT into the `Authorization: Bearer <TOKEN>` header of subsequent requests to protected internal API paths like `/api/internal/customer-data`.
