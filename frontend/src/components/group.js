import React, { useState, useEffect } from "react";
import { getToken } from "./localstorage";
import { useChat } from "../context/chatContext";
import { useNavigate } from "react-router-dom";
import Dot from "../img/dot.png";
import io from "socket.io-client";

const Group = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [memberColors, setMemberColors] = useState({});


  const { token } = getToken();
  const { setInboxId, addMember, setAddMember } = useChat();
  const socket = io("http://192.168.18.113:3002");


  const removeFromLocal = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.18.113:3000/api/v1/auth", {
          headers: {
            token: `${token}`,
          },
        });

        const data = await response.json();
        setData(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  function Member(member) {
    setMemberColors({ ...memberColors, [member._id]: "#3E3C61" });
      setAddMember(() => [...addMember, member._id]);
  }


  const addGroup = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("memberUserIds", addMember)
      const response = await fetch(
        `http://192.168.18.113:3000/api/v1/group/create`,
        {
          method: "POST",
          headers: {
            token: token,
          },
          body: formData,
        }
      );
      const res = await response.json();
      setInboxId(res.savedInbox._id);
      socket.emit("createGroup", { groupName: res.result.name });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <>
      <button onClick={removeFromLocal}>logout</button>

      <button id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom" class="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><img src={Dot} alt="dot" />
      </button>

      <div id="dropdownUsers" class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
        <ul class="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
          {data?.map((member) => (
            <li key={member.id}>
            <a href="#" class="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
  <div class="flex items-center"> 
    <img class="w-6 h-6 mr-2 rounded-full" src={member.image} alt="Jese image" />
    <h1>{member.name}</h1>
  </div>
  <button type="button"
    style={{ backgroundColor: memberColors[member._id] || '#DDDDF7' }}
    class="text-white font-medium rounded-lg text-sm px-2 py-2.5 text-right inline-flex items-right"
    onClick={() => Member(member)}
  >
    Invite
    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
    </svg>
  </button>
</a>

            </li>
          ))}
        </ul>
        <a href="#" class="flex items-center p-3 text-sm font-medium  border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600  hover:underline"
        style={{color:'#3E3C61'}}
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal" >
          <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
          </svg>

          Create a group
        </a>
      </div>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
              <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Create a Group
              </h3>
              <form class="space-y-6" action="#">
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    type="description"
                    name="description"
                    id="description"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    for="image"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <button
                style={{backgroundColor :"#3E3C61"}}
                  type="button"
                  class="w-full text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={addGroup}
                  data-modal-hide="authentication-modal"
                >
                  Done
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Group;
