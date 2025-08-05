import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: {
    database: {
      driver: process.env.DATABASE_DRIVER || 'postgres', 
      host: process.env.DATABASE_HOST || 'localhost', 
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432, 
      username: process.env.DATABASE_USERNAME || 'user', 
      password: process.env.DATABASE_PASSWORD || 'password',
      database: process.env.DATABASE_NAME || 'database_name', 
      synchronize: true, 
      logging: true, 
    },
  } as AppConfig,
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}