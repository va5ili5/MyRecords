import { Request, Response } from 'express';
import { Label } from '../entity/Label';
import { getRepository } from 'typeorm';

export const getLabels = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const labels = await getRepository(Label).find({ relations: ['releases'] });
  return response.status(200).json(labels);
};

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
