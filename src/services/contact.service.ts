import { contactRepository } from '../repositories/contact.repository';
import { IContact } from '../models/contact.model';
import { PaginatedResult } from '../types';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';
import { emailService } from '../utils/email';
import { logger } from '../config/logger';

export interface SubmitContactDto {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: string;
  website?: string; // Honeypot field
}

export class ContactService {
  async submitInquiry(
    data: SubmitContactDto,
    ipAddress?: string,
    userAgent?: string
  ): Promise<IContact | null> {
    // Honeypot spam check: if 'website' field is populated, a bot filled out the hidden field
    if (data.website && data.website.trim().length > 0) {
      logger.warn(`🤖 Spam bot detected in contact form submission from IP: ${ipAddress}`);
      // Silently return without storing to fool the bot, or throw spam error
      throw AppError.badRequest(Messages.CONTACT_SPAM_DETECTED);
    }

    const inquiry = await contactRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      source: data.source || 'portfolio_contact_form',
      status: 'unread',
      ipAddress,
      userAgent
    });

    // Send email notification asynchronously without blocking response
    emailService
      .sendContactNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        source: data.source
      })
      .catch(err => {
        logger.error('Asynchronous contact email notification failed:', err);
      });

    return inquiry;
  }

  async getAdminInquiries(
    page = 1,
    limit = 20,
    status?: string
  ): Promise<PaginatedResult<IContact>> {
    return contactRepository.findAllAdmin(page, limit, status);
  }

  async getInquiryById(id: string): Promise<IContact> {
    const inquiry = await contactRepository.findById(id);
    if (!inquiry) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return inquiry;
  }

  async updateStatus(
    id: string,
    status: 'unread' | 'read' | 'replied' | 'archived'
  ): Promise<IContact> {
    const updated = await contactRepository.updateStatus(id, status);
    if (!updated) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
    return updated;
  }

  async deleteInquiry(id: string): Promise<void> {
    const deleted = await contactRepository.delete(id);
    if (!deleted) {
      throw AppError.notFound(Messages.RESOURCE_NOT_FOUND);
    }
  }
}

export const contactService = new ContactService();
