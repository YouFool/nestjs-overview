import { Global, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// We can also export the module globally, and it's providers will be available everywhere
// This way, we can import helpers, db connections, etc
@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  // We can also inject providers at the module (i.e for configuration purposes)
  // constructor(private catsService: CatsService) {}
}
