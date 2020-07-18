import { Request, Response } from 'express';
import { Release } from '../entity/Release';
import { getRepository } from 'typeorm';

export const getReleases = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const releases = await getRepository(Release).find({
    relations: ['label', 'artists'],
  });
  return response.status(200).json(releases);
};

export const getReleaseById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const releaseId = request.params.id;
  const release = await getRepository(Release).findOne(releaseId, {
    relations: ['label', 'artists'],
  });
  return response.status(200).json(release);
};
