import { UserService } from "app/services/user-service";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import middy from "@middy/core";
import bodyParser from "@middy/http-json-body-parser";

const userService = new UserService();

export const signup = middy((event: APIGatewayProxyEventV2) =>
  userService.createUser(event)
).use(bodyParser());

export const login = middy((event: APIGatewayProxyEventV2) => {
  return userService.userLogin(event);
}).use(bodyParser());

export const verify = middy((event: APIGatewayProxyEventV2) => {
  return userService.getVerficationToken(event);
});

export const userVerify = middy((event: APIGatewayProxyEventV2) => {
  return userService.userVerify(event);
}).use(bodyParser());

export const getProfile = middy((event: APIGatewayProxyEventV2) => {
  return userService.getUserProfile(event);
});

export const profile = middy((event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();

  switch (httpMethod) {
    case "put":
      return userService.updateUserProfile(event);
    case "post":
      return userService.createUserProfile(event);
    default:
      return "Method not allowed";
  }
}).use(bodyParser());

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
