import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // We can also bind a functional Middleware to every registered route:
  // app.use(anotherLoggerMiddleware);

  // This way, we set a new global-scoped filter, but it cannot inject any dependencies
  // To use a global-scoped filter with dependencies, see app.module.ts
  // app.useGlobalFilters(new HttpExceptionFilter());

  // We can also bind global scoped pipes to apply the pipe's validation to every route handler
  // However, to use a global-scoped filter with dependencies, see app.module.ts
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}
bootstrap();
