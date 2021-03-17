import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'This action returns all cats';
  }

  @Get('wild*cat')
  wildcard(): string {
    return 'This is a wildcard route';
  }
}
