import { Request, Response } from "express";
import setResponse from "../helper/setResponse";

async function get(req: Request, res: Response) {
  setResponse(
    res,
    200,
    "Cloud robot services is running. Please use the API endpoints to access data.",
    null
  );
}

export default {
  get,
};
