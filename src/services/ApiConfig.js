export default class ApiConfig {
  constructor(baseUrl, {status, message, data}) {
    this.baseUrl = baseUrl;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
