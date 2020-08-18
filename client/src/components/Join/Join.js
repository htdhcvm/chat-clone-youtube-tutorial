import React, { useState } from "react";
import { Link } from "react-router-dom";


const Join = () => {
    const [name, setName] = useState();
    const [room, setRoom] = useState();

    return (
        <section className="join">
            <div className="joinInnerContainer">
                <h1 className="header">Join</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={ (event) => { setName(event.target.value)}}/>
                </div>
                <div>
                    <input placeholder="Room" className="joinInput" type="text" onChange={ (event) => { setRoom(event.target.value)}}/>
                </div>
                <Link onClick={ event => !name || !room ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button>Sign in</button>
                </Link>
            </div>
        </section>
    );
} 

export default Join;