import { ApplicationError } from '@/protocols';

export function hotelsError(): ApplicationError {
  return {
    name: 'CannotFindHotelsError',
    message: 'Hotels not found!',
  };
}
