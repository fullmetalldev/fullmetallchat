import React, {useEffect} from 'react';
import "./messages.css";
import logo from "../Header/userlogo.svg"

const Messages = ({user, listMsgs}) => {

    useEffect(() => {
        document.getElementById('messages').scrollTop = document.getElementById("messages").scrollHeight;
    }, [listMsgs]);

    return (
        <div id="messages" className="messages">
            {listMsgs.map((item, idx) => (
                <div key={idx}
                    className={user.login === item.author ? "messages__row_message your" : "messages__row_message"}>
                    <div className="author__msg">
                        <img src={item.avatar ? item.avatar : logo} alt="logo"/>
                        <span style={{color: item.author === "Doni second Admin" ? "gold" : ""}} className="author">{item.author}</span>
                    </div>
                    <span>{item.title}</span>
                    <span className="time">
                                {item.time}
                                </span>
                </div>
            ))}
        </div>

    );
};

export default Messages;