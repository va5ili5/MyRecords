import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Genre } from '../entity/Genre';
import { Style } from '../entity/Style';

export const getStylesByGenreId = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const genreId = request.params.genreId;

    const styles = await getRepository(Style)
    .createQueryBuilder('style')
    .where('style.genre.id = :id', { id: genreId })
    .getMany()
  return response.status(200).json(styles);
  };

  export const getStyleById = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const styleId = request.params.id;
    const style = await getRepository(Style).findOneOrFail(styleId);
    return response.status(200).json(style);
  };

  export const createStyle = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response> => {
    const genreId = request.body.genreId;
    const genre = await getRepository(Genre).findOneOrFail(genreId);
    const style = new Style();
    style.name = request.body.styleName;
    style.genre = genre;
    await getRepository(Style).save(style);
    return response.status(200).json(style);
  };