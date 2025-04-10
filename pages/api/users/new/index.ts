
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/dbConnect";
import User from "@/User";

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const { userName, firstName, lastName, password, email, birthDate } = req.body;
  await dbConnect();

  const userNameFound = User.find({ userName });
  if (!!userNameFound) {
    return res.status(409).json({ message: "Username already exists"});
  }

  const emailFound = User.find({ email });
  if (!!emailFound) {
    return res.status(409).json({ message: "Email already in use"});
  }

  const now = new Date().toISOString();
  const user = new User({
    userName,
    firstName,
    lastName,
    password,
    email,
    birthDate,
    createdAt: now,
  });

  const resp = await user.save();
  console.log(resp);
  res.send(200);

}
