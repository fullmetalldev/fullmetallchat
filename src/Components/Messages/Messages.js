import React, {useEffect} from 'react';
import "./messages.css";
import logo from "../Header/userlogo.svg"

const Messages = ({user, listMsgs}) => {

    useEffect(()=>{
        document.getElementById('messages').scrollTop = document.getElementById("messages").scrollHeight;
    }, [listMsgs]);

    return (
        <div id="messages" className="messages">
                    {listMsgs.map((item, idx) => (
                        <div
                            style={{background: item.author === "Админ" ? "green" : ""}} key={idx}
                            className={user === item.author ? "messages__row_message your" : "messages__row_message"}>
                            <div className="author__msg">
                                <img src={logo} alt="logo"/>
                                <span style={{color: item.author === "Дони шершень черный барсук великий мститель Лао-Цзы Конфуций" ? "gold" : ""}} className="author">{item.author}</span>
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