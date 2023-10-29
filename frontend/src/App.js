import React, { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useChat } from "./context/chatContext";
import io from "socket.io-client";
import { getToken } from "./components/localstorage";
import "./style.scss";


function App() {
  const { setTyping, setMessage, setStatus, setAudio, inboxId } = useChat();
  const { userId } = getToken();

  useEffect(() => {
    const socket = io("http://192.168.18.113:3002");
    socket.on("connect", () => {
      socket.emit("addUser", { userId: userId });
    });

    socket.on("messageReceived", (savedMessage) => {
      setMessage((prevChat) => {
        prevChat = prevChat || [];
        return [...prevChat, savedMessage];
      });
    });

    socket.on("typing", (data) => {
      if (data.typing == true) setTyping(`typing...`);
      else setTyping(" ");
    });

    socket.on("userOnline", () => {
      setStatus(true);
    });

    socket.on("userOffline", () => {
      setStatus(false);
    });

    socket.on("audio", (data) => {

      const blob = new Blob([data], { type: 'audio/wav' });
      const audioSrc = URL.createObjectURL(blob);
      setAudio((prevAudio) => {
        prevAudio = prevAudio || [];
        return [...prevAudio, audioSrc];
      });



    });
    socket.on("notification", (data) => {
      alert(`${data}`)
    });

  }, [userId, inboxId]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
  

          </Route>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
