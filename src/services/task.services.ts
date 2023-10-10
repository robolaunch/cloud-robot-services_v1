import axios from "axios";
import rlClient from "../clients/dbRobolaunchClient";
import setResponse from "../helper/setResponse";
import { Request, Response } from "express";
import env from "../providers/environmentProvider";

async function get(req: Request, res: Response) {
  try {
    const { rows: data } = await rlClient.query("SELECT * FROM tasks");
    setResponse(res, 200, "Data query successful", data);
  } catch (error) {
    setResponse(res, 500, "Data query failed", error);
  }
}

async function post(req: Request, res: Response) {
  try {
    await axios.post(`http://127.0.0.1:${env.robot.port}/task`, {
      task_id: req.body.task_id,
      task_name: req.body.task_name,
      task_json: req.body.task_json,
    });

    await rlClient.query(
      "INSERT INTO tasks (task_id, task_name, task_json) VALUES ($1, $2, $3)",
      [req.body.task_id, req.body.task_name, req.body.task_json]
    );
    setResponse(res, 200, "Data added successfully");
  } catch (error) {
    setResponse(res, 500, "Data add failed", error);
  }
}

async function put(req: Request, res: Response) {
  try {
    await axios
      .put(`http://127.0.0.1:${env.robot.port}/task/${req.params.id}`, {
        task_name: req.body.task_name,
        task_json: req.body.task_json,
      })
      .then(async () => {
        await rlClient.query(
          "UPDATE tasks SET task_name = $1, task_json = $2 WHERE task_id = $3",
          [req.body.task_name, req.body.task_json, req.params.task_id]
        );
        setResponse(res, 200, "Data update successfully");
      });
  } catch (error) {
    setResponse(res, 500, "Data update failed", error);
  }
}

async function remove(req: Request, res: Response) {
  try {
    await axios
      .delete(`http://127.0.0.1:${env.robot.port}/task/${req.params.id}`)
      .then(async () => {
        await rlClient.query("DELETE FROM tasks WHERE task_id = $1", [
          req.params.task_id,
        ]);
        setResponse(res, 200, "Data delete successfully");
      });
  } catch (error) {
    setResponse(res, 500, "Data delete failed", error);
  }
}

export default {
  get,
  post,
  put,
  remove,
};
