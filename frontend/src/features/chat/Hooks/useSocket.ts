import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useAppDispatch } from "../../../store";
import { recieveInvite, recieveMessage } from "../Friends/FriendsSlice";
import Chat from "../Friends/types/Chat";
import selectCurrentUser from "../selectors";
import Message from "../types/Message";
import UseSocketResult from "./types/UseSocketResult";

const socket = io(window.location.origin, {
  withCredentials: true,
  autoConnect: false,
});

export default function useSocket(
  chatId?: number | undefined
): UseSocketResult {
  const user = useSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  const [text, setText] = useState("");

  const sendMessage = async (event: React.FormEvent, file: any): Promise<void> => {
    event.preventDefault();

    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload/MsgImg', {
        method: 'POST',
        body: formData
      })
      const imageUrl = await res.json()
      socket.emit("/messages/send", JSON.stringify({ text, chatId, imageLink: imageUrl }));
    } else socket.emit("/messages/send", JSON.stringify({ text, chatId }));
    setText("");
    // setFile("")
  };

  const getSocketId = (): string => socket.id;

  useEffect(() => {
    if (user) {
      socket.connect();

      socket.on("/messages/recieve", (data: Message) => {
        dispatch(recieveMessage(data));
      });

      socket.on("/users/recieveInvite", (data: Chat) => {
        dispatch(recieveInvite(data));
      });

      return () => {
        // Уточнить у Артемия
        socket.disconnect();
        socket.emit("/messages/disconnect");
      };
    }
  }, [dispatch, user]);

  return { user, sendMessage, text, setText, socket, getSocketId };
}
