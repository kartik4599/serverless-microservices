import { LoginInput } from "app/models/dto/login-model";
import { SignupInput } from "app/models/dto/sign-up";
import { UserRepository } from "app/repository/user-repository";
import { AppValidationError } from "app/utility/errors";
import {
  generateAccessCode,
  sendVerificationCode,
} from "app/utility/notification";
import {
  getHashPassword,
  getToken,
  validate,
  verfiyToken,
} from "app/utility/password";
import { ErrorResponse, SuccessResponse } from "app/utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { plainToClass } from "class-transformer";

export class UserService {
  repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  public async createUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(401, error);

      const hashedPassword = await getHashPassword(input.password);

      const newUser = await this.repository.createUser({
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        userType: "Seller",
      });

      return SuccessResponse(newUser);
    } catch (e) {
      return ErrorResponse(500, e);
    }
  }

  public async userLogin(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(LoginInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(401, error);

      const account = await this.repository.findAccount(input.email);

      const isValid = await validate(input.password, account.password);
      if (!isValid) return ErrorResponse(401, "Invalid password");

      const token = getToken(account);

      return SuccessResponse({ token });
    } catch (e) {
      return ErrorResponse(500, e);
    }
  }

  async getVerficationToken(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const user = await verfiyToken(token);
    if (!user) return ErrorResponse(401, "Invalid token");

    const { code, expire } = generateAccessCode();
    // save code and expire in db

    await sendVerificationCode(code, user.phone);
    return SuccessResponse({ message: "code sent" });
  }

  public userVerify(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user verified" });
  }

  public getUserProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user profile" });
  }

  public updateUserProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user profile" });
  }

  public deleteUserProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user profile" });
  }

  public getCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user profile" });
  }

  public updateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user profile" });
  }

  public createCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user profile" });
  }

  public getPayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user profile" });
  }

  public updatePayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user profile" });
  }

  public createPayment(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user profile" });
  }
}
