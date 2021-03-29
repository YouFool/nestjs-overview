import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // We can also bind a functional Middleware to every registered route, this way:
  // app.use(anotherLoggerMiddleware);

  // This way, we set a new global-scoped filter, but it cannot inject any dependencies
  // To use a global-scoped filter with dependencies, see app.module.ts
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3001);
}
bootstrap();
