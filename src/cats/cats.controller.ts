import { Header, HttpCode } from '@nestjs/common';
import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    // The response status code is always 200 by default, except for POST requests which are 201.
    return 'This action adds a new cat';
  }

  @Post('customHttpCode')
  @HttpCode(204)
  createWithCustomHttpCode() {
    // In case of you status code isn't static, you can inject @Res() and manipulate the response manually
    return 'This action adds a new cat and returns 204 HTTP code';
  }

  @Post('customResponseHeader')
  @Header('Cache-Control', 'none')
  createWithCustomResponseHeader() {
    // We could also set headers using res.header() directly with @Res()
    return 'This action adds a new cat and returns a custom response header';
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
