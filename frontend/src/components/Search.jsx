import React, { useState } from "react";
import { useChat } from "../context/chatContext";
import { getToken } from "../components/localstorage";
import { Link } from "react-router-dom";

const Search = () => {
  const { token } = getToken();
  const {setIdUser , setName , setReceiverImage  , setMessage , setInboxId} =useChat();

  const [searchQuery, setSearchQuery] = useState("");
  const [inboxData, setInboxData] = useState();


  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://192.168.18.113:3000/api/v1/auth/search?query=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setInboxData(data);
    
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value === "") {
      setInboxData([]);
    } else {
      handleSearch();
    }
  };

  function startChat(data) {
    setSearchQuery("");
    setIdUser(data._id)
    setName(data.name);
    setReceiverImage(data.image);
    setMessage([])
    setInboxId(null)
  }

  return (
  <>


    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      {searchQuery === "" ? (
        <></>
      ) : (
        <>
          {inboxData &&
            inboxData.map((data) => (
              <div
                className="userChat"
                key={data._id}
                onClick={() => startChat(data)}
              >
                <img src={data.image} alt="" />
                <div className="userChatInfo">
                  <span>{data.name}</span>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
    </>
  );
};

export default Search;
