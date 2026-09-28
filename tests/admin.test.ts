import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Admin Protected APIs (/api/v1/admin)', () => {
  let adminToken = '';
  let createdProjectId = '';

  beforeAll(async () => {
    // Authenticate admin to obtain access token
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@kuldeepsen.com',
        password: 'SuperSecureAdminPassword123!'
      });

    adminToken = res.body.data.accessToken;
  });

  describe('Authorization Guards', () => {
    it('should block unauthenticated access to admin endpoints with 401', async () => {
      const res = await request(app).get('/api/v1/admin/projects');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject requests with invalid bearer token', async () => {
      const res = await request(app)
        .get('/api/v1/admin/projects')
        .set('Authorization', 'Bearer invalid.token.payload');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Admin Project Management', () => {
    it('should allow authorized admin to create a new project', async () => {
      const newProject = {
        title: 'Salon Management CRM',
        slug: 'salon-management-crm-test',
        shortDescription: 'CRM platform for appointment scheduling and roster management.',
        description: 'Detailed description of the salon management platform with real-time bookings.',
        thumbnail: 'https://example.com/salon-thumb.jpg',
        technologies: ['React', 'Express', 'MongoDB'],
        category: 'Business CRM',
        featured: false,
        order: 2,
        status: 'published'
      };

      const res = await request(app)
        .post('/api/v1/admin/projects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newProject);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.slug).toBe('salon-management-crm-test');

      createdProjectId = res.body.data._id;
    });

    it('should retrieve the created project by ID', async () => {
      const res = await request(app)
        .get(`/api/v1/admin/projects/${createdProjectId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(createdProjectId);
    });

    it('should allow authorized admin to update a project', async () => {
      const res = await request(app)
        .put(`/api/v1/admin/projects/${createdProjectId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ featured: true, order: 10 });

      expect(res.status).toBe(200);
      expect(res.body.data.featured).toBe(true);
      expect(res.body.data.order).toBe(10);
    });

    it('should allow authorized admin to delete a project', async () => {
      const res = await request(app)
        .delete(`/api/v1/admin/projects/${createdProjectId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('Admin Contact Management', () => {
    it('should list contact inquiries for admin', async () => {
      const res = await request(app)
        .get('/api/v1/admin/contact')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('items');
    });
  });
});
