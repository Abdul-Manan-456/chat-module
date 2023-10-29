import React, { useState, useEffect } from "react";
import { getToken } from "./localstorage";
import { useChat } from "../context/chatContext";

const Chats = () => {
  const [inbox, setInbox] = useState([]);
  const { userId, token } = getToken();
  const {
    setInboxId,
    setIdUser,
    setName,
    setReceiverImage,
    typing,
    inboxId,
    setUpdateMessage,
    setGroupChat
  } = useChat();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.18.113:3000/api/v1/inbox",
          {
            headers: {
              token: `${token}`,
            },
          }
        );

        const data = await response.json();
        setInbox(data.result);
        setGroupChat(data.result)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [inboxId]);

  const handleChatClick = async (data) => {
    setInboxId(data._id);
    if (userId === data.senderId._id) {
      setIdUser(data.receiverId[0]._id);
      setName(data.receiverId[0].name);
      setReceiverImage(data.receiverId[0].image);
      setUpdateMessage(data.lastMessage);
    } else {
      setIdUser(data.senderId._id);
      setName(data.senderId.name);
      setReceiverImage(data.senderId.image);
      setUpdateMessage(data.lastMessage);
    }
  };

  return (
    <>

      {inbox?.map((data, key) => (
        <div key={key}>
          {data.type === "one-on-one" ? (
               
            <>
              <div
                className="chats"
                key={key}
                onClick={() => handleChatClick(data)}
              >
                <div >
                <div className="userChat" style={{backgroundColor : 'red'}}>
                  {userId === data.senderId._id ? (
                    <img src={data.receiverId[0].image} alt="" />
                  ) : (
                    <img src={data.senderId.image} alt="" />
                  )}
                  <div className="userChatInfo">
                    <span>
                      {userId === data.senderId._id
                        ? data.receiverId[0].name
                        : data.senderId.name}
                    </span>
                    {typing == " " ? (
                      <>
                        {" "}
                        <p>{data.lastMessage}</p>
                      </>
                    ) : (
                      <p style={{ color: "#DDDDF7" }}>{typing}</p>
                    )}
                  </div>
                </div>
            </div>

              </div>
           
            </>

          ) : (
            <>
       
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default Chats;

// { data.unreadMessageCount > 0 ? (
//   <>

//     {inboxId === data.senderId._id ? (
//       <span style={{ backgroundColor: "red" }}>
//         {data.unreadMessageCount}
//       </span>
//     ) : (
//       <></>
//     )}
//   </>
// ) : (
//   <></>
// )}

// try {
//     const response = await fetch(
//       `http://192.168.18.113:3000/api/v1/chat/mark-as-read/${data._id}`,
//       {
//         method: "POST",
//         headers: {
//           token: `${token}`,
//         },
//       }
//     );
//     const res = await response.json();
//     setIsRead(res.result.acknowledged)
//   } catch (error) {
//     console.error("Error marking messages as read:", error);
//   }
