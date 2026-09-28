import request from 'supertest';
import { createApp } from '../src/app';
import { ContactModel } from '../src/models/contact.model';

const app = createApp();

describe('Contact Form API (/api/v1/public/contact)', () => {
  it('should accept valid contact submission and store inquiry', async () => {
    const payload = {
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      phone: '+1 555-1234',
      subject: 'Custom Web Application Inquiry',
      message: 'Hello Kuldeep, I would like to consult on an MVP project for our business.',
      source: 'portfolio_contact_form'
    };

    const res = await request(app)
      .post('/api/v1/public/contact')
      .send(payload);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);

    const saved = await ContactModel.findOne({ email: 'sarah@example.com' });
    expect(saved).not.toBeNull();
    expect(saved?.name).toBe('Sarah Connor');
    expect(saved?.status).toBe('unread');
  });

  it('should reject submission with invalid email format', async () => {
    const res = await request(app)
      .post('/api/v1/public/contact')
      .send({
        name: 'Sarah Connor',
        email: 'invalid-email',
        subject: 'Consultation',
        message: 'A message that is long enough to pass length requirements.'
      });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it('should reject submission missing required message field', async () => {
    const res = await request(app)
      .post('/api/v1/public/contact')
      .send({
        name: 'Sarah Connor',
        email: 'sarah@example.com',
        subject: 'Consultation'
      });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it('should catch spam bot when honeypot field is filled', async () => {
    const res = await request(app)
      .post('/api/v1/public/contact')
      .send({
        name: 'Spam Bot',
        email: 'spammer@example.com',
        subject: 'Buy Crypto Now',
        message: 'This is automated spam message.',
        website: 'http://spamsite.xyz' // Honeypot filled!
      });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });
});
