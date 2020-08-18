import React from "react";
import "./Message";

const Message = ( {message : {user, text}, name } ) => {
    let isSentByCurrentUser = false;

    let trimmedName = name.trim().toLowerCase();
    
    if( user === trimmedName) {
        isSentByCurrentUser = true;
    }
    
    return(
        isSentByCurrentUser 
            ? (
                <div className="messageContainer">
                    <p className="sendText">{trimmedName}</p>
                    <div className="messageBox">
                        <p className="messageText">{text}</p>
                    </div>
                </div>
            ) : (
                <div className="messageContainer">
                    <div className="messageBox">
                        <p className="messageText">{text}</p>
                    </div>
                    <p className="sendText">{user}</p>
                </div>
            )
    );
}


export default Message;