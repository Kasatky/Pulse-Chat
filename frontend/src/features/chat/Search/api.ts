import User from '../../auth/types/User';

export default async function searchUsers(username: string): Promise<User[]> {
  const response = await fetch('/api/search', {
    method: 'POST',
    body: JSON.stringify({ username }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const foundUsers = await response.json();
  return foundUsers;
}
