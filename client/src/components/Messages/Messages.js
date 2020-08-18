import React from "react";
import ScrollButton from "react-scroll-to-bottom";
import "./Messages";

import Message from "../Message/Message"

const Messages = ( {messages, name } ) => (
    <ScrollButton>
        {messages.map( (message, i) => {
            return <div key={i}><Message message={message} name={name}/></div>
        })}
    </ScrollButton>
)


export default Messages;