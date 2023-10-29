import React, { useEffect } from "react";
import { useChat } from "../context/chatContext";
import { getToken } from "./localstorage";
const Message = () => {
  const { inboxId, message, setMessage, audio } = useChat();
  const { userId, token } = getToken();

  useEffect(() => {
    const getAllMessage = async () => {
      try {
        const response = await fetch(
          `http://192.168.18.113:3000/api/v1/chat/${inboxId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: `${token}`,
            },
          }
        );

        const data = await response.json();
        setMessage(data.result);
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }
    };
    getAllMessage();
  }, [inboxId]);

  return (
    <>
      {message?.map((data , index) => (
        <div key={index}>
          {userId == data.sender._id ? (
            <>
              <div className="data">
                <div className="message-container" >
                  <p className="new">{data.message}</p>
                  <img
                    src={data.sender.image}
                    alt="Sender Image"
                    className="image"
                  />
                  <span></span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="message">
                <div className="messageInfo">
                  <img src={data.sender.image} alt="Receiver Image" />
                </div>
                <div className="messageContent">
                  <p>{data.message}</p>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
      {audio?.map((audioUrl, index) => (
        <div key={index}>
          <audio src={audioUrl} controls />
        </div>
      ))}
    </>
  );
};

export default Message;
