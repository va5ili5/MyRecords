import { EncryptionOptions } from 'typeorm-encrypted';
import * as dotenv from 'dotenv';
dotenv.config();
export const MyEncryptionTransformerConfig: EncryptionOptions = {
  key: process.env.ENCRYPTION_KEY || 'publickey',
  algorithm: 'aes-256-cbc',
  ivLength: 16,
};
