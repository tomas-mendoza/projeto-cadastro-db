export default class EntityNotFound extends Error {
  public errorCode: number;

  constructor(message: string) {
    super(message);
    this.errorCode = 404;
  }
}
