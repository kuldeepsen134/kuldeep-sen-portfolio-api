# Kuldeep Sen - Portfolio & Services REST API

Production-ready backend API for **Kuldeep Sen** (Full Stack / MERN Developer & AI Automation Specialist).

Built using **Node.js, Express, TypeScript, and MongoDB** following Clean Architecture principles. It features robust authentication, strict Zod validation, rate limiting, anti-spam mechanisms, graceful SMTP degradation, comprehensive Swagger/OpenAPI documentation, automated unit/integration tests, Docker support, and a complete CI/CD workflow.

---

## 🚀 Key Features

- **Clean Architecture**: Thin controllers, service-based business logic, and repository-isolated database queries.
- **Strict Validation**: All incoming requests (body, query parameters, URL params) validated with **Zod** schemas.
- **Enterprise Security**:
  - **Helmet** for hardened HTTP headers & Content Security Policy.
  - **CORS** configured for authorized frontend origins.
  - **Rate Limiting** across all endpoints with stricter limits for authentication and contact forms.
  - **Input Sanitization & XSS Mitigation**: Strips HTML tags and escapes malicious characters.
  - **Spam Defense**: Honeypot field detection for bot screening.
- **JWT Authentication & Token Rotation**:
  - Access Token (short-lived, 15m) + Refresh Token (long-lived, 7d).
  - Refresh token rotation and token revocation on logout.
- **Resilient Email Abstraction**:
  - Non-blocking asynchronous notifications for contact form inquiries.
  - Graceful fallback: If SMTP credentials are not configured, the app simulates email logs and never crashes.
- **Cloudinary Integration**:
  - Media/document upload support with automatic fallback to data URIs when credentials are omitted.
- **Swagger / OpenAPI 3.0**:
  - Interactive API documentation and testing UI available at `/api/docs`.
- **Health Check & Observability**:
  - Dedicated `/health` endpoint reporting uptime, environment, and MongoDB connection status.
  - Structured **Winston** logging with automatic masking of sensitive credentials.
- **Database Indexing**:
  - Optimized indexes on `slug`, `email`, `status`, `featured`, `category`, and `order`.
  - Lean queries for high-performance public read operations.

---

## 🛠 Tech Stack

- **Runtime**: Node.js (v20+)
- **Framework**: Express.js
- **Language**: TypeScript (Strict mode)
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`
- **Security**: `helmet`, `cors`, `express-rate-limit`
- **Logging**: `winston`, `morgan`
- **Documentation**: `swagger-ui-express`, `swagger-jsdoc`
- **File Uploads**: `multer`, `cloudinary`
- **Testing**: Jest, Supertest, ts-jest
- **Containerization**: Docker, Docker Compose

---

## 📁 Directory Structure

```
.
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI workflow
├── scripts/
│   └── seed.ts                  # Realistic database seed data
├── src/
│   ├── config/
│   │   ├── cloudinary.ts        # Cloudinary SDK setup & fallback
│   │   ├── database.ts          # MongoDB connection & health check
│   │   ├── env.ts               # Strict Zod environment variable parsing
│   │   ├── logger.ts            # Winston logger with sensitive data masking
│   │   └── swagger.ts           # OpenAPI 3.0 specification & Swagger UI
│   ├── constants/
│   │   ├── httpStatusCodes.ts   # Standard HTTP status codes
│   │   ├── messages.ts          # System success & error messages
│   │   └── roles.ts             # User roles
│   ├── controllers/
│   │   ├── admin/               # Admin management controllers
│   │   ├── public/              # Public read & contact controllers
│   │   ├── auth.controller.ts   # Authentication controller (login, refresh, logout)
│   │   └── health.controller.ts # Health check controller
│   ├── middlewares/
│   │   ├── auth.middleware.ts   # JWT verification middleware
│   │   ├── error.middleware.ts  # Centralized error handler
│   │   ├── notFound.middleware.ts # 404 route handler
│   │   ├── rateLimiter.middleware.ts # Rate limiters
│   │   ├── requestLogger.middleware.ts # Morgan request logger
│   │   ├── upload.middleware.ts # Multer memory upload middleware
│   │   └── validate.middleware.ts # Zod validator & sanitization
│   ├── models/                  # Mongoose data models
│   ├── repositories/            # Database query layer
│   ├── routes/                  # Express route definitions
│   ├── services/                # Core business logic layer
│   ├── types/                   # TypeScript interfaces & extensions
│   ├── utils/                   # Reusable utilities (ApiResponse, AppError, JWT, Email)
│   ├── app.ts                   # Express application setup
│   └── server.ts                # Server startup & graceful shutdown
├── tests/
│   ├── setup.ts                 # Test database connection & teardown
│   ├── health.test.ts           # Health check tests
│   ├── auth.test.ts             # Auth & token rotation tests
│   ├── public.test.ts           # Public API tests
│   ├── contact.test.ts          # Contact form & honeypot tests
│   └── admin.test.ts            # Admin protected routes tests
├── Dockerfile                   # Multi-stage production container
├── docker-compose.yml           # Multi-container orchestration (App + MongoDB)
├── eslint.config.mjs            # ESLint flat configuration
├── jest.config.js               # Jest test runner configuration
├── package.json
└── tsconfig.json                # TypeScript strict configuration
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory. You can copy the template:

```bash
cp .env.example .env
```

| Variable | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | Yes | `development` | Environment mode (`development`, `production`, `test`) |
| `PORT` | Yes | `5000` | HTTP port |
| `MONGODB_URI` | Yes | - | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Yes | - | JWT Access Token secret (min 16 chars) |
| `JWT_REFRESH_SECRET` | Yes | - | JWT Refresh Token secret (min 16 chars) |
| `JWT_ACCESS_EXPIRES_IN` | No | `15m` | Access token lifespan |
| `JWT_REFRESH_EXPIRES_IN`| No | `7d` | Refresh token lifespan |
| `CORS_ORIGIN` | No | `*` | Allowed CORS origins (comma-separated for multiple) |
| `ADMIN_NAME` | No | `Kuldeep Sen` | Initial admin account name for seed script |
| `ADMIN_EMAIL` | Yes | `admin@kuldeepsen.com` | Initial admin login email |
| `ADMIN_PASSWORD` | Yes | - | Initial admin login password |
| `SMTP_HOST` | No | - | SMTP server hostname |
| `SMTP_PORT` | No | `587` | SMTP port |
| `SMTP_USER` | No | - | SMTP authentication username |
| `SMTP_PASSWORD` | No | - | SMTP authentication password |
| `MAIL_FROM` | No | - | Sender email header |
| `NOTIFICATION_RECEIVER_EMAIL` | No | - | Recipient for contact form inquiry alerts |
| `CLOUDINARY_CLOUD_NAME` | No | - | Cloudinary cloud identifier |
| `CLOUDINARY_API_KEY` | No | - | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | No | - | Cloudinary API secret |

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed the Database
Populates realistic developer profile data, projects (*Qroffy*, *Course Platform*, *School Management ERP*, *Salon CRM*, *AI Lead Automation*), skills, services, experience, testimonials, blog articles, and an admin user.
```bash
npm run seed
```

### 3. Run in Development Mode
Starts the server with live file watching via `tsx`:
```bash
npm run dev
```

### 4. Build & Run in Production Mode
Compiles TypeScript into `dist/` and runs the production server:
```bash
npm run build
npm start
```

---

## 🧪 Testing & Code Quality

```bash
# Run unit & integration tests
npm test

# Run tests with code coverage report
npm run test:coverage

# Run ESLint check
npm run lint

# Automatically fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

---

## 🐳 Docker Deployment

Run the complete stack (Node.js API + MongoDB container) using Docker Compose:

```bash
# Build and start containers in detached mode
docker-compose up --build -d

# View application logs
docker-compose logs -f app

# Stop containers
docker-compose down
```

---

## 📖 API Documentation & Endpoints

Interactive Swagger UI documentation is available at:
**`http://localhost:5000/api/docs`**

### Public Endpoints (`/api/v1/public`)
- `GET /health` - Service and database connectivity health check
- `GET /api/v1/public/profile` - Public developer profile & contact metadata
- `GET /api/v1/public/projects` - Filterable project list (`?category=`, `?technology=`, `?featured=`, `?search=`, `?page=`, `?limit=`)
- `GET /api/v1/public/projects/:slug` - Detailed project case study
- `GET /api/v1/public/services` - Services offered & technical proficiencies
- `GET /api/v1/public/skills` - Categorized developer skills (`?category=`)
- `GET /api/v1/public/experience` - Career timeline & employment history
- `GET /api/v1/public/testimonials` - Client testimonials (`?featured=true`)
- `GET /api/v1/public/blogs` - Published technical articles with pagination
- `GET /api/v1/public/blogs/:slug` - Full blog post content
- `POST /api/v1/public/contact` - Submit contact inquiry (rate limited, spam protected)
- `GET /api/v1/public/resume` - Resume download URL and metadata (`?redirect=true`)

### Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/login` - Admin login (returns access and refresh tokens)
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Revoke refresh token (Requires `Bearer` token)

### Admin Endpoints (`/api/v1/admin`) — Protected by JWT
- `GET / PUT /api/v1/admin/profile` - Manage profile information
- `GET / POST /api/v1/admin/projects` - Manage projects
- `GET / PUT / DELETE /api/v1/admin/projects/:id` - Project CRUD operations
- `GET / POST /api/v1/admin/services` - Manage services
- `GET / PUT / DELETE /api/v1/admin/services/:id` - Service CRUD operations
- `GET / POST /api/v1/admin/skills` - Manage skills
- `GET / PUT / DELETE /api/v1/admin/skills/:id` - Skill CRUD operations
- `GET / POST /api/v1/admin/experience` - Manage experience records
- `GET / PUT / DELETE /api/v1/admin/experience/:id` - Experience CRUD operations
- `GET / POST /api/v1/admin/testimonials` - Manage testimonials
- `GET / PUT / DELETE /api/v1/admin/testimonials/:id` - Testimonial CRUD operations
- `GET / POST /api/v1/admin/blogs` - Manage blog posts
- `GET / PUT / DELETE /api/v1/admin/blogs/:id` - Blog CRUD operations
- `GET /api/v1/admin/contact` - View submitted client inquiries
- `GET /api/v1/admin/contact/:id` - View single inquiry
- `PATCH /api/v1/admin/contact/:id/status` - Update inquiry status (`unread`, `read`, `replied`, `archived`)
- `DELETE /api/v1/admin/contact/:id` - Delete inquiry
- `POST /api/v1/admin/media/upload` - Upload image/resume file (Multipart form `file`)

---

## 🚢 Deployment Guide

### Deploying to a VPS (Ubuntu / Debian + Nginx + PM2)
1. **Clone & Setup**:
   ```bash
   git clone https://github.com/kuldeepsen/kuldeep-sen-portfolio-api.git
   cd kuldeep-sen-portfolio-api
   npm ci
   cp .env.example .env
   # Edit .env with production credentials
   npm run build
   npm run seed
   ```
2. **Start with PM2**:
   ```bash
   npm install -g pm2
   pm2 start dist/server.js --name "portfolio-api"
   pm2 startup
   pm2 save
   ```
3. **Configure Nginx Reverse Proxy**:
   ```nginx
   server {
       server_name api.kuldeepsen.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
4. **Issue SSL Certificate**:
   ```bash
   sudo certbot --nginx -d api.kuldeepsen.com
   ```

### Deploying to Render / Railway
1. Connect GitHub repository to Render/Railway.
2. Set Environment Variables in dashboard (`MONGODB_URI`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run seed && npm start`
5. Health Check Path: `/health`
