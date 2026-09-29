import { Express } from 'express';

export const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Kuldeep Sen - Portfolio & Services API',
    version: '1.0.0',
    description: `
Production REST API for Kuldeep Sen (Full Stack / MERN Developer & AI Automation Specialist).

### Highlights:
- **Clean Architecture**: Decoupled routes, controllers, services, repositories, and models.
- **Security**: JWT Authentication (Access + Refresh tokens), Helmet, Strict CORS, Rate Limiting, Sanitization, Zod Validation.
- **Resilience**: SMTP Fallback, Cloudinary Fallback, Structured Winston Logging, Centralized Error Handling.
    `,
    contact: {
      name: 'Kuldeep Sen',
      email: 'admin@kuldeepsen.com',
      url: 'https://kuldeepsen.com'
    }
  },
  // Relative URL: works on localhost as well as on Vercel
  servers: [
    {
      url: '/',
      description: 'Current Server'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT access token'
      }
    },
    schemas: {
      ApiResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          data: { type: 'object' },
          errors: { type: 'array', items: { type: 'object' } }
        }
      },
      Profile: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'Kuldeep Sen' },
          headline: { type: 'string', example: 'Senior Full Stack & AI Automation Developer' },
          shortBio: { type: 'string' },
          longBio: { type: 'string' },
          profileImage: { type: 'string', format: 'uri' },
          resumeUrl: { type: 'string', format: 'uri' },
          location: { type: 'string', example: 'India' },
          availability: {
            type: 'string',
            enum: ['available', 'busy', 'unavailable', 'contract_only'],
            example: 'available'
          },
          socialLinks: {
            type: 'object',
            properties: {
              github: { type: 'string' },
              linkedin: { type: 'string' },
              twitter: { type: 'string' }
            }
          },
          email: { type: 'string', format: 'email' }
        }
      },
      Project: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          slug: { type: 'string' },
          shortDescription: { type: 'string' },
          description: { type: 'string' },
          thumbnail: { type: 'string' },
          images: { type: 'array', items: { type: 'string' } },
          technologies: { type: 'array', items: { type: 'string' } },
          category: { type: 'string' },
          liveUrl: { type: 'string' },
          githubUrl: { type: 'string' },
          featured: { type: 'boolean' },
          order: { type: 'integer' },
          status: { type: 'string', enum: ['draft', 'published', 'archived'] }
        }
      },
      Service: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          slug: { type: 'string' },
          shortDescription: { type: 'string' },
          description: { type: 'string' },
          icon: { type: 'string' },
          technologies: { type: 'array', items: { type: 'string' } },
          featured: { type: 'boolean' },
          order: { type: 'integer' },
          status: { type: 'string', enum: ['active', 'inactive'] }
        }
      },
      Skill: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          category: { type: 'string' },
          level: { type: 'string', enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
          yearsOfExperience: { type: 'number' },
          icon: { type: 'string' },
          order: { type: 'integer' }
        }
      },
      Experience: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          company: { type: 'string' },
          position: { type: 'string' },
          employmentType: { type: 'string' },
          isRemote: { type: 'boolean' },
          startDate: { type: 'string', format: 'date-time' },
          endDate: { type: 'string', format: 'date-time' },
          isCurrent: { type: 'boolean' },
          description: { type: 'string' },
          responsibilities: { type: 'array', items: { type: 'string' } },
          technologies: { type: 'array', items: { type: 'string' } }
        }
      },
      Testimonial: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          clientName: { type: 'string' },
          designation: { type: 'string' },
          company: { type: 'string' },
          message: { type: 'string' },
          avatar: { type: 'string' },
          rating: { type: 'number' },
          featured: { type: 'boolean' },
          status: { type: 'string' }
        }
      },
      Blog: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          title: { type: 'string' },
          slug: { type: 'string' },
          excerpt: { type: 'string' },
          content: { type: 'string' },
          coverImage: { type: 'string' },
          category: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          author: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              avatar: { type: 'string' }
            }
          },
          publishedAt: { type: 'string', format: 'date-time' },
          status: { type: 'string' }
        }
      },
      ContactSubmission: {
        type: 'object',
        required: ['name', 'email', 'subject', 'message'],
        properties: {
          name: { type: 'string', example: 'Alex Smith' },
          email: { type: 'string', format: 'email', example: 'alex@example.com' },
          phone: { type: 'string', example: '+1234567890' },
          subject: { type: 'string', example: 'Project Consultation' },
          message: { type: 'string', example: 'Hi Kuldeep, I would like to discuss building an MVP platform.' },
          source: { type: 'string', example: 'portfolio_contact_form' },
          website: { type: 'string', description: 'Anti-spam honeypot - must be empty' }
        }
      }
    }
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API and Database Health Status',
        responses: {
          200: {
            description: 'Server is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    status: { type: 'string', example: 'healthy' },
                    database: { type: 'string', example: 'connected' },
                    environment: { type: 'string', example: 'development' },
                    timestamp: { type: 'string' },
                    uptime: { type: 'number' }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/v1/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Admin Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'admin@kuldeepsen.com' },
                  password: { type: 'string', example: 'SuperSecureAdminPassword123!' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Authenticated successfully' },
          401: { description: 'Invalid credentials' }
        }
      }
    },
    '/api/v1/auth/refresh': {
      post: {
        tags: ['Authentication'],
        summary: 'Refresh JWT Access Token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['refreshToken'],
                properties: {
                  refreshToken: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          200: { description: 'Token refreshed' },
          401: { description: 'Invalid refresh token' }
        }
      }
    },
    '/api/v1/auth/logout': {
      post: {
        tags: ['Authentication'],
        summary: 'Logout and revoke refresh token',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Logged out successfully' }
        }
      }
    },
    '/api/v1/public/profile': {
      get: {
        tags: ['Public'],
        summary: 'Get Public Developer Profile',
        responses: {
          200: { description: 'Public profile' }
        }
      }
    },
    '/api/v1/public/projects': {
      get: {
        tags: ['Public'],
        summary: 'List Published Projects with filters and pagination',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'category', in: 'query', schema: { type: 'string' } },
          { name: 'technology', in: 'query', schema: { type: 'string' } },
          { name: 'featured', in: 'query', schema: { type: 'boolean' } },
          { name: 'search', in: 'query', schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'List of projects' }
        }
      }
    },
    '/api/v1/public/projects/{slug}': {
      get: {
        tags: ['Public'],
        summary: 'Get single project details by slug',
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Project details' },
          404: { description: 'Project not found' }
        }
      }
    },
    '/api/v1/public/services': {
      get: {
        tags: ['Public'],
        summary: 'Get Active Services Offered',
        responses: { 200: { description: 'Active services list' } }
      }
    },
    '/api/v1/public/skills': {
      get: {
        tags: ['Public'],
        summary: 'Get Developer Skills',
        parameters: [{ name: 'category', in: 'query', schema: { type: 'string' } }],
        responses: { 200: { description: 'Skills list' } }
      }
    },
    '/api/v1/public/experience': {
      get: {
        tags: ['Public'],
        summary: 'Get Career Experience and Timeline',
        responses: { 200: { description: 'Experience timeline' } }
      }
    },
    '/api/v1/public/testimonials': {
      get: {
        tags: ['Public'],
        summary: 'Get Approved Client Testimonials',
        parameters: [{ name: 'featured', in: 'query', schema: { type: 'boolean' } }],
        responses: { 200: { description: 'Testimonials' } }
      }
    },
    '/api/v1/public/blogs': {
      get: {
        tags: ['Public'],
        summary: 'List Published Blog Articles',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'category', in: 'query', schema: { type: 'string' } },
          { name: 'tag', in: 'query', schema: { type: 'string' } },
          { name: 'search', in: 'query', schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'Published blogs list' } }
      }
    },
    '/api/v1/public/blogs/{slug}': {
      get: {
        tags: ['Public'],
        summary: 'Get Blog Article by Slug',
        parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Blog details' },
          404: { description: 'Blog not found' }
        }
      }
    },
    '/api/v1/public/contact': {
      post: {
        tags: ['Public'],
        summary: 'Submit Contact Inquiry Form (Rate limited & Spam protected)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContactSubmission' }
            }
          }
        },
        responses: {
          201: { description: 'Message received successfully' },
          400: { description: 'Validation error or spam' },
          429: { description: 'Rate limit exceeded' }
        }
      }
    },
    '/api/v1/public/resume': {
      get: {
        tags: ['Public'],
        summary: 'Get resume link and download metadata',
        parameters: [{ name: 'redirect', in: 'query', schema: { type: 'boolean', default: false } }],
        responses: { 200: { description: 'Resume metadata' } }
      }
    },
    '/api/v1/admin/profile': {
      get: {
        tags: ['Admin Profile'],
        summary: 'Get Full Admin Profile',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'Full profile data' } }
      },
      put: {
        tags: ['Admin Profile'],
        summary: 'Update Profile Information',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Profile' } } }
        },
        responses: { 200: { description: 'Profile updated' } }
      }
    },
    '/api/v1/admin/projects': {
      get: {
        tags: ['Admin Projects'],
        summary: 'List all projects (including drafts)',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'status', in: 'query', schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'All projects' } }
      },
      post: {
        tags: ['Admin Projects'],
        summary: 'Create a new project',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Project' } } }
        },
        responses: { 201: { description: 'Project created' } }
      }
    },
    '/api/v1/admin/projects/{id}': {
      get: {
        tags: ['Admin Projects'],
        summary: 'Get project by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Project data' } }
      },
      put: {
        tags: ['Admin Projects'],
        summary: 'Update project by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Project' } } }
        },
        responses: { 200: { description: 'Project updated' } }
      },
      delete: {
        tags: ['Admin Projects'],
        summary: 'Delete project by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Project deleted' } }
      }
    },
    '/api/v1/admin/services': {
      get: {
        tags: ['Admin Services'],
        summary: 'Get all services',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'Services list' } }
      },
      post: {
        tags: ['Admin Services'],
        summary: 'Create a new service',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Service' } } }
        },
        responses: { 201: { description: 'Service created' } }
      }
    },
    '/api/v1/admin/services/{id}': {
      get: {
        tags: ['Admin Services'],
        summary: 'Get service by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Service' } }
      },
      put: {
        tags: ['Admin Services'],
        summary: 'Update service',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Service' } } }
        },
        responses: { 200: { description: 'Updated' } }
      },
      delete: {
        tags: ['Admin Services'],
        summary: 'Delete service',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Deleted' } }
      }
    },
    '/api/v1/admin/skills': {
      get: {
        tags: ['Admin Skills'],
        summary: 'Get all skills',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'All skills' } }
      },
      post: {
        tags: ['Admin Skills'],
        summary: 'Create a new skill',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Skill' } } }
        },
        responses: { 201: { description: 'Skill created' } }
      }
    },
    '/api/v1/admin/skills/{id}': {
      get: {
        tags: ['Admin Skills'],
        summary: 'Get skill by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Skill' } }
      },
      put: {
        tags: ['Admin Skills'],
        summary: 'Update skill',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Skill' } } }
        },
        responses: { 200: { description: 'Updated' } }
      },
      delete: {
        tags: ['Admin Skills'],
        summary: 'Delete skill',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Deleted' } }
      }
    },
    '/api/v1/admin/experience': {
      get: {
        tags: ['Admin Experience'],
        summary: 'Get all experiences',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'Experiences' } }
      },
      post: {
        tags: ['Admin Experience'],
        summary: 'Create experience record',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Experience' } } }
        },
        responses: { 201: { description: 'Created' } }
      }
    },
    '/api/v1/admin/experience/{id}': {
      get: {
        tags: ['Admin Experience'],
        summary: 'Get experience by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Experience' } }
      },
      put: {
        tags: ['Admin Experience'],
        summary: 'Update experience',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Experience' } } }
        },
        responses: { 200: { description: 'Updated' } }
      },
      delete: {
        tags: ['Admin Experience'],
        summary: 'Delete experience',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Deleted' } }
      }
    },
    '/api/v1/admin/testimonials': {
      get: {
        tags: ['Admin Testimonials'],
        summary: 'Get all testimonials',
        security: [{ BearerAuth: [] }],
        responses: { 200: { description: 'Testimonials' } }
      },
      post: {
        tags: ['Admin Testimonials'],
        summary: 'Create testimonial',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Testimonial' } } }
        },
        responses: { 201: { description: 'Created' } }
      }
    },
    '/api/v1/admin/testimonials/{id}': {
      get: {
        tags: ['Admin Testimonials'],
        summary: 'Get testimonial by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Testimonial' } }
      },
      put: {
        tags: ['Admin Testimonials'],
        summary: 'Update testimonial',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Testimonial' } } }
        },
        responses: { 200: { description: 'Updated' } }
      },
      delete: {
        tags: ['Admin Testimonials'],
        summary: 'Delete testimonial',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Deleted' } }
      }
    },
    '/api/v1/admin/blogs': {
      get: {
        tags: ['Admin Blogs'],
        summary: 'Get all blogs (including drafts)',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'status', in: 'query', schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'All blogs' } }
      },
      post: {
        tags: ['Admin Blogs'],
        summary: 'Create new blog post',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Blog' } } }
        },
        responses: { 201: { description: 'Blog created' } }
      }
    },
    '/api/v1/admin/blogs/{id}': {
      get: {
        tags: ['Admin Blogs'],
        summary: 'Get blog by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Blog' } }
      },
      put: {
        tags: ['Admin Blogs'],
        summary: 'Update blog',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/Blog' } } }
        },
        responses: { 200: { description: 'Updated' } }
      },
      delete: {
        tags: ['Admin Blogs'],
        summary: 'Delete blog',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Deleted' } }
      }
    },
    '/api/v1/admin/contact': {
      get: {
        tags: ['Admin Contact Inquiries'],
        summary: 'List contact submissions',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'status', in: 'query', schema: { type: 'string' } }
        ],
        responses: { 200: { description: 'Contact list' } }
      }
    },
    '/api/v1/admin/contact/{id}': {
      get: {
        tags: ['Admin Contact Inquiries'],
        summary: 'Get inquiry details by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Inquiry details' } }
      },
      delete: {
        tags: ['Admin Contact Inquiries'],
        summary: 'Delete inquiry by ID',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Deleted' } }
      }
    },
    '/api/v1/admin/contact/{id}/status': {
      patch: {
        tags: ['Admin Contact Inquiries'],
        summary: 'Update inquiry status (unread, read, replied, archived)',
        security: [{ BearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['status'],
                properties: {
                  status: {
                    type: 'string',
                    enum: ['unread', 'read', 'replied', 'archived'],
                    example: 'read'
                  }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Status updated' } }
      }
    },
    '/api/v1/admin/media/upload': {
      post: {
        tags: ['Admin Media Upload'],
        summary: 'Upload an image or document (Cloudinary or buffer storage)',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: { type: 'string', format: 'binary' },
                  folder: { type: 'string', example: 'portfolio' }
                }
              }
            }
          }
        },
        responses: {
          201: { description: 'File uploaded successfully' }
        }
      }
    }
  }
};

const SWAGGER_UI_VERSION = '5.17.14';
const SWAGGER_CDN = `https://cdn.jsdelivr.net/npm/swagger-ui-dist@${SWAGGER_UI_VERSION}`;

const swaggerHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Kuldeep Sen Portfolio API Documentation</title>
  <link rel="stylesheet" href="${SWAGGER_CDN}/swagger-ui.css" />
  <style>.swagger-ui .topbar { display: none }</style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="${SWAGGER_CDN}/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function () {
      window.ui = SwaggerUIBundle({
        url: '/api/docs.json',
        dom_id: '#swagger-ui',
        persistAuthorization: true
      });
    };
  </script>
</body>
</html>`;

/**
 * Serverless-friendly Swagger setup.
 * swagger-ui-express serves static assets from node_modules/swagger-ui-dist,
 * which Vercel does not bundle into the function. So we load the UI assets
 * from a CDN and only serve the HTML page + raw OpenAPI JSON ourselves.
 *
 * NOTE: call setupSwagger(app) AFTER helmet() so the CSP override below wins.
 */
export const setupSwagger = (app: Express): void => {
  // Raw OpenAPI spec
  app.get('/api/docs.json', (_req, res) => {
    res.json(swaggerSpec);
  });

  // Swagger UI page
  app.get(['/api/docs', '/api/docs/'], (_req, res) => {
    // Helmet's default CSP blocks CDN scripts/styles, so override for this route only
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
        "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self'"
    );
    res.type('html').send(swaggerHtml);
  });
};