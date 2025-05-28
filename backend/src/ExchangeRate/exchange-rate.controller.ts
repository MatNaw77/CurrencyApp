import {
    Controller,
    Get,
    HttpException,
    UseInterceptors,
} from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { CacheInterceptorFactory } from '../common/interceptors/cache.interceptor';
import { HttpStatus } from '@nestjs/common';

const EurPlnCacheInterceptor = CacheInterceptorFactory('eur-pln-rate');

@Controller('exchange-rate')
@UseInterceptors(EurPlnCacheInterceptor)
export class ExchangeRateController {
    constructor(private readonly exchangeService: ExchangeRateService) {}

    //for extension, currency from and to should come in query
    @Get('eur-pln')
    async getEurPlnRate() {
        try {
            const exchange_rate = await this.exchangeService.getExchangeRate();
            return { exchange_rate };
        } catch (error) {
            const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
            const message = error.message || 'Internal server error';
            throw new HttpException({ status, message }, status);
        }
    }
}
