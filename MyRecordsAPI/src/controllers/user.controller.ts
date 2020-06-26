import { Request, Response } from 'express';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

export const createUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user = await getRepository(User).create({
    email: request.body.email,
    password: request.body.password,
    username: request.body.username,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
  });
  return response.status(201).json(user);
};
