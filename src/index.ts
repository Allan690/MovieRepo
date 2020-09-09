import debug from 'debug';
import http from 'http';
import env from './config/environment';
import app from './app';
import 'reflect-metadata';
import { useContainer } from 'typeorm';
import { Container } from 'typedi';
import createTypeOrmConnection from './utils/typeorm-conn';

const logger = debug('log');

(async() => {
  useContainer(Container);
  const conn = await createTypeOrmConnection();
  await conn.runMigrations();
  const server = http.createServer(app);
  server.listen(env.PORT, async () => {
    app.set('host', `http://localhost:${env.PORT}`);

    logger(`Application running on port ${env.PORT}`);
  });
})();
