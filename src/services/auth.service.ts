import { adminRepository } from '../repositories/admin.repository';
import { AppError } from '../utils/apiError';
import { Messages } from '../constants/messages';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { LoginInput } from '../validators/auth.validator';

export class AuthService {
  async login(input: LoginInput): Promise<{
    admin: { id: string; email: string; name: string; role: string };
    accessToken: string;
    refreshToken: string;
  }> {
    const admin = await adminRepository.findByEmail(input.email);
    if (!admin) {
      throw AppError.unauthorized(Messages.LOGIN_FAILED);
    }

    const isMatch = await admin.comparePassword(input.password);
    if (!isMatch) {
      throw AppError.unauthorized(Messages.LOGIN_FAILED);
    }

    const payload = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    await adminRepository.updateRefreshToken(admin._id.toString(), refreshToken);
    await adminRepository.updateLastLogin(admin._id.toString());

    return {
      admin: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role
      },
      accessToken,
      refreshToken
    };
  }

  async refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string }> {
    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      throw AppError.unauthorized(Messages.REFRESH_FAILED);
    }

    const admin = await adminRepository.findById(payload.id);
    if (!admin || admin.refreshToken !== token) {
      throw AppError.unauthorized(Messages.REFRESH_FAILED);
    }

    const newPayload = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role
    };

    const newAccessToken = signAccessToken(newPayload);
    const newRefreshToken = signRefreshToken(newPayload);

    await adminRepository.updateRefreshToken(admin._id.toString(), newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }

  async logout(adminId: string): Promise<void> {
    await adminRepository.updateRefreshToken(adminId, undefined);
  }
}

export const authService = new AuthService();
