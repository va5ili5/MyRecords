import { Request, Response } from 'express';
import { Artist } from '../entity/Artist';
import { getRepository } from 'typeorm';

export const getArtists = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const page: number =  parseInt(request.query.page as any) || 1;
  const perPage: number = 9;

  const artists = await getRepository(Artist)
        .createQueryBuilder("c")
              .where("c.name like :s", { s:`%${request.query.s}%`})
              .offset((page - 1) * perPage).limit(perPage)
              .getMany();
  return response.status(200).json(artists);
};

export const createArtist = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const artist = await getRepository(Artist).save({
    name: 'Iron Maiden',
    profile:
      'Iron Maiden are an English heavy metal band formed in Leyton, East London, in 1975 by bassist and primary songwriter Steve Harris.',
    releases: [],
  });
  return response.status(200).json(artist);
};
