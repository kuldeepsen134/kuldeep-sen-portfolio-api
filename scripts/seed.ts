import mongoose from 'mongoose';
import { env } from '../src/config/env';
import { logger } from '../src/config/logger';
import { AdminModel } from '../src/models/admin.model';
import { ProfileModel } from '../src/models/profile.model';
import { ProjectModel } from '../src/models/project.model';
import { ServiceModel } from '../src/models/service.model';
import { SkillModel } from '../src/models/skill.model';
import { ExperienceModel } from '../src/models/experience.model';
import { TestimonialModel } from '../src/models/testimonial.model';
import { BlogModel } from '../src/models/blog.model';

const seedDatabase = async (): Promise<void> => {
  try {
    logger.info('🌱 Starting database seeding...');
    await mongoose.connect(env.MONGODB_URI);
    logger.info('Connected to MongoDB.');

    // 1. Seed Admin User
    const existingAdmin = await AdminModel.findOne({ email: env.ADMIN_EMAIL.toLowerCase() });
    if (!existingAdmin) {
      const admin = new AdminModel({
        name: env.ADMIN_NAME,
        email: env.ADMIN_EMAIL.toLowerCase(),
        password: env.ADMIN_PASSWORD,
        role: 'admin'
      });
      await admin.save();
      logger.info(`✅ Admin created with email: ${env.ADMIN_EMAIL}`);
    } else {
      logger.info(`ℹ️ Admin user already exists: ${env.ADMIN_EMAIL}`);
    }

    // 2. Seed Developer Profile
    await ProfileModel.deleteMany({});
    await ProfileModel.create({
      name: 'Kuldeep Sen',
      headline: 'Full Stack / MERN Developer | AI & Business Automation Specialist',
      shortBio:
        'Experienced Full Stack Engineer specializing in React, Next.js, Node.js, TypeScript, and intelligent automation systems that streamline operations and accelerate business growth.',
      longBio:
        'I am an individual freelance software engineer and production architect with a passion for crafting robust web applications, scalable REST APIs, and automated business workflows. With deep expertise across the modern JavaScript/TypeScript ecosystem (React, Next.js, Node.js, Express, MongoDB, MySQL, Redis, AWS, Docker), I partner directly with founders, startups, and established businesses to engineer resilient digital products from concept to deployment.',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      resumeUrl: 'https://kuldeepsen.com/docs/Kuldeep_Sen_Resume.pdf',
      location: 'India (Available Worldwide for Remote Contracts)',
      availability: 'available',
      email: 'kuldeep@kuldeepsen.com',
      phone: '+91 98765 43210',
      socialLinks: {
        github: 'https://github.com/kuldeepsen',
        linkedin: 'https://linkedin.com/in/kuldeepsen',
        twitter: 'https://twitter.com/kuldeepsen',
        leetcode: 'https://leetcode.com/kuldeepsen'
      },
      seo: {
        metaTitle: 'Kuldeep Sen | Full Stack Developer & AI Automation Engineer',
        metaDescription:
          'Portfolio of Kuldeep Sen, Full Stack MERN Developer, TypeScript enthusiast, and AI Automation Architect. View projects, services, and freelance availability.',
        keywords: [
          'Kuldeep Sen',
          'Full Stack Developer',
          'MERN Stack Developer',
          'TypeScript Engineer',
          'AI Automation',
          'Freelance Software Developer',
          'Node.js Architect'
        ],
        ogImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80'
      }
    });
    logger.info('✅ Profile seeded.');

    // 3. Seed Projects
    await ProjectModel.deleteMany({});
    await ProjectModel.create([
      {
        title: 'Qroffy - Smart QR Digital Catalog & Menu System',
        slug: 'qroffy-smart-qr-catalog',
        shortDescription:
          'Cloud-native digital catalog and restaurant ordering solution featuring real-time menu synchronization, table management, and instant analytics.',
        description:
          'Qroffy is a high-performance contactless ordering and digital catalog management platform designed for restaurants, cafes, and retail stores. Built with Next.js, Node.js, Express, MongoDB, and Redis, it allows merchants to generate dynamic QR codes, update menus in real-time, handle incoming orders, and review customer interaction analytics.',
        thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
        ],
        technologies: ['Next.js', 'React.js', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'Redis', 'Tailwind CSS'],
        category: 'Full Stack',
        clientType: 'Commercial SaaS',
        liveUrl: 'https://qroffy.com',
        githubUrl: 'https://github.com/kuldeepsen/qroffy-core',
        featured: true,
        order: 1,
        status: 'published',
        seo: {
          metaTitle: 'Qroffy - Smart QR Catalog System | Kuldeep Sen Portfolio',
          metaDescription: 'Case study of Qroffy, a cloud-native contactless ordering platform engineered by Kuldeep Sen.',
          keywords: ['Qroffy', 'QR Menu', 'Next.js SaaS', 'Full Stack MERN', 'Redis Caching']
        }
      },
      {
        title: 'Course Platform - Scalable Learning Management System',
        slug: 'course-platform-lms',
        shortDescription:
          'Modern online learning and video course platform with curriculum tracking, secure media streaming, quiz assessments, and payment processing.',
        description:
          'A comprehensive LMS architecture built for online educators and independent academies. Includes chunked video streaming, student progress tracking, interactive quizzes, automated course completion certificates, and seamless Razorpay/Stripe checkout workflows.',
        thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80'
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'AWS S3', 'Stripe', 'Docker'],
        category: 'Full Stack',
        clientType: 'EdTech Client',
        liveUrl: 'https://courses.example.com',
        githubUrl: 'https://github.com/kuldeepsen/course-platform',
        featured: true,
        order: 2,
        status: 'published'
      },
      {
        title: 'School Management System - Comprehensive ERP',
        slug: 'school-management-system-erp',
        shortDescription:
          'Multi-tenant institutional ERP handling student admissions, fee collections, faculty scheduling, gradebooks, and parent-teacher communication.',
        description:
          'An end-to-end ERP system built to streamline administrative workflows for schools and colleges. Features granular role-based permissions (Superadmin, Principal, Teacher, Student, Parent), attendance logging, automated report card generation, and fee installment alerts.',
        thumbnail: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80'
        ],
        technologies: ['Next.js', 'Node.js', 'TypeScript', 'MySQL', 'Express.js', 'Redis', 'Docker'],
        category: 'Enterprise ERP',
        clientType: 'Educational Institution',
        liveUrl: 'https://school-erp.example.com',
        githubUrl: 'https://github.com/kuldeepsen/school-management-erp',
        featured: true,
        order: 3,
        status: 'published'
      },
      {
        title: 'Salon Management CRM & Appointment Scheduler',
        slug: 'salon-management-crm',
        shortDescription:
          'All-in-one beauty salon CRM providing client booking portals, staff roster scheduling, inventory tracking, and automated reminder broadcasts.',
        description:
          'Designed to eliminate no-shows and optimize appointment distribution for high-traffic salons. Combines a real-time calendar booking interface, SMS/WhatsApp appointment reminders, staff commission calculators, customer loyalty points, and point-of-sale inventory tracking.',
        thumbnail: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80'
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Twilio API', 'TypeScript', 'Tailwind CSS'],
        category: 'Business CRM',
        clientType: 'Commercial Client',
        liveUrl: 'https://saloncrm.example.com',
        githubUrl: 'https://github.com/kuldeepsen/salon-crm',
        featured: true,
        order: 4,
        status: 'published'
      },
      {
        title: 'AI Lead Automation & CRM Pipeline',
        slug: 'ai-lead-automation-platform',
        shortDescription:
          'Intelligent multi-channel lead ingestion engine with LLM-powered qualification, scoring, and automated CRM record synchronization.',
        description:
          'An automated lead qualification architecture that integrates webhooks from landing pages, email inquiries, and social ad forms. An asynchronous LLM pipeline evaluates lead fit, assigns confidence scores, enriches prospect details, and triggers instant notifications to sales reps via Slack and CRM.',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        images: [
          'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'
        ],
        technologies: ['Node.js', 'TypeScript', 'AI Automation', 'OpenAI API', 'MongoDB', 'Redis BullMQ', 'Docker'],
        category: 'AI Automation',
        clientType: 'Marketing Agency',
        liveUrl: 'https://aileads.example.com',
        githubUrl: 'https://github.com/kuldeepsen/ai-lead-automation',
        featured: true,
        order: 5,
        status: 'published'
      }
    ]);
    logger.info('✅ Projects seeded.');

    // 4. Seed Services
    await ServiceModel.deleteMany({});
    await ServiceModel.create([
      {
        title: 'Full Stack Web & Web App Development',
        slug: 'full-stack-web-development',
        shortDescription: 'Modern, highly responsive SPAs and full-stack web applications built with Next.js, React, and Node.js.',
        description: 'End-to-end web engineering covering front-end user experience, server-side business logic, database schemas, and seamless third-party integrations.',
        icon: 'CodeBracketIcon',
        technologies: ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'],
        featured: true,
        order: 1,
        status: 'active'
      },
      {
        title: 'Custom REST API Architecture & Microservices',
        slug: 'rest-api-architecture',
        shortDescription: 'Scalable, secure, and documented RESTful APIs with clean architecture, strict validation, and authentication.',
        description: 'Production API development adhering to clean architecture patterns, rate limiting, JWT token management, data caching with Redis, and OpenAPI/Swagger documentation.',
        icon: 'ServerStackIcon',
        technologies: ['Express.js', 'TypeScript', 'MongoDB', 'MySQL', 'Redis'],
        featured: true,
        order: 2,
        status: 'active'
      },
      {
        title: 'AI Automation & Intelligent Workflow Integration',
        slug: 'ai-automation-workflows',
        shortDescription: 'Leverage LLMs, webhook orchestrations, and autonomous background jobs to eliminate repetitive business tasks.',
        description: 'Design and implementation of intelligent AI agents, automated customer support triage, smart lead enrichment, and seamless pipeline integrations.',
        icon: 'SparklesIcon',
        technologies: ['AI Automation', 'OpenAI', 'LangChain', 'Node.js', 'Webhooks'],
        featured: true,
        order: 3,
        status: 'active'
      },
      {
        title: 'Business Automation & Custom CRM Systems',
        slug: 'business-automation-crm',
        shortDescription: 'Bespoke internal tools, customer relationship platforms, and ERP workflows tailored to your exact business needs.',
        description: 'Tailored administrative portals, booking management, automated invoicing, and role-based staff portals built to scale with growing operations.',
        icon: 'BriefcaseIcon',
        technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Redis'],
        featured: true,
        order: 4,
        status: 'active'
      },
      {
        title: 'Cloud Deployment, Dockerization & CI/CD Pipelines',
        slug: 'cloud-devops-cicd',
        shortDescription: 'Production-ready containerization, cloud infrastructure setup on AWS/VPS, and automated test-and-deploy pipelines.',
        description: 'Multi-stage Docker builds, Nginx reverse proxy configuration, SSL automation, zero-downtime deployments, and GitHub Actions continuous integration.',
        icon: 'CloudArrowUpIcon',
        technologies: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Nginx', 'Linux'],
        featured: false,
        order: 5,
        status: 'active'
      }
    ]);
    logger.info('✅ Services seeded.');

    // 5. Seed Skills
    await SkillModel.deleteMany({});
    await SkillModel.create([
      // Frontend
      { name: 'React.js', category: 'Frontend', level: 'Expert', yearsOfExperience: 4, order: 1 },
      { name: 'Next.js', category: 'Frontend', level: 'Expert', yearsOfExperience: 3, order: 2 },
      { name: 'TypeScript', category: 'Frontend', level: 'Expert', yearsOfExperience: 3, order: 3 },
      { name: 'HTML5 & CSS3', category: 'Frontend', level: 'Expert', yearsOfExperience: 5, order: 4 },
      { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert', yearsOfExperience: 3, order: 5 },

      // Backend
      { name: 'Node.js', category: 'Backend', level: 'Expert', yearsOfExperience: 4, order: 1 },
      { name: 'Express.js', category: 'Backend', level: 'Expert', yearsOfExperience: 4, order: 2 },
      { name: 'REST APIs', category: 'Backend', level: 'Expert', yearsOfExperience: 4, order: 3 },
      { name: 'Microservices & Clean Architecture', category: 'Backend', level: 'Advanced', yearsOfExperience: 3, order: 4 },

      // Database
      { name: 'MongoDB & Mongoose', category: 'Database', level: 'Expert', yearsOfExperience: 4, order: 1 },
      { name: 'MySQL', category: 'Database', level: 'Advanced', yearsOfExperience: 3, order: 2 },
      { name: 'Redis', category: 'Database', level: 'Advanced', yearsOfExperience: 2, order: 3 },

      // Cloud & DevOps
      { name: 'Docker', category: 'Cloud & DevOps', level: 'Advanced', yearsOfExperience: 2, order: 1 },
      { name: 'AWS (EC2, S3, RDS)', category: 'Cloud & DevOps', level: 'Advanced', yearsOfExperience: 2, order: 2 },
      { name: 'CI/CD (GitHub Actions)', category: 'Cloud & DevOps', level: 'Advanced', yearsOfExperience: 2, order: 3 },
      { name: 'Linux & Nginx', category: 'Cloud & DevOps', level: 'Advanced', yearsOfExperience: 3, order: 4 },

      // Automation & AI
      { name: 'AI Automation & LLMs', category: 'AI & Automation', level: 'Advanced', yearsOfExperience: 2, order: 1 },
      { name: 'Business Automation', category: 'AI & Automation', level: 'Expert', yearsOfExperience: 3, order: 2 }
    ]);
    logger.info('✅ Skills seeded.');

    // 6. Seed Experience
    await ExperienceModel.deleteMany({});
    await ExperienceModel.create([
      {
        company: 'Independent Freelance Consultant',
        position: 'Full Stack Engineer & Solution Architect',
        employmentType: 'Freelance',
        location: 'Remote',
        isRemote: true,
        startDate: new Date('2023-01-01'),
        isCurrent: true,
        description:
          'Consulting directly with international clients, startups, and SMBs to engineer custom web platforms, scalable backend APIs, and automated business workflows.',
        responsibilities: [
          'Architected and delivered SaaS platforms, CRMs, and LMS portals from initial requirements to production deployment.',
          'Built high-performance REST APIs using Node.js, Express, TypeScript, and MongoDB/MySQL with clean architecture.',
          'Implemented AI-powered lead qualification and multi-channel business automations.',
          'Configured Docker containers, CI/CD automated test suites, and AWS cloud environments.'
        ],
        technologies: ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS'],
        order: 1
      },
      {
        company: 'Tech Innovators Studio',
        position: 'Senior Full Stack Developer',
        employmentType: 'Full-time',
        location: 'Remote / Hybrid',
        isRemote: true,
        startDate: new Date('2021-06-01'),
        endDate: new Date('2022-12-31'),
        isCurrent: false,
        description:
          'Led development of customer-facing web applications and enterprise management systems for external clients.',
        responsibilities: [
          'Mentored junior engineers and conducted code reviews ensuring strict TypeScript and linting standards.',
          'Reduced API response times by 35% through Redis caching and MongoDB aggregation query optimization.',
          'Spearheaded transition from JavaScript to strict TypeScript across core repositories.'
        ],
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Redis'],
        order: 2
      }
    ]);
    logger.info('✅ Experience seeded.');

    // 7. Seed Testimonials
    await TestimonialModel.deleteMany({});
    await TestimonialModel.create([
      {
        clientName: 'Marcus Vance',
        designation: 'Founder & CEO',
        company: 'Vance Hospitality Solutions',
        message:
          'Kuldeep delivered our Qroffy digital menu platform on time and exceeded our performance expectations. His backend architecture handles our peak weekend rush with zero latency.',
        rating: 5,
        featured: true,
        status: 'approved'
      },
      {
        clientName: 'Elena Rostova',
        designation: 'Operations Director',
        company: 'Apex Learning Academy',
        message:
          'Working with Kuldeep on our Course LMS was a seamless experience. He understood our domain requirements immediately and built an intuitive, resilient platform that our students love.',
        rating: 5,
        featured: true,
        status: 'approved'
      },
      {
        clientName: 'David Chen',
        designation: 'Head of Growth',
        company: 'Nexus Marketing Group',
        message:
          'The AI Lead Automation platform Kuldeep engineered transformed our response rates. Inquiries are automatically scored and routed within seconds. Highly recommended!',
        rating: 5,
        featured: true,
        status: 'approved'
      }
    ]);
    logger.info('✅ Testimonials seeded.');

    // 8. Seed Blogs
    await BlogModel.deleteMany({});
    await BlogModel.create([
      {
        title: 'Building Resilient REST APIs with Node.js, Express, and Clean Architecture',
        slug: 'building-resilient-rest-apis-nodejs-express-clean-architecture',
        excerpt:
          'A comprehensive guide to structuring production-ready Node.js APIs with decoupled controllers, services, repositories, and strict type safety.',
        content: `
# Building Resilient REST APIs with Node.js, Express, and Clean Architecture

When building production backends, separating concerns is the foundation of long-term maintainability. In this article, we break down why keeping business logic strictly inside services—and database queries inside repositories—creates codebases that scale effortlessly.

## The Core Layers
1. **Controllers**: Pure request parsing and HTTP response formatting.
2. **Services**: Domain business logic, transaction handling, orchestration.
3. **Repositories**: Data storage abstraction and query optimization.
4. **Middlewares**: Cross-cutting concerns such as authentication, rate limiting, and centralized error handling.

By adhering to this structure, unit testing becomes straightforward and database engines or third-party providers can be swapped with minimal ripple effects.
        `,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        category: 'Backend Architecture',
        tags: ['Node.js', 'Express', 'TypeScript', 'Clean Architecture', 'REST API'],
        author: { name: 'Kuldeep Sen' },
        publishedAt: new Date('2024-01-15'),
        status: 'published',
        seoTitle: 'Building Resilient REST APIs with Node.js & TypeScript',
        seoDescription: 'Learn clean architecture patterns for production Node.js and Express REST APIs.'
      },
      {
        title: 'Practical AI Automation: Streamlining Inbound Leads with Node.js and LLMs',
        slug: 'practical-ai-automation-inbound-leads-nodejs-llms',
        excerpt:
          'How to build an automated, asynchronous lead qualification pipeline that parses incoming inquiries and alerts sales teams in real time.',
        content: `
# Practical AI Automation: Streamlining Inbound Leads with Node.js and LLMs

In modern businesses, response speed directly correlates with conversion rates. By combining Node.js webhook listeners with LLM-based qualification agents, teams can evaluate customer intent within seconds.

## Architecture Highlights
- Webhook Ingestion & Anti-Spam Screening
- Background Queue Processing (Redis BullMQ)
- LLM Classification and Score Extraction
- Multi-Channel Sync (Slack, CRM, Email)
        `,
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        category: 'AI & Automation',
        tags: ['AI Automation', 'LLMs', 'Node.js', 'Redis', 'Business Automation'],
        author: { name: 'Kuldeep Sen' },
        publishedAt: new Date('2024-02-10'),
        status: 'published',
        seoTitle: 'Practical AI Automation for Leads | Kuldeep Sen',
        seoDescription: 'Guide on automating inbound lead qualification using Node.js and LLMs.'
      }
    ]);
    logger.info('✅ Blogs seeded.');

    logger.info('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
