import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { Country } from '../entity/Country';

export const getCountries = async (
  request: Request,
  response: Response
): Promise<Response> => {

  const page: number =  parseInt(request.query.page as any) || 1;
  const perPage: number = 9;

  // countries.offset((page - 1) * perPage).limit(perPage);

  const countries = await getRepository(Country)
        .createQueryBuilder("c")
              .where("c.name like :s", { s:`%${request.query.s}%`})
              .offset((page - 1) * perPage).limit(perPage)
              .getMany();
  return response.status(200).json(countries);
};
