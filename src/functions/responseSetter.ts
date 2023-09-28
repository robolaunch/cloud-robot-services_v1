import { Response } from "express";

export default function responseSetter(
  response: any,
  status: number,
  message: string,
  data: any
) {
  response.status(status).json({
    success: status < 300 ? true : false,
    message: message,
    data: data,
  });
}
