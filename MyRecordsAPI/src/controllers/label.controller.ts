import { Request, Response } from 'express';
import { Label } from '../entity/Label';
import { getRepository } from 'typeorm';

export const getLabels = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const page: number =  parseInt(request.query.page as any) || 1;
  const perPage: number = 9;

  const labels = await getRepository(Label).
    createQueryBuilder("c")
    .where("c.name like :s", { s:`%${request.query.s}%`})
    .offset((page - 1) * perPage).limit(perPage)
    .getMany();
    return response.status(200).json(labels);
};

export const getReleaseLabels = async(
  request: Request,
  response: Response
): Promise<Response> => {
  const labels = await getRepository(Label).find({ relations: ['releases'] });
  return response.status(200).json(labels);
}

export const getLabelById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const labelId = request.params.id;
  const label = await getRepository(Label).findOne(labelId, {
    //relations: ['label', 'artists'],
  });
  return response.status(200).json(label);
};

export const createLabel = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const label = await getRepository(Label)
    .save({
      id: 3,
      name: 'EMI',
      profile:
        'EMI was the label of UK company EMI Records Ltd., also known as EMI Records.Label Code: LC 0542 / LC 00542.',
      url: 'emimusic.com',
    })
    .catch((error) => {
      response.status(500).json({
        error: error,
      });
    });
  return response.status(200).json(label);
};
