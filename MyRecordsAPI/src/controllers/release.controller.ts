import { Request, Response } from 'express';
import { Release } from '../entity/Release';
import { getRepository } from 'typeorm';

export const getReleases = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const releases = await getRepository(Release).find({
    relations: ['label', 'artists', 'country'],
  });
  return response.status(200).json(releases);
};

export const getReleaseById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const release_id = request.params.id;
  const release = await getRepository(Release).findOne(release_id, {
    relations: ['label', 'artists', 'country'],
  });
  return response.status(200).json(release);
};
