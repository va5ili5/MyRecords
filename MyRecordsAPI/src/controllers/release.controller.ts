import { NextFunction, request, Request, Response } from 'express';
import { Release } from '../entity/Release';
import { getRepository, In } from 'typeorm';
import { User } from '../entity/User';
import { Artist } from '../entity/Artist';
import { Country } from '../entity/Country';
import { Format } from '../entity/Format';
import { Label } from '../entity/Label';
import { Genre } from '../entity/Genre';
import { Style } from '../entity/Style';

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
  return response.status(200).json(releases);
};

export const getReleaseById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const releaseId = request.params.id;
  const release = await getRepository(Release)
    .createQueryBuilder('release')
    .where('release.id = :id', { id: releaseId })
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
  const country = await getRepository(Country).findOneOrFail(request.body.countryId);
  const format = await getRepository(Format).findOneOrFail(request.body.formatId);
  const label = await getRepository(Label).findOneOrFail(request.body.labelId);
  const artists = await getRepository(Artist).findByIds(request.body.artistsIds);
  const styles = await getRepository(Style).findByIds(request.body.stylesIds);
  const genres = await getRepository(Genre).findByIds(request.body.genresIds);

  
  const release = new Release();
  release.genres = [...genres];
  console.log(styles)
  release.styles = [...styles];
  release.title = request.body.title;
  release.artists = [...artists];
  release.catno = request.body.catno;
  release.country = country;
  release.createDate = new Date();
  release.releaseDate = new Date();
  release.format = format;
  release.formatDetails = request.body.formatDetails;
  release.label = label;
  await getRepository(Release).save(release);
  return response.status(200).json(release);
};
