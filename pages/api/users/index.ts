import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/dbConnect";
import User from "../../../models/User";

export async function Get(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  console.log(req);
}
