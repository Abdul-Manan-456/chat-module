import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [inboxId, setInboxId] = useState(null);
  const [name, setName] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [chat, setChat] = useState([]);
  const [receiverImage, setReceiverImage] = useState(null);
  const [typing, setTyping] = useState(" ");
  const [updateChat, setUpdateChat] = useState([]);
  const [disconnect, setDisconnect] = useState(null);
  const [isRead, setIsRead] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");
  const [message, setMessage] = useState([]);
  const [status, setStatus] = useState(null);
  const [audio, setAudio] = useState([]);
  const [groupName, setGroupName] = useState([])
const [groupChat, setGroupChat] = useState([])
const [addMember, setAddMember] = useState([])





  return (
    <ChatContext.Provider
      value={{
        inboxId,
        setInboxId,
        name,
        setName,
        idUser,
        setIdUser,
        chat,
        setChat,
        receiverImage,
        setReceiverImage,
        typing,
        setTyping,
        updateChat,
        setUpdateChat,
        disconnect,
        setDisconnect,
        isRead,
        setIsRead,
        updateMessage,
        setUpdateMessage,
        message,
        setMessage,
        status,
        setStatus,
        audio, setAudio ,
        groupName, setGroupName ,
        groupChat, setGroupChat ,
        addMember, setAddMember
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
