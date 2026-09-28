import { AdminModel, IAdmin } from '../models/admin.model';

export class AdminRepository {
  async findByEmail(email: string): Promise<IAdmin | null> {
    return AdminModel.findOne({ email: email.toLowerCase() });
  }

  async findById(id: string): Promise<IAdmin | null> {
    return AdminModel.findById(id);
  }

  async create(data: Partial<IAdmin>): Promise<IAdmin> {
    return AdminModel.create(data);
  }

  async updateRefreshToken(id: string, refreshToken?: string): Promise<void> {
    await AdminModel.findByIdAndUpdate(id, { $set: { refreshToken } });
  }

  async updateLastLogin(id: string): Promise<void> {
    await AdminModel.findByIdAndUpdate(id, { $set: { lastLoginAt: new Date() } });
  }
}

export const adminRepository = new AdminRepository();
