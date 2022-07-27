/* eslint-disable @typescript-eslint/no-throw-literal */
import RequestError from './RequestError';

export interface HttpReq {
  url?: string;
  body?: any;
  method?: string;
}

export default class Requests {
  #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  async makeRequest({url = '', body, method = 'GET'}: HttpReq): Promise<any> {
    let rawRes: Response;
    try {
      rawRes = await fetch(`${this.#baseUrl}${url}`, {
        method: method.toUpperCase(),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        ...(body && {body: JSON.stringify(body)}),
      });
    } catch {
      console.log('No internet');
      throw new RequestError({status: null, message: 'No internet connection'});
    }
    try {
      return await rawRes.json();
    } catch {
      // response nody should never be empty
      throw new RequestError({status: null, message: 'Empty response body'});
    }
  }
}
