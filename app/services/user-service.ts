import { UserRepository } from "app/repository/user-repository";
import { SuccessResponse } from "app/utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserService {
  userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public createUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user created" });
  }

  public userLogin(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "user logined" });
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
