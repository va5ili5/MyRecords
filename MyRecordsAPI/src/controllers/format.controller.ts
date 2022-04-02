import { Request, Response } from 'express';
import { createQueryBuilder, getRepository } from 'typeorm';
import { Format } from '../entity/Format';

export const getFormats = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const formats = await getRepository(Format).find();
  return response.status(200).json(formats);
};