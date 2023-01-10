import User from '../../auth/types/User';

export default async function addFriend(id: number): Promise<User> {
  const response = await fetch('/api/friends/add', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const addedFriend = await response.json();
  return addedFriend;
}

export async function loadFriends(id: number): Promise<User[]> {
  const response = await fetch('/api/friends', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const friends = await response.json();

  return friends;
}
