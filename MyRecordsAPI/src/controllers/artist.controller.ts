import { Request, Response } from 'express';
import { Artist } from '../entity/Artist';
import { getRepository } from 'typeorm';

export const getArtists = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const artists = await getRepository(Artist).find();
  return response.status(200).json(artists);
};

/*
.createQueryBuilder("category")
    .leftJoinAndSelect("category.questions", "question")
    .getMany();
*/
