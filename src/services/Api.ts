/* eslint-disable @typescript-eslint/no-throw-literal */
import RequestError from './RequestError';

interface Methods {
  get(url: string, body?: any): Promise<any>;
  post(url: string, body: any): Promise<any>;
  patch(url: string, body: any): Promise<any>;
  delete(url: string, body?: any): Promise<any>;
}

export default class Requests implements Methods {
  #baseUrl: string;

  constructor(baseUrl: string) {
    this.#baseUrl = baseUrl;
  }

  async get(url: string, body?: any): Promise<any> {
    return this.#makeRequest({url, body, method: 'GET'});
  }

  async post(url: string, body: any): Promise<any> {
    return this.#makeRequest({url, body, method: 'POST'});
  }

  async patch(url: string, body: any): Promise<any> {
    return this.#makeRequest({url, body, method: 'PATCH'});
  }

  async delete(url: string, body?: any): Promise<any> {
    return this.#makeRequest({url, body, method: 'DELETE'});
  }

  async #makeRequest({url, body, method}: {url: string; body?: any; method: string}): Promise<any> {
    let rawRes: Response;
    console.log(`${this.#baseUrl}${url}`, method, body);
    try {
      rawRes = await fetch(`${this.#baseUrl}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        ...(body && {body: JSON.stringify(body)}),
      });
    } catch {
      console.log('No internet');
      throw new RequestError({status: null, message: 'No hay internet'});
    }
    return rawRes.json();
  }
}
