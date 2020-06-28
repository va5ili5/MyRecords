import { Request, Response } from 'express';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

export const getUserById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = request.params.id;
  const user = await getRepository(User).findOne(userId);
  return response.status(200).json(user);
};

export const createUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user = await getRepository(User).save({
    email: request.body.email,
    password: request.body.password,
    username: request.body.username,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
  });
  return response.status(201).json(user);
};
