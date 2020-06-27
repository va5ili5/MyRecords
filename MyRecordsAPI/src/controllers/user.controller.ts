import { Request, Response } from 'express';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';

export const getUser = async (
  request: Request,
  response: Response
): Promise<Response> => {
  //const id: request.params.id;
  const user = await getRepository(User).findOne(request.params.id);
  return response.status(200).json(user);
};

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
