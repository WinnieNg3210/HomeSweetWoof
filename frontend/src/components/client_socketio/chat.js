import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import ToolBar from "./toolbar";
import Input from "./input";
import Messages from "./messages";

let socket;

const Chat = ({ location }) => {
  const [name, setname] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://homesweetwoof.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setname(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {

    });

    return () => {
      socket.on('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
    
  };

  return (
    <div className="socket-chat-container">
      <div className="chat-room">
        <ToolBar room={room} name={name} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
