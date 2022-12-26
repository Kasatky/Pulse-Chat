import Credentials from "./types/Credentials";
import User from "./types/User";

async function logInUser(credentials: Credentials): Promise<User> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = await response.json();

  return user;
}

export async function checkUser(): Promise<
  { isLoggedIn: true; user: User } | { isLoggedIn: false }
> {
  return (await fetch("/api/auth/user")).json();
}
export default logInUser;
