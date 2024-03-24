export default class EntityNotFound extends Error {
  public errorCode: number;
  public status: string;

  constructor(message: string) {
    super(message);
    this.status = 'Internal server error!';
    this.errorCode = 404;
  }
}
