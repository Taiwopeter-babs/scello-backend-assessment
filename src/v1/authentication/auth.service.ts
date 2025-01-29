import userRepository, { UserRepository } from "../users/user.repository";
import jwt from "jsonwebtoken";
import { IResult, Result } from "../result";

export class AuthService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  /**
   * Generates a JWT token for a given user.
   */
  async generateToken(userId: number): Promise<IResult<{ token: string }>> {
    const { data: user } = await this._userRepository.getUserBy({ by: "id", value: userId });

    if (!user) return Result.NotFound("User not found");

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    return Result.Ok({ token });
  }

  /**
   * Generates a JWT token for a given user.
   */
  async getUserRole(userId: number): Promise<IResult<{ role: string }>> {
    const { data: user } = await this._userRepository.getUserBy({ by: "id", value: userId });

    if (!user) return Result.NotFound("User not found");

    return Result.Ok({ role: user.role });
  }
}

export default new AuthService(userRepository);
