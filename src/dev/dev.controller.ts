import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'dev', host: 'localhost' })
export class DevController {
  @Get()
  index(): string {
    return 'This will only at localhost';
  }
}
