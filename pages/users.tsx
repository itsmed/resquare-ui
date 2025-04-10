import dbConnect from "@/dbConnect";
import User, { Users } from "../models/User";
import { GetServerSideProps } from "next";

type Props = {
  users: Users[];
}

const UsersPage = ({ users }: Props) => {
  return (
    <>
      <h1>Users</h1>
      {
        users.map((user) => {
          console.log(user)
          return (
            <div key={user._id}>
              <span>{user.userName}</span>
            </div>
          )
        })
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await dbConnect();

  const result = await User.find({});
  const users = result.map(doc => {
    const user = JSON.parse(JSON.stringify(doc));
    return user;
  });
  return { props: { users: users }};
}

export default UsersPage;
