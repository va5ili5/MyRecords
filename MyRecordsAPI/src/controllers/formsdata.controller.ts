import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Country } from '../entity/Country';
import { Format } from '../entity/Format';
import { Genre } from '../entity/Genre';

export const getFormsData = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const formsdata = {
    genres: await createQueryBuilder(Genre, 'genre')
    .addSelect(['genre.id', 'genre.name']).getMany(),
    countries : await createQueryBuilder(Country, 'country')
    .addSelect(['country.id', 'country.iso', 'country.name']).getMany(),
    formats : await createQueryBuilder(Format, 'format')
    .addSelect(['format.id', 'format.name']).getMany()
  } 
  return response.status(200).json(formsdata);
};