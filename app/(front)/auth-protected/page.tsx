/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

const AuthProtectedProfile: NextPage = withPageAuthRequired(
  async () => {
    const session = await getSession();
    const user: any = session?.user;
    return (
      <section className="flex flex-col justify-center items-center">
        <div>
          <img src={user.picture!} alt={user.name!} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>{" "}
      </section>
    );
  },
  { returnTo: "/auth-protected" }
);

export default AuthProtectedProfile;
