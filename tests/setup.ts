import mongoose from 'mongoose';
import { AdminModel } from '../src/models/admin.model';
import { ProjectModel } from '../src/models/project.model';
import { ProfileModel } from '../src/models/profile.model';
import { ContactModel } from '../src/models/contact.model';

const TEST_MONGODB_URI =
  process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/kuldeep_portfolio_test';

beforeAll(async () => {
  // Ensure we are in test mode
  process.env.NODE_ENV = 'test';
  process.env.MONGODB_URI = TEST_MONGODB_URI;

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(TEST_MONGODB_URI);
  }

  // Ensure test admin exists
  const existingAdmin = await AdminModel.findOne({ email: 'admin@kuldeepsen.com' });
  if (!existingAdmin) {
    const admin = new AdminModel({
      name: 'Kuldeep Sen',
      email: 'admin@kuldeepsen.com',
      password: 'SuperSecureAdminPassword123!',
      role: 'admin'
    });
    await admin.save();
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    // Clean up test collections
    await Promise.all([
      AdminModel.deleteMany({}),
      ProjectModel.deleteMany({}),
      ProfileModel.deleteMany({}),
      ContactModel.deleteMany({})
    ]);
    await mongoose.connection.close();
  }
});
