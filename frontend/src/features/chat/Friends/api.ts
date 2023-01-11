import Chat from './types/Chat';

export default async function addFriend(id: number): Promise<Chat> {
  const response = await fetch('/api/friends/add', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const addedChat = await response.json();
  return addedChat;
}

export async function loadFriends(): Promise<Chat[]> {
  const response = await fetch('/api/friends', {
    method: 'POST',
  });

  const friends = await response.json();

  return friends;
}
