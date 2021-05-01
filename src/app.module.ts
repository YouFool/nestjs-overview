import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevController } from './dev/dev.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { anotherLoggerMiddleware } from './functional-logger.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from './validation.pipe';
import { RolesGuard } from './roles.guard';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [CatsModule],
  controllers: [AppController, DevController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter, // Define global exception filter with dependencies in our app module
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // Define global pipe with dependencies in our app module
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Define global guard with dependencies in our app module
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // Define global interceptor with dependencies in our app module
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, anotherLoggerMiddleware)
      .exclude({ path: 'dev', method: RequestMethod.POST })
      .forRoutes(
        DevController,
        { path: 'cats', method: RequestMethod.GET },
        { path: 'ab*cd', method: RequestMethod.ALL },
      );
  }
}
