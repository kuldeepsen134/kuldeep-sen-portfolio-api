import { profileRepository } from '../repositories/profile.repository';
import { IProfile } from '../models/profile.model';
import { AppError } from '../utils/apiError';

export class ProfileService {
  async getPublicProfile(): Promise<Partial<IProfile>> {
    const profile = await profileRepository.getProfile();
    if (!profile) {
      throw AppError.notFound('Profile information is not configured yet.');
    }

    // Return public-safe fields
    return {
      name: profile.name,
      headline: profile.headline,
      shortBio: profile.shortBio,
      longBio: profile.longBio,
      profileImage: profile.profileImage,
      resumeUrl: profile.resumeUrl,
      location: profile.location,
      availability: profile.availability,
      socialLinks: profile.socialLinks,
      email: profile.email,
      phone: profile.phone,
      seo: profile.seo
    };
  }

  async getAdminProfile(): Promise<IProfile | null> {
    return profileRepository.getProfile();
  }

  async upsertProfile(data: Partial<IProfile>): Promise<IProfile> {
    return profileRepository.upsertProfile(data);
  }

  async getResumeDownloadInfo(): Promise<{ resumeUrl: string; name: string }> {
    const profile = await profileRepository.getProfile();
    if (!profile || !profile.resumeUrl) {
      throw AppError.notFound('Resume is not currently available.');
    }
    return {
      resumeUrl: profile.resumeUrl,
      name: `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`
    };
  }
}

export const profileService = new ProfileService();
