import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userRepository, { UserRepository } from "../users/user.repository";
import { CONFIG } from "@src/utils/config";
import { compare } from "bcryptjs";

class PassportService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  /**
   * Initializes Passport JWT strategy for token verification
   */
  jwtStrategy() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CONFIG.jwtSecret,
    };

    return new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const { data: user } = await this._userRepository.getUserBy({
          by: "id",
          value: jwtPayload.id,
        });

        if (!user) {
          return done(null, false, { error: "User not found" });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    });
  }

  /**
   * Initializes Passport Local strategy for user login
   */
  localStrategy() {
    return new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const { data: user } = await this._userRepository.getUserBy({
            by: "email",
            value: email,
            includePssword: true,
          });

          if (!user) {
            return done(null, false, { message: "Invalid credentials" });
          }

          // Assuming password is hashed, compare using bcrypt
          const isPasswordValid = await compare(password, user.password!);

          if (!isPasswordValid) {
            return done(null, false, { message: "Invalid credentials" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    );
  }
}

export const passportService = new PassportService(userRepository);
