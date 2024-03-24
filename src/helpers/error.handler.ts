import EntityNotFound from '../errors/EntityNotFound';
import { UniqueConstraintError } from 'sequelize';

type CustomError = {
  code: number;
  status: string;
  message: string;
  errors?: string;
}

export default function errorHandler(err: unknown): CustomError {
  if (err instanceof EntityNotFound) {
    return { 
      code: err.errorCode,
      status: err.status,
      message: err.message
    };
  }

  if (err instanceof UniqueConstraintError) {
    return {
      code: 500,
      status: 'Internal server error!',
      message: `The ${err.errors[0].path} should be unique!`
    };
  }

  return {
    code: 500,
    status: 'Internal server error!',
    message: 'An unexpected error occurred!',
    errors: `${err}`
  };
}
