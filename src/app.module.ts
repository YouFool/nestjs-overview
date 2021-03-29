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

@Module({
  imports: [CatsModule],
  controllers: [AppController, DevController],
  providers: [AppService],
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
