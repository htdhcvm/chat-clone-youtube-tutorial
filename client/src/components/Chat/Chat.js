import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;

const Chat = ( {location}) => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const END_POINT = "127.0.0.1:5000";

    useEffect( () => {
        let { name, room } = queryString.parse(location.search);
        
        socket = io(END_POINT);
        
        setName(name);
        setRoom(room);
        
        socket.emit("join", { name, room}, () => {
            
        });

        return () => {
            socket.emit("disconnect")
            socket.off();
        }
    }, [ END_POINT, location.search])


    useEffect( () => {
        socket.on("message", (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit("sendMessage", message, () => {
                setMessage("");
            })   
        }
         
    }

    console.log(message, messages)

    return (
        <div className="chat-container">
            <div className="container">
                <InfoBar room={room}/>
                <Messages 
                    messages={messages}
                    name={name}
                />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
} 

export default Chat;