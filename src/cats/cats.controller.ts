import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';

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

  @Get('redirect')
  @Redirect('https://nestjs.com', 301) // The statusCode defaults to 302 if omitted
  redirectToNestJs() {
    // We can either use a @Redirect() decorator or call res.redirect() with @Res()
    return;
  }

  @Get(':id')
  findOne(@Param() params): string {
    // In order to define routes with parameters, we can add route parameter tokens in the
    // path of the route to capture the dynamic value at that position in the request URL
    console.log(params.id);
    return `This action returns a cat with the id of #${params.id}`;
  }

  @Get(':catId')
  findOneSpecifyParameter(@Param('catId') catId: string): string {
    // We can also specify the parameters beforehand in the function declaration
    console.log(catId);
    return `This action returns a cat with the id of #${catId}`;
  }

  @Get('async')
  async findAllAsync(): Promise<any[]> {
    return [];
  }

  @Get('asyncRxJs')
  findAllRxJs(): Observable<any[]> {
    return of([]);
  }
}
