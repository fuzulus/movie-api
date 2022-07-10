import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { APP_PORT, JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    throw new Error(
        'Missing JWT_SECRET env var. Set it and restart the server',
    );
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(APP_PORT || 3000);
}
bootstrap();
