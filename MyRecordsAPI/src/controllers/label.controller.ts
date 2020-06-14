import { Request, Response } from 'express';
import { Label } from '../entity/Label';
import { getRepository } from 'typeorm';

export const getLabels = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const labels = await getRepository(Label).find({ relations: ['releases'] });
  return response.json(labels);
};
