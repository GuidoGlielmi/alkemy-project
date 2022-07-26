export interface ApiData {
  status: string;
  message: string;
  data: string;
}

export default class ApiConfig {
  baseUrl: string;
  status: string;
  message: string;
  data: string;
  constructor(baseUrl: string, {status, message, data}: ApiData) {
    this.baseUrl = baseUrl;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
