import { CreateCatDto } from '../dto/create-cat-dto';

export interface Cat {
  name: string;
  age: number;
  breed: string;
}

export const fromCreateCatDtoToCat = (dto: CreateCatDto): Cat => {
  return {
    age: dto.age,
    breed: dto.breed,
    name: dto.name,
  };
};
