import { db } from '@subtrack/db';

export const DRIZZLE = 'DRIZZLE_CONNECTION';

export const DrizzleProvider = {
  provide: DRIZZLE,
  useValue: db,
};
