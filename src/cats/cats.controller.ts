import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from '../dto/create-cat-dto';
import { CatsService } from './cats.service';
import { Cat } from '../models/Cat';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ValidationPipe } from '../validation.pipe';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';
import { LoggingInterceptor } from '../logging.interceptor';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
// We should use DI to instantiate the filter, it's better because we use a single instance
// Besides Controllers, we're able to use the @UseFilters decorator on method-scope or in the global scope, see example in main.ts
// Remember: pipes, guards and interceptors can be controller-scoped, method-scoped or global-scoped
@UseFilters(HttpExceptionFilter)
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  create(@Body(new ValidationPipe()) catDto: CreateCatDto) {
    // The response status code is always 200 by default, except for POST requests which are 201.
    console.log(catDto);
    this.catsService.create(catDto);
  }

  @Post('createAsync')
  async createAsync(@Body() catDto: CreateCatDto) {
    // The response status code is always 200 by default, except for POST requests which are 201.
    console.log(catDto);
    this.catsService.create(catDto);
  }

  @Post('customHttpCode')
  @HttpCode(204)
  createWithCustomHttpCode(@Body() catDto: CreateCatDto) {
    // In case of you status code isn't static, you can inject @Res() and manipulate the response manually
    console.log(catDto);
    this.catsService.create(catDto);
  }

  @Post('customResponseHeader')
  @Header('Cache-Control', 'none')
  createWithCustomResponseHeader(@Body() catDto: CreateCatDto) {
    // We could also set headers using res.header() directly with @Res()
    console.log(catDto);
    this.catsService.create(catDto);
  }

  @Get()
  findAll(@Req() request: Request): Cat[] {
    console.log(request);
    return this.catsService.findAll();
  }

  @Get('async')
  async findAllAsync(): //
  // We can also use DefaultValuePipe to provide sensible defaults
  // @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
  // activeOnly: boolean,
  // @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  Promise<Cat[]> {
    throw new HttpException(
      { status: HttpStatus.FORBIDDEN, error: 'This is a custom message' },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('asyncRxJs')
  findAllRxJs(): Observable<any[]> {
    return of(this.catsService.findAll());
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
  // We can also build a new instance to customize the pipes behavior:
  // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
  findOneSpecifyParameter(@Param('catId', ParseIntPipe) catId: number): string {
    // We can also specify the parameters beforehand in the function declaration
    console.log(catId);
    return `This action returns a cat with the id of #${catId}`;
  }
}
