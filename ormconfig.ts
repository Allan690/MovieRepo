const env = require('./src/config/environment');

module.exports =  [
  {
    name:  'default',
    type: 'postgres',
    host: env.default.DB_HOST,
    port: 5432,
    username: env.default.DB_USER,
    password: env.default.DB_PASSWORD,
    database: env.default.DB_NAME,
    synchronize: true,
    logging: true,
    cache: true,
    entities: [
      env.NODE_ENV === 'production' ? 'dist/modules/**/*.model.js' : 'src/modules/**/*.model.ts'
    ],
    subscribers: [
      env.NODE_ENV === 'production' ? 'dist/subscriber/*.js' :  'src/subscriber/*.ts'
    ],
    migrations: [
      env.NODE_ENV === 'production' ? 'dist/database/migrations/*.js' : 'src/database/migrations/*.ts'
    ],
    cli: {
      entitiesDir: env.NODE_ENV === 'production' ? 'dist/modules' : 'src/modules',
      migrationsDir: env.NODE_ENV === 'production' ? 'dist/database/migrations' : 'src/database/migrations'
    }
  }
];
