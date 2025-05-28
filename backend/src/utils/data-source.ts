import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    cache: {
        type: 'database',
        duration: 60000,
    },
});
