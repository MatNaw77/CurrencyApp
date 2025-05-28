import {
    Controller,
    Post,
    Body,
    Get,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { Exchange } from './exchange.entity';

@Controller('exchange')
export class ExchangeController {
    constructor(private readonly exchangeService: ExchangeService) {}

    @Post()
    async exchangeEuro(
        @Body('amount') amount: number,
    ): Promise<{ convertedAmount: number }> {
        try {
            return this.exchangeService.exchangeEuro(amount);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getAllTransactions(): Promise<Exchange[]> {
        try {
            return this.exchangeService.getAllTransactions();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
