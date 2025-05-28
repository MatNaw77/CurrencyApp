import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExchangeRateService {
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) {}

    async getExchangeRate(): Promise<number> {
        const apiKey = this.configService.get<string>('API_KEY');

        const response = await firstValueFrom(
            this.httpService.get(
                'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api',
                {
                    headers: {
                        'x-api-key': apiKey,
                    },
                },
            ),
        );

        return response.data?.exchange_rate;
    }
}
