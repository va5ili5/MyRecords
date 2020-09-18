import { Request, Response } from 'express';
import { User } from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

export const getUserById = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId = request.params.id;
  const user = await getRepository(User).findOne(userId);
  return response.status(200).json(user);
};

export const loginUser = async (request: Request, response: Response) => {
  const user = await getRepository(User).findOne({
    where: { email: request.body.email },
  });
  if (!user) {
    return response.status(401).json({
      message: 'Authentication failed 1',
    });
  }
  return bcrypt
    .compare(request.body.password, user.password)
    .then((result) => {
      if (!result) {
        return response.status(401).json({
          message: 'Authentication failed 2',
        });
      }
      const token = jwt.sign({ email: user.email, userId: user.id }, 'secret', {
        expiresIn: '1h',
      });
      response.status(200).json({ token: token });
    })
    .catch((error) => {
      if (error) {
        return response.status(401).json({
          message: error,
        });
      }
    });
};

export const signUpUser = async (request: Request, response: Response) => {
  bcrypt.hash(request.body.password, 10).then((hash) => {
    getRepository(User)
      .save({
        email: request.body.email,
        password: hash,
        username: request.body.username,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
      })
      .then((user) => {
        response.status(201).json({ message: 'User Created', user: user });
      })
      .catch((error) => {
        response.status(500).json({
          error: error,
        });
      });
  });

  //return response.status(201).json(user);
};
