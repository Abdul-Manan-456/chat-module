import React from "react";
import { useChat } from "../context/chatContext";

function AllGroups() {
  const { groupChat } = useChat();
  return (
    <>
    <div style={{
  maxHeight: '300px', 
  overflow: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: '#A7BCFF #DFE9EB',
}}>
      {groupChat?.map((data, key) => (
        <div key={key} >
          {data.type === "group" ? (
            <>

              <div className="chats " key={key}>

                <div className="userChat ">

                  <img src={data.GroupId.image} alt="" />

                  <div className="userChatInfo">
                    <span>
                      <>{data.GroupId.name}</>
                    </span>

                    <p>{data.GroupId.messages}</p>
                   

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
        </div>

    </>
  );
}

export default AllGroups;