import { getConnectionOptions, createConnection } from 'typeorm';

/**
 * @description creates a TypeORM connection for a specific enviroment
 */
const createTypeOrmConnection = async () => {
  const connectionOptions = await getConnectionOptions();
  return createConnection({ ...connectionOptions, name: 'default' });
};

export default createTypeOrmConnection;
