import { sequelize } from "@/database";
import { User } from "@/models";
import { Repository } from "sequelize-typescript";
import { UserCreate, UserUpdate, UserQuery, GetUserParams, IUser } from "./user.types";
import { FindOptions, Op, WhereOptions } from "sequelize";
import { IPageData } from "@src/shared";
import { IResult, Result } from "../result";
import { Pagination } from "../pagination";
import { genSalt, hash } from "bcryptjs";

export class UserRepository extends Pagination {
  private _userRepo: Repository<User>;
  private returningFields = [
    "id",
    "firstName",
    "lastName",
    "email",
    "role",
    "updatedAt",
    "createdAt",
  ];
  constructor() {
    super();
    this._userRepo = sequelize.getRepository(User);
  }

  async getUsers(queryParams: UserQuery = {}): Promise<IResult<IPageData<IUser[]>>> {
    const { name, startingAfter, endingBefore } = queryParams;

    const { limit, offset, navigationDirection } = this.getCursorBasedPaginationQuery({
      startingAfter,
      endingBefore,
    });

    // Dynamically create the "where" conditions
    const whereConditions: WhereOptions = {
      ...(name && { firstName: { [Op.like]: `%${name}%` } }),
      ...(name && { lastName: { [Op.like]: `%${name}%` } }),
    };

    try {
      const users = (await this._userRepo.findAll({
        where: whereConditions,
        limit,
        offset,
        order: [
          [
            "createdAt",
            navigationDirection === "forward" || navigationDirection === "none" ? "DESC" : "ASC",
          ],
        ],
        attributes: this.returningFields,
      })) as IUser[];

      const data = await this.getPaginationData(users, navigationDirection);

      return Result.Ok(data);
    } catch (error) {
      return Result.ServerError("An error occurred while fetching products");
    }
  }

  async getUserBy({ by, value, includePssword }: GetUserParams): Promise<IResult<IUser>> {
    let user: IUser | null;

    if (includePssword) this.returningFields.push("password");

    try {
      switch (by) {
        case "id":
          user = (await this.getUserByCondition({
            where: { id: value },
            attributes: this.returningFields,
          })) as IUser;
          break;

        case "email":
          user = (await this.getUserByCondition({
            where: { email: value },
            attributes: this.returningFields,
          })) as IUser;
          break;

        default:
          return Result.BadRequest("User was not found");
      }

      return user ? Result.Ok(user) : Result.NotFound("User was not found");
    } catch (error) {
      return Result.ServerError("An error occurred while fetching user");
    }
  }

  async addUser(userData: UserCreate): Promise<IResult<IUser>> {
    try {
      const userExists = await this.getUserByCondition({
        where: { email: { [Op.iLike]: userData.email } },
        attributes: ["id"],
      });

      if (userExists) return Result.BadRequest("User with email already exists");

      const passwordSalt = await genSalt(12);

      const passwordHash = await hash(userData.password, passwordSalt);

      const { id, createdAt, updatedAt, email, firstName, lastName, role } =
        await this._userRepo.create(
          {
            ...userData,
            password: passwordHash,
          },
          { returning: ["id", "firstName", "lastName", "email", "role", "updatedAt", "createdAt"] }
        );

      const user: IUser = {
        id,
        email,
        firstName,
        lastName,
        updatedAt,
        createdAt,
        role: role as "User" | "Admin",
      };

      return Result.Created(user);
    } catch (error) {
      return Result.ServerError("An error occurred while creating user");
    }
  }

  async updateUser(userId: number, userData: UserUpdate): Promise<IResult<User>> {
    try {
      const userExists = await this.getUserByCondition({
        where: { id: userId },
        attributes: ["id", "role"],
      });

      if (!userExists) return Result.NotFound("User was not found");

      if (userData.role && userExists.role === "User")
        return Result.Forbidden("Request is forbidden");

      await this._userRepo.update({ ...userData }, { where: { id: userId } });

      return Result.Updated("Product updated");
    } catch (error) {
      return Result.ServerError("An error occurred while updating user");
    }
  }

  async deleteUser(userId: number) {
    try {
      const userExists = await this._userRepo.findOne({
        where: { id: userId, attributes: ["id"] },
      });

      if (!userExists) return Result.NotFound("User was not found");

      await this._userRepo.destroy({ where: { id: userExists } });

      return Result.Ok();
    } catch (error) {
      return Result.ServerError("An error occurred while deleting product");
    }
  }

  private async getUserByCondition(condition: FindOptions): Promise<User | null> {
    try {
      const user = await this._userRepo.findOne(condition);

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserRepository();
