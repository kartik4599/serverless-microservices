import { UserService } from "app/services/user-service";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import middy from "@middy/core";
import bodyParser from "@middy/http-json-body-parser";

const userService = new UserService();

export const signup = middy((event: APIGatewayProxyEventV2) =>
  userService.createUser(event)
).use(bodyParser());

export const login = async (event: APIGatewayProxyEventV2) => {
  return userService.userLogin(event);
};

export const verify = async (event: APIGatewayProxyEventV2) => {
  return userService.userVerify(event);
};

export const profile = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  switch (httpMethod) {
    case "get":
      return userService.getUserProfile(event);
    case "put":
      return userService.updateUserProfile(event);
    case "delete":
      return userService.deleteUserProfile(event);
    default:
      return "Method not allowed";
  }
};

export const cart = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  switch (httpMethod) {
    case "get":
      return userService.getCart(event);
    case "put":
      return userService.updateCart(event);
    case "post":
      return userService.createCart(event);
    default:
      return "Method not allowed";
  }
};

export const payment = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  switch (httpMethod) {
    case "get":
      return userService.getPayment(event);
    case "put":
      return userService.updatePayment(event);
    case "post":
      return userService.createPayment(event);
    default:
      return "Method not allowed";
  }
};
