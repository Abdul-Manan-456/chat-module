import React, { useState } from "react";

import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useChat } from "../context/chatContext";
import { getToken } from "./localstorage";
import io from "socket.io-client";
import Voice from "./voice";
const Input = () => {
  const socket = io("http://192.168.18.113:3002");
  const { inboxId, setInboxId, idUser, setChat } = useChat();
  const { userId, token } = getToken();
  const [newMessage, setNewMessage] = useState("");
  const addChat = async () => {
    try {
      let currentInboxId = inboxId;
      if (!currentInboxId) {
        const response = await fetch(
          `http://192.168.18.113:3000/api/v1/inbox/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify({
              receiverId: idUser,
              lastMessage: " ",
            }),
          }
        );

        if (response.ok) {
          const inboxData = await response.json();
          currentInboxId = inboxData.result._id;
          setInboxId(currentInboxId);
        } else {
          throw new Error("Failed to create a new inbox");
        }
      }

      const formData = new FormData();
      formData.append("inboxId", currentInboxId);
      formData.append("message", newMessage);
      formData.append("sender", userId);
      formData.append("receiver", idUser);
      const response = await fetch(
        `http://192.168.18.113:3000/api/v1/chat/messages`,
        {
          method: "POST",
          headers: {
            token: token,
          },
          body: formData,
        }
      );
      const res = await response.json();
      setInboxId(res.data.inboxId);
      setChat(res.data);
      setNewMessage("");

      socket.emit("sendTyping", {
        userId: idUser,
        typing: false,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const inputHandler = (e) => {
    const typedText = e.target.value;
    setNewMessage(typedText);
    const isTyping = typedText.trim() !== "";
    socket.emit("sendTyping", {
      userId: idUser,
      typing: isTyping,
    });
  };

  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => inputHandler(e)}
        
        />

        <div className="send">
          <img src={Attach} alt="" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            // onChange={handleFileChange}
          />

          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>

          <button onClick={addChat}>Send</button>
<Voice />

        </div>
      </div>
    </>
  );
};

export default Input;
