import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateModule } from './ExchangeRate/exchange-rate.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ExchangeModule } from './Exchange/exchange.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            cache: {
                type: 'database',
                duration: 60000,
            },
        }),
        ExchangeRateModule,
        ExchangeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
