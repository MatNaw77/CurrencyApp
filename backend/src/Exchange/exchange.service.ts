import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exchange } from './exchange.entity';
import { getFromCache } from 'src/utils/cache.utils';

@Injectable()
export class ExchangeService {
    constructor(
        @InjectRepository(Exchange)
        private readonly exchangeRepo: Repository<Exchange>,
    ) {}

    async exchangeEuro(amountEur: number): Promise<number> {
        const rateKey = 'eur-pln-rate';
        const ttlMs = 60000;

        const { exchange_rate: exchangeRate } = await getFromCache(
            rateKey,
            ttlMs,
        );

        if (exchangeRate === null) {
            throw new Error('Exchange rate not found in cache');
        }

        const convertedAmount = parseFloat(
            (amountEur * exchangeRate).toFixed(2),
        );

        const conversion = this.exchangeRepo.create({
            amountEur,
            amountPln: convertedAmount,
            exchangeRate,
        });

        await this.exchangeRepo.save(conversion);
        return convertedAmount;
    }

    async getAllTransactions(): Promise<Exchange[]> {
        return this.exchangeRepo.find({
            order: { createdAt: 'DESC' },
        });
    }
}
