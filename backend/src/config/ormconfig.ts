import {ConnectionOptions} from 'typeorm';
import * as path from 'path'

// ['src/database/entities/*.entity{.ts,.js}']
const config: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'my',
  entities: [path.resolve(__dirname, '..' , 'database' , 'entities' , '*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, '..' , 'database' , 'migrations' , '*.entity{.ts,.js}')],
  synchronize: true,
  logging: true,
  logger: 'file',
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
export = config;