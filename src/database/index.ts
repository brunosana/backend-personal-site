import { getConnectionOptions, ConnectionOptions, createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: 'postgres',
    synchronize: false,
    logging: false,
    extra: {
      ssl: { rejectUnauthorized: false },
    },
    entities: ['dist/entity/*.*', 'src/models/*.*'],
  };
  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

const connect2Database = async (): Promise<void> => {
    const typeormconfig = await getOptions();
    await createConnection(typeormconfig);
};

connect2Database().then(async () => {
    console.log('Connected to database');
});
