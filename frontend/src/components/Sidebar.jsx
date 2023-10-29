import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import AllGroups from "./allgroups";
const Sidebar = () => {
  const [showChats, setShowChats] = useState(true);

  return (
    <div className="sidebar">

      <Navbar />
      <Search />

      <div className="navbar" >
      <div className="user">
        
  <button onClick={() => setShowChats(true)}
  class=" bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium  text-sm px-2 py-1.0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 " type="button">Chats</button>
  <button onClick={() => setShowChats(false)}
  class=" bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium  text-sm px-2 py-1.0 text-center dark:bg-blue-600 dark:hover:bg-blue-700 " type="button">Groups</button>

      </div>

    </div>
  
      {showChats ? <Chats /> : <AllGroups />}
    </div>
  );
};

export default Sidebar;
