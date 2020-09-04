import { Request, Response } from 'express';
import { Release } from '../entity/Release';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const getReleases = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const releases = await getRepository(Release)
    .createQueryBuilder('release')
    .select('release')
    .addSelect(['format.name'])
    .addSelect(['artist.id', 'artist.name'])
    .addSelect(['label.id', 'label.name'])
    .innerJoin('release.format', 'format')
    .innerJoin('release.artists', 'artist')
    .innerJoin('release.label', 'label')
    .getMany();
  // .find({
  //   relations: ['label', 'artists', 'country', 'user'],
  // });
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
