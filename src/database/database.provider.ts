import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mssql',
        port: 1433,
        host: process.env.DB_SERVER,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        requestTimeout: 100000,
      });

      return dataSource.initialize();
    },
  },
];
