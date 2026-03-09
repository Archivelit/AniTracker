import type { ReactNode } from "react";

export default async function Home(): Promise<ReactNode> {
  // const response = await api.get<User>(
  //   "/users",
  //   { params: { email: "example@domain.com" } }
  // );

  // const user = response.data;

  return (
    <div>
      <h1>AniTracker</h1>
    </div>
  );
}
