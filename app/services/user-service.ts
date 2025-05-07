import { ProfileInput } from "app/models/dto/address-input";
import { LoginInput } from "app/models/dto/login-model";
import { SignupInput } from "app/models/dto/sign-up";
import { VerificationInput } from "app/models/dto/verification-input-model";
import { UserRepository } from "app/repository/user-repository";
import { TimeDifference } from "app/utility/date-helper";
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
    await this.repository.updateVerificationCode(user.user_id, code, expire);

    // await sendVerificationCode(code, user.phone);
    return SuccessResponse({ message: "code sent" });
  }

  async userVerify(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const user = await verfiyToken(token);
    if (!user) return ErrorResponse(401, "Invalid token");

    const input = plainToClass(VerificationInput, event.body);
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(401, error);

    const { verification_code, expiry } = await this.repository.findAccount(
      user.email
    );

    if (verification_code !== input.code)
      return ErrorResponse(401, "wrong code");

    const currentDate = new Date();

    const difference = TimeDifference(expiry, currentDate.toISOString(), "m");
    if (difference <= 0) return ErrorResponse(401, "code expired");

    await this.repository.updateVerificationUser(user.user_id);

    return SuccessResponse({ message: "user verified" });
  }

  async getUserProfile(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const user = await verfiyToken(token);
    if (!user) return ErrorResponse(401, "Invalid token");

    const profile = await this.repository.getUserProfile(user.user_id);

    return SuccessResponse(profile);
  }

  async createUserProfile(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const user = await verfiyToken(token);
    if (!user) return ErrorResponse(401, "Invalid token");

    const input = plainToClass(ProfileInput, event.body);
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(401, error);

    const response = await this.repository.createProfile(user.user_id, input);

    return SuccessResponse(response);
  }

  async updateUserProfile(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const user = await verfiyToken(token);
    if (!user) return ErrorResponse(401, "Invalid token");

    const input = plainToClass(ProfileInput, event.body);
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(401, error);

    await this.repository.updateProfile(user.user_id, input);

    return SuccessResponse({ message: "user profile updated" });
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
