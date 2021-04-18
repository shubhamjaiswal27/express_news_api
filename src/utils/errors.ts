export class HttpException extends Error {
  public status: number = 500;

  public message: string = "Internal Server Error";

  constructor(status: number = 500, message: string = "Internal Server Error") {
    super(message);

    this.status = status;
    this.message = message;
  }
}
