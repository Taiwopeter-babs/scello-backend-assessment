import userRepository, { UserRepository } from "./user.repository";
import { UserCreate, UserQuery, UserUpdate } from "./user.types";

export class UserService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async getUsers(queryParams: UserQuery) {
    const usersData = await this._userRepository.getUsers(queryParams);

    return usersData;
  }

  async getUser(id: number) {
    const userData = await this._userRepository.getUserBy({ by: "id", value: id });

    return userData;
  }

  async getUserByEmail(email: string) {
    const userData = await this._userRepository.getUserBy({ by: "email", value: email });

    return userData;
  }

  async deleteUser(id: number) {
    const response = await this._userRepository.deleteUser(id);

    return response;
  }

  async updateUser(id: number, data: UserUpdate) {
    const response = await this._userRepository.updateUser(id, data);

    return response;
  }

  async addUser(data: UserCreate) {
    const userData = await this._userRepository.addUser(data);

    return userData;
  }
}

export default new UserService(userRepository);
