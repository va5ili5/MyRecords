import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Genre } from '../entity/Genre';
import { Style } from '../entity/Style';

export const getGenres = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const artists = await getRepository(Genre).find();
    return response.status(200).json(artists);
  };

  export const getGenreById = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const genreId = request.params.id
    const artists = await getRepository(Genre).findOneOrFail(genreId);
    return response.status(200).json(artists);
  };

  export const createGenre = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    const styles = await getRepository(Style).findByIds(request.body.stylesIds);
    const genre = new Genre();
    genre.name = request.body.genreName;
    genre.styles = [...styles];
    await getRepository(Genre).save(genre);
    return response.status(200).json(genre);
  };