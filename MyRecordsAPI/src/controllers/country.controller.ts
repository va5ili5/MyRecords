import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Country } from '../entity/Country';

export const getCountries = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const countries = await getRepository(Country).find();
  return response.status(200).json(countries);
};
