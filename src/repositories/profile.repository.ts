import { ProfileModel, IProfile } from '../models/profile.model';

export class ProfileRepository {
  async getProfile(): Promise<IProfile | null> {
    return ProfileModel.findOne().lean<IProfile>();
  }

  async getProfileDoc(): Promise<IProfile | null> {
    return ProfileModel.findOne();
  }

  async upsertProfile(data: Partial<IProfile>): Promise<IProfile> {
    const existing = await ProfileModel.findOne();
    if (existing) {
      Object.assign(existing, data);
      return existing.save();
    }
    return ProfileModel.create(data);
  }
}

export const profileRepository = new ProfileRepository();
