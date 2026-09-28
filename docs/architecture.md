# System Architecture & Technical Specifications

## Architectural Overview

The backend is built as a single, decoupled, production-ready monolithic REST service following **Clean Architecture** patterns:

```
HTTP Request
     │
     ▼
[Hardened Middlewares] ── (Helmet, CORS, Rate Limiters, Morgan, Zod Validation, Sanitization)
     │
     ▼
[Express Routes] ─────── (Versioned: /api/v1/public, /api/v1/admin, /api/v1/auth, /health)
     │
     ▼
[Thin Controllers] ───── (Extract params, invoke services, return standardized ApiResponse)
     │
     ▼
[Domain Services] ────── (Pure business logic, orchestration, email notifications)
     │
     ▼
[Repositories] ───────── (Database queries, lean queries, pagination, projection)
     │
     ▼
[Mongoose Models] ────── (Schema validation, indexing, hooks, TypeScript types)
     │
     ▼
[MongoDB Database]
```

## Security Strategy
1. **Network & Protocol**:
   - `helmet` adds `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, and `Strict-Transport-Security`.
   - `express-rate-limit` enforces IP rate quotas to guard against DDoS and credential brute-forcing.
2. **Authentication**:
   - Short-lived Access Tokens (15 min) signed with HS256 / SHA-256.
   - Long-lived Refresh Tokens (7 days) with database token validation and single-use rotation.
   - Password hashing with `bcrypt` (12 salt rounds).
3. **Data Sanitization & Validation**:
   - Incoming payloads are stripped of raw HTML tags and escaped before schema parsing.
   - `Zod` schemas validate types, formats, string length constraints, and regexes.
   - Honeypot fields silently trap automated spammers on public forms.
4. **Resilience**:
   - Unhandled promises and exceptions trigger clean shutdowns without hung sockets.
   - Third-party dependencies (SMTP, Cloudinary) gracefully degrade with fallbacks when unconfigured.
