import { Request, Response } from "express";
import userService, { UserService } from "./user.service";
import { UserCreate, UserQuery, UserUpdate } from "./user.types";

export class UserController {
  private _userService: UserService;
  constructor(userService: UserService) {
    this._userService = userService;
  }

  getUsers = async (request: Request, response: Response) => {
    const queryParams = request.query as UserQuery;

    const { statusCode, error, data, success } = await this._userService.getUsers(queryParams);

    const dataToReturn = success ? data : { error };

    response.status(statusCode).json(dataToReturn);
  };

  getUser = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { statusCode, error, data, success } = await this._userService.getUser(Number(id));

    const dataToReturn = success ? data : { error };

    response.status(statusCode).json(dataToReturn);
  };

  deleteUser = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { statusCode, error, data, success } = await this._userService.deleteUser(Number(id));

    const dataToReturn = success ? data : { error };

    response.status(statusCode).json(dataToReturn);
  };

  updateUser = async (request: Request, response: Response) => {
    const { id } = request.params;
    const dataForUpdate = request.body as UserUpdate;

    const { statusCode, error, success, message } = await this._userService.updateUser(
      Number(id),
      dataForUpdate
    );

    const dataToReturn = success ? { message } : { error };

    response.status(statusCode).json({ dataToReturn });
  };

  addUser = async (request: Request, response: Response) => {
    const dataToCreate = request.body as UserCreate;

    const { statusCode, error, data, success } = await this._userService.addUser(dataToCreate);

    const dataToReturn = success ? data : { error };

    response.status(statusCode).json(dataToReturn);
  };
}

export default new UserController(userService);
