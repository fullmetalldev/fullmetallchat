import React from 'react';
import Messages from "../Messages/Messages";
import "./Main.css";

const Main = ({user, listMsgs, writeNewMessage}) => {
    return (
        <main className="main">
            <div className="container">
                <Messages user={user} listMsgs={listMsgs}/>
                {user !== ""
                    ? <form className="sendMessages" onSubmit={(e) => writeNewMessage(e)}>
                        <input required minLength="1" type="text"/>
                        <button className="sendMessage">
                            Отправить
                        </button>
                    </form>
                    : <div className="Warning">
                        Залогиньтесь чтобы печатать сообщения...
                    </div>
                }
            </div>

        </main>
    );
};

export default Main;