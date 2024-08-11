import { getSession } from "@auth0/nextjs-auth0";
export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  console.log(user);
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Homepage</h1>
    </section>
  );
}
