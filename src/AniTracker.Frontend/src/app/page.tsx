import User from "@/Models/user";
import { api } from "@/utils/Api";
import type { ReactNode } from "react";

export default async function Home(): Promise<ReactNode> {
  const response = await api.get<User>(
    "/users",
    { params: { email: "example@domain.com" } }
  );

  const user = response.data;

  return (
    <div>
      <div>
        <h1>Hello, {user.username}!</h1>
      </div>
    </div>
  );
}
