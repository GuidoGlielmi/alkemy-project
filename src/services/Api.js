import ApiConfig from './ApiConfig';
import RequestError from './RequestError';
/*
A module is a piece of code that is executed once it is loaded. It means that if a module is not included in the main bundle, it will not be evaluated
Modules are singletons. If a module is imported multiple times, only a single instance of it exists and it is evaluated only once at load
*/

const methodsNames = ['GET', 'POST', 'PATCH', 'DELETE'];

class Requests {
  #api;

  constructor(apiConfig) {
    this.#api = apiConfig;
    methodsNames.forEach((methodName) => {
      // Requests.prototype === this.__proto__
      Requests.prototype[methodName.toLowerCase()] = async (url, body) =>
        this.#makeRequest(url, body, methodName);
    });
  }

  async #makeRequest(url, body, method) {
    let rawRes;
    try {
      rawRes = await fetch(`${this.#api.baseUrl}${url}`, {
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
    const res = await rawRes.json();
    if (res?.[this.#api.status] < 200 || res?.[this.#api.status] >= 300) {
      throw new RequestError({
        status: res?.[this.#api.status],
        message: res?.[this.#api.message],
      });
    }
    return res?.[this.#api.data];
  }
}

const apiConfig = new ApiConfig('https://goscrum-api.alkemy.org', {
  status: 'status_code',
  message: 'message',
  data: 'result',
});

export default new Requests(apiConfig);
