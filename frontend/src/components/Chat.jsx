import React from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useChat } from "../context/chatContext";
const Chat = () => {
  const { name, receiverImage, typing, status } = useChat();
  return (
    <div className="chat">
      {receiverImage === null ? (
        <>
          <div
            className="chatInfo"
            style={{ backgroundColor: "#DDDDF7" }}
          ></div>
        </>
      ) : (
        <>
          <div className="chatInfo">
            <img src={receiverImage} alt="" className="image" />

            <span style={{ marginRight: "18rem" }}>
              {name}
              {typing == " " ? (
                <>
                  {status === null ? (
                    <p>Checking status...</p>
                  ) : status === true ? (
                    <p>online</p>
                  ) : (
                    <p>offline</p>
                  )}
                </>
              ) : (
                <p>{typing}</p>
              )}
            </span>
            <br />

            <div className="navbar">
              <span className="logo">Lama Chat</span>
            </div>

            <div className="chatIcons">
              <img src={Cam} alt="" />
              <img src={Add} alt="" />
              <img src={More} alt="" />
            </div>
          </div>
        </>
      )}

      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
