import Credentials from "./types/Credentials";
import Registration from "./types/Registration";
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

export async function registration(regData: Registration): Promise<User> {
  const res = await fetch("/api/auth/registration", {
    method: "POST",
    body: JSON.stringify(regData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}

export async function checkUser(): Promise<
  { isLoggedIn: true; user: User } | { isLoggedIn: false }
> {
  return (await fetch("/api/auth/user")).json();
}
export default logInUser;
