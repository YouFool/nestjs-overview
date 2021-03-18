import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { DevController } from './dev/dev.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, DevController],
  providers: [AppService],
})
export class AppModule {}
