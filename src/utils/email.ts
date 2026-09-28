import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../config/logger';

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface ContactNotificationData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isConfigured = false;

  constructor() {
    this.init();
  }

  private init(): void {
    if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASSWORD) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_PORT === 465,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD
        }
      });
      this.isConfigured = true;
      logger.info('📧 Email service initialized with SMTP credentials.');
    } else {
      this.isConfigured = false;
      logger.info('ℹ️ SMTP is not configured. Email notifications will be safely simulated/logged.');
    }
  }

  public async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.isConfigured || !this.transporter) {
      logger.info(`[Email Simulation] To: ${options.to} | Subject: ${options.subject}`);
      return true;
    }

    try {
      await this.transporter.sendMail({
        from: env.MAIL_FROM,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      });
      logger.info(`Email successfully dispatched to ${options.to}`);
      return true;
    } catch (error) {
      logger.error('Failed to send email via SMTP transporter:', error);
      // Return false instead of throwing to prevent app crashing
      return false;
    }
  }

  public async sendContactNotification(inquiry: ContactNotificationData): Promise<void> {
    const recipient = env.NOTIFICATION_RECEIVER_EMAIL || env.ADMIN_EMAIL;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Portfolio Inquiry Received</h2>
        <p><strong>From:</strong> ${inquiry.name} (${inquiry.email})</p>
        ${inquiry.phone ? `<p><strong>Phone:</strong> ${inquiry.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${inquiry.subject}</p>
        ${inquiry.source ? `<p><strong>Source:</strong> ${inquiry.source}</p>` : ''}
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 15px;">
          <p style="margin: 0; white-space: pre-wrap;"><strong>Message:</strong><br/>${inquiry.message}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #64748b;">This notification was sent from your portfolio backend.</p>
      </div>
    `;

    const text = `
New Portfolio Inquiry Received:
------------------------------
Name: ${inquiry.name}
Email: ${inquiry.email}
${inquiry.phone ? `Phone: ${inquiry.phone}\n` : ''}
Subject: ${inquiry.subject}
${inquiry.source ? `Source: ${inquiry.source}\n` : ''}

Message:
${inquiry.message}
    `;

    await this.sendEmail({
      to: recipient,
      subject: `[Portfolio Inquiry] ${inquiry.subject} - from ${inquiry.name}`,
      text,
      html
    });
  }
}

export const emailService = new EmailService();
