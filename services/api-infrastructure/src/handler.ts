import { S3Controller } from './s3.controller';
import { ApiHandler } from '../api.types';

const controller: S3Controller = new S3Controller();

export const s3Put: ApiHandler = controller.s3Put;
