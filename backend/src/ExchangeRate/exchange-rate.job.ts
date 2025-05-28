import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExchangeRateService } from './exchange-rate.service';
import { saveToCache } from 'src/utils/cache.utils';

@Injectable()
export class ExchangeRateJob {
    private readonly logger = new Logger(ExchangeRateJob.name);

    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        try {
            const exchange_rate =
                await this.exchangeRateService.getExchangeRate();
            await saveToCache('eur-pln-rate', { exchange_rate }, 60000);
            this.logger.log(`Fetched exchange rate: ${exchange_rate}`);
        } catch (error) {
            this.logger.error('Error fetching exchange rate', error);
        }
    }

    async onApplicationBootstrap() {
        this.logger.log('Running initial exchange rate fetch on app bootstrap');
        await this.handleCron();
    }
}
