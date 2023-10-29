import React from "react";
import Message from "./Message";
import { useChat } from "../context/chatContext";

const Messages = () => {
  const { inboxId } = useChat();

  return (
    <>

      {inboxId === null ? (
        <>
          <div className="messages-part-0 ">
            <div className="change">
              <span className="material-symbols-outlined ">chat</span>
              <h2>LammaChat for Windows</h2>
              <p style={{ fontSize: "15px" }}>
                Send and receive messages without keeping your phone online
              </p>
              <p style={{ fontSize: "15px" }}>
                Use LammaChat on up to 4 linked devices and 1 phone at the same
                time
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="messages ">
            <Message />
          </div>
        </>
      )}
    </>
  );
};

export default Messages;
