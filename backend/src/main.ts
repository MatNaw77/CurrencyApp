import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './utils/data-source';

async function bootstrap() {
    await dataSource.initialize();
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    await app.listen(3001);
}
bootstrap();
