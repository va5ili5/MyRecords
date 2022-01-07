import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Artist } from '../entity/Artist';
import { Country } from '../entity/Country';
import { Format } from '../entity/Format';
import { Genre } from '../entity/Genre';
import { Label } from '../entity/Label';

export const getFormsData = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const formsdata = {
    artists: await createQueryBuilder(Artist, 'artist')
    .addSelect(['artist.id', 'artist.name']).getMany(),
    labels: await createQueryBuilder(Label, 'label')
    .addSelect(['label.id', 'label.name']).getMany(),
    genres: await createQueryBuilder(Genre, 'genre')
    .addSelect(['genre.id', 'genre.name']).getMany(),
    countries : await createQueryBuilder(Country, 'country')
    .addSelect(['country.id', 'country.iso', 'country.name']).getMany(),
    formats : await createQueryBuilder(Format, 'format')
    .addSelect(['format.id', 'format.name']).getMany()
  } 
  return response.status(200).json(formsdata);
};