import { createApp } from '../src/app';
import { connectDatabase } from '../src/config/database';

const app = createApp();

let databaseConnection: Promise<unknown> | null = null;

const handler = async (req: any, res: any) => {
  if (!databaseConnection) {
    databaseConnection = connectDatabase().catch((error) => {
      databaseConnection = null;
      throw error;
    });
  }

  await databaseConnection;

  return app(req, res);
};

export default handler;