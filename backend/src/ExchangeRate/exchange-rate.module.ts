import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateJob } from './exchange-rate.job';

@Module({
    imports: [HttpModule],
    controllers: [ExchangeRateController],
    providers: [ExchangeRateService, ExchangeRateJob],
})
export class ExchangeRateModule {}
