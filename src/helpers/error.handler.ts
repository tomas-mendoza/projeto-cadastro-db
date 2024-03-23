import EntityNotFound from "../errors/EntityNotFound";

export default function errorHandler(err: unknown): never {
  if (err instanceof EntityNotFound) {
    throw new EntityNotFound(`${err}`);
  }

  throw new Error(`${err}`);
}
