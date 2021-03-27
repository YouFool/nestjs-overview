import { Injectable } from '@nestjs/common';
import { Cat, fromCreateCatDtoToCat } from '../models/Cat';
import { CreateCatDto } from '../dto/create-cat-dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(catDto: CreateCatDto) {
    const cat = fromCreateCatDtoToCat(catDto);
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
