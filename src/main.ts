import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // We can also bind a functional Middleware to every registered route, this way:
  // app.use(anotherLoggerMiddleware);

  await app.listen(3001);
}
bootstrap();
