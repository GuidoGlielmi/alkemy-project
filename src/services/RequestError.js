export default class RequestError {
  constructor({status, message}) {
    this.status = status;
    this.message = message;
  }
}
