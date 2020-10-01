import { NextFunction, request, Request, Response } from 'express';
import { Release } from '../entity/Release';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Artist } from '../entity/Artist';
import { Country } from '../entity/Country';
import { Format } from '../entity/Format';
import { Label } from '../entity/Label';

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
  const release = await getRepository(Release)
    .createQueryBuilder('release')
    .where('release.id = :id', { id: release_id })
    .select('release')
    .addSelect(['artist.id', 'artist.name'])
    .innerJoin('release.artists', 'artist')
    .getOne();
  return response.status(200).json(release);
};

export const createRelease = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response> => {
  const artist = await getRepository(Artist).findOne(3);
  const country = await getRepository(Country).findOne(231);
  const format = await getRepository(Format).findOne(2);
  const label = await getRepository(Label).findOne(2);
  const release = new Release();
  release.title = 'Brave New World';
  release.artists.push(artist!);
  release.catno = '7243 5 26605 2 0, 5 26605 2, 526 6052';
  release.country = country!;
  release.createDate = new Date();
  release.format = format!;
  release.formatDetails = 'Album';
  release.label = label!;
  await getRepository(Release).create;
  return response.status(200).json(release);
};
