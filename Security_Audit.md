# Security Audit — Polling App
Date: 2025-09-03

## Overview
This audit identifies security weaknesses and the actions taken to remediate them.

## Vulnerabilities Found & Fixes

1. **No Authentication for Critical Endpoints**
   - Impact: Anyone can create polls and manipulate results.
   - Fix: Added simple token-based admin middleware (src/middleware/adminAuth.js).
   - Recommendation: Replace with JWT or OAuth for production.

2. **Input Validation & Prototype Pollution**
   - Impact: Malicious option names (e.g., __proto__) could lead to prototype pollution.
   - Fix: Sanitized option names; reject invalid names; convert arrays -> safe option objects in src/models/pollModel.js.

3. **Rate Limiting / DoS**
   - Impact: Attackers can spam votes or create polls.
   - Fix: Added express-rate-limit in app.js (60 req/min default).

4. **Security Headers**
   - Impact: Missing safe headers increase XSS/Clickjacking risk.
   - Fix: Added helmet middleware.

5. **Returning Internal Objects**
   - Impact: External mutation of returned objects can corrupt internal state.
   - Fix: Return cloned objects from model functions.

## Tests added
- Integration tests for invalid input, protected create route, and invalid votes.

## Deployment notes
- Use HTTPS in production, set secure cookies, rotate admin tokens, use env vars.
