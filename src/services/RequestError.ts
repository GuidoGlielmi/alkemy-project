export interface IRequestError {
  status: number;
  message: string;
}

export default class RequestError implements IRequestError {
  status: number;

  message: string;

  constructor({status, message}) {
    this.status = status;
    this.message = message;
  }
}
