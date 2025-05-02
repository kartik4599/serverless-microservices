import { APIGatewayProxyResultV2 } from "aws-lambda";

const formatResponse = (
  statusCode: number,
  message: string,
  data: unknown
): APIGatewayProxyResultV2 => {
  if (data) {
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message,
        data,
      }),
    };
  }
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      message,
    }),
  };
};

export const SuccessResponse = (data: unknown) => {
  return formatResponse(200, "Success", data);
};

export const ErrorResponse = (code = 1000, error: unknown) => {
  if (Array.isArray(error)) {
    const errorObject = error[0].constraints;
    const message = errorObject[Object.keys(errorObject)[0]] || "Error Occured";
    return formatResponse(code, message, message);
  }

  return formatResponse(code, error.toString(), error);
};
