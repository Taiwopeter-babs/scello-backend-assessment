import { NextFunction, Request, Response, Express } from "express";
import authService, { AuthService } from "./auth.service";
import { User } from "@/models";
import passport from "passport";
import { IUser } from "../users/user.types";

export class AuthController {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  /**
   * Middleware to enforce role-based access.
   */
  authorizeRole(authorizedRoles: string[]) {
    return async (request: Request, res: Response, next: NextFunction) => {
      if (!request.user) {
        res.status(403).json({ error: "Forbidden access" });
        return;
      }

      const currentUser = Object.assign<any, any>({}, request.user).dataValues;

      console.log(currentUser, "current USER");

      const {
        data: userRole,
        success,
        error,
        statusCode,
      } = await this._authService.getUserRole(currentUser.id);

      if (!userRole || !success) {
        res.status(statusCode).json({ error: error });
        return;
      }

      if (!authorizedRoles.includes(userRole.role)) {
        res.status(403).json({ error: "Forbidden access" });
        return;
      }

      next();
    };
  }

  login = (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate("local", { session: false }, async (err, user, info) => {
      if (err || !user) {
        return response.status(401).json({ message: info?.message || "Authentication failed" });
      }

      const { data: token } = await this._authService.generateToken(user.id);

      response.status(200).json({ message: "Login successful", token: token?.token });
    })(request, response, next);
  };
}

export default new AuthController(authService);
