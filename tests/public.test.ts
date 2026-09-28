import request from 'supertest';
import { createApp } from '../src/app';
import { ProfileModel } from '../src/models/profile.model';
import { ProjectModel } from '../src/models/project.model';
import { ServiceModel } from '../src/models/service.model';
import { SkillModel } from '../src/models/skill.model';
import { ExperienceModel } from '../src/models/experience.model';
import { TestimonialModel } from '../src/models/testimonial.model';
import { BlogModel } from '../src/models/blog.model';

const app = createApp();

describe('Public APIs (/api/v1/public)', () => {
  beforeAll(async () => {
    // Seed sample data for public tests
    await ProfileModel.create({
      name: 'Kuldeep Sen',
      headline: 'Full Stack MERN Developer',
      shortBio: 'Building scalable applications and automations.',
      longBio: 'Experienced software engineer focused on high-performance web systems.',
      profileImage: 'https://example.com/avatar.jpg',
      resumeUrl: 'https://example.com/resume.pdf',
      location: 'India',
      availability: 'available',
      email: 'kuldeep@kuldeepsen.com',
      socialLinks: { github: 'https://github.com/kuldeepsen' }
    });

    await ProjectModel.create({
      title: 'Qroffy Smart Menu',
      slug: 'qroffy-smart-menu',
      shortDescription: 'QR code digital catalog system.',
      description: 'Comprehensive restaurant QR ordering application.',
      thumbnail: 'https://example.com/thumb.jpg',
      technologies: ['React', 'Node.js', 'MongoDB'],
      category: 'Full Stack',
      featured: true,
      order: 1,
      status: 'published'
    });

    await ServiceModel.create({
      title: 'Full Stack Web Development',
      slug: 'full-stack-web-development',
      shortDescription: 'Modern web engineering.',
      description: 'Building fast, responsive web systems.',
      icon: 'code',
      featured: true,
      order: 1,
      status: 'active'
    });

    await SkillModel.create({
      name: 'TypeScript',
      category: 'Backend',
      level: 'Expert',
      yearsOfExperience: 3,
      order: 1
    });

    await ExperienceModel.create({
      company: 'Freelance Software Engineer',
      position: 'Senior Developer',
      employmentType: 'Freelance',
      startDate: new Date('2023-01-01'),
      isCurrent: true,
      description: 'Architecting custom client solutions.',
      order: 1
    });

    await TestimonialModel.create({
      clientName: 'Marcus Vance',
      designation: 'CEO',
      company: 'Vance Tech',
      message: 'Excellent work and timely delivery.',
      rating: 5,
      featured: true,
      status: 'approved'
    });

    await BlogModel.create({
      title: 'Clean Architecture with Express',
      slug: 'clean-architecture-express',
      excerpt: 'Guide to decoupling logic in Node.js',
      content: 'Detailed breakdown of controllers, services, and repositories.',
      coverImage: 'https://example.com/cover.jpg',
      category: 'Backend',
      tags: ['Node.js', 'Express'],
      author: { name: 'Kuldeep Sen' },
      publishedAt: new Date(),
      status: 'published'
    });
  });

  describe('GET /api/v1/public/profile', () => {
    it('should return public profile without sensitive database internals', async () => {
      const res = await request(app).get('/api/v1/public/profile');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('name', 'Kuldeep Sen');
      expect(res.body.data).toHaveProperty('email', 'kuldeep@kuldeepsen.com');
      expect(res.body.data).not.toHaveProperty('_id');
      expect(res.body.data).not.toHaveProperty('__v');
    });
  });

  describe('GET /api/v1/public/projects', () => {
    it('should return paginated list of published projects', async () => {
      const res = await request(app).get('/api/v1/public/projects');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('items');
      expect(Array.isArray(res.body.data.items)).toBe(true);
      expect(res.body.data.total).toBeGreaterThanOrEqual(1);
    });

    it('should filter projects by category', async () => {
      const res = await request(app).get('/api/v1/public/projects?category=Full%20Stack');
      expect(res.status).toBe(200);
      expect(res.body.data.items.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/v1/public/projects/:slug', () => {
    it('should return project details for a valid slug', async () => {
      const res = await request(app).get('/api/v1/public/projects/qroffy-smart-menu');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('title', 'Qroffy Smart Menu');
    });

    it('should return 404 for non-existent slug', async () => {
      const res = await request(app).get('/api/v1/public/projects/does-not-exist-slug');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/public/services', () => {
    it('should return active services', async () => {
      const res = await request(app).get('/api/v1/public/services');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/public/skills', () => {
    it('should return skills', async () => {
      const res = await request(app).get('/api/v1/public/skills');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/public/experience', () => {
    it('should return experience timeline', async () => {
      const res = await request(app).get('/api/v1/public/experience');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/public/testimonials', () => {
    it('should return approved testimonials', async () => {
      const res = await request(app).get('/api/v1/public/testimonials');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/public/blogs', () => {
    it('should return published blogs', async () => {
      const res = await request(app).get('/api/v1/public/blogs');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('items');
    });

    it('should return blog by slug', async () => {
      const res = await request(app).get('/api/v1/public/blogs/clean-architecture-express');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('title', 'Clean Architecture with Express');
    });
  });

  describe('GET /api/v1/public/resume', () => {
    it('should return resume download URL and metadata', async () => {
      const res = await request(app).get('/api/v1/public/resume');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('resumeUrl', 'https://example.com/resume.pdf');
    });
  });
});
