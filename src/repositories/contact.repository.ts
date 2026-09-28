import { FilterQuery } from 'mongoose';
import { ContactModel, IContact } from '../models/contact.model';
import { PaginatedResult } from '../types';

export class ContactRepository {
  async create(data: Partial<IContact>): Promise<IContact> {
    return ContactModel.create(data);
  }

  async findAllAdmin(
    page = 1,
    limit = 20,
    status?: string
  ): Promise<PaginatedResult<IContact>> {
    const query: FilterQuery<IContact> = {};
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      ContactModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items: items as unknown as IContact[],
      total,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  async findById(id: string): Promise<IContact | null> {
    return ContactModel.findById(id);
  }

  async updateStatus(id: string, status: 'unread' | 'read' | 'replied' | 'archived'): Promise<IContact | null> {
    return ContactModel.findByIdAndUpdate(id, { $set: { status } }, { new: true });
  }

  async delete(id: string): Promise<IContact | null> {
    return ContactModel.findByIdAndDelete(id);
  }
}

export const contactRepository = new ContactRepository();
