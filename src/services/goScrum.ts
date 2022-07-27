/* eslint-disable @typescript-eslint/no-throw-literal */
import Requests, {HttpReq} from './Api';
import RequestError from './RequestError';

export interface IGoScrum {
  status_code: number;
  message: string;
  result: any;
}
interface ILogin {
  token: string;
  user: IUser;
}
export interface IRegisterData {
  continente: Array<string>;
  region: Array<string>;
  Rol: Array<string>;
}
interface IRegistered {
  acknowledged: true;
  insertedId: string;
  user: IUser;
}
export interface IUser {
  _id?: string;
  userName: string;
  password?: string;
  email: string;
  teamID: string;
  Rol: string;
  continente: string;
  region: string;
  registered?: boolean;
}
export interface ITask {
  _id?: string;
  title: string;
  status: string;
  importance: string;
  createdAt?: string;
  modifiedAt?: string;
  deletedAt?: string;
  deleted?: string;
  teamId?: string;
  description: string;
  user?: IUsersTask;
}
export interface ITaskData {
  status: string[];
  importance: string[];
}
interface INewTask {
  acknowledged: true;
  insertedId: string;
  task: ITask;
}
interface IUsersTask {
  email: string;
  role: string;
  userName: string;
  teamId: string;
  userId: string;
  iat: number;
  exp: number;
}

class GoScrum {
  #fetch: Requests;

  constructor(request: Requests) {
    this.#fetch = request;
  }

  async #responseHandler({url, method, body}: HttpReq) {
    const res = (await this.#fetch.makeRequest({url, body, method})) as IGoScrum;
    if (res.status_code < 200 || res.status_code >= 300) {
      throw new RequestError({
        status: res.status_code,
        message: res.message,
      });
    }
    return res.result;
  }

  async login({userName, password}: {userName: string; password: string}): Promise<ILogin> {
    return this.#responseHandler({url: 'auth/login', method: 'post', body: {userName, password}});
  }

  async register(user: IUser): Promise<IRegistered> {
    return this.#responseHandler({url: 'auth/register', method: 'post', body: user});
  }

  async registerFormData(): Promise<IRegisterData> {
    return this.#responseHandler({url: 'auth/data'});
  }

  async getTaskData(): Promise<ITaskData> {
    return this.#responseHandler({url: 'task/data'});
  }

  async getMyTasks(): Promise<ITask[]> {
    return this.#responseHandler({url: 'task/me'});
  }

  async getAllTasks(): Promise<ITask[]> {
    return this.#responseHandler({url: 'task'});
  }

  async addTask(task: ITask): Promise<INewTask> {
    return this.#responseHandler({
      url: 'task',
      method: 'post',
      body: {task},
    });
  }

  async updateTask(task: ITask): Promise<IGoScrum> {
    return this.#responseHandler({url: `task/${task._id}`, method: 'patch', body: {task}});
  }

  async deleteTask(id: string): Promise<IGoScrum> {
    return this.#responseHandler({url: `task/${id}`, method: 'delete'});
  }
}

const request = new Requests('https://goscrum-api.alkemy.org/');

export default new GoScrum(request);
