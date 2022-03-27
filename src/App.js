import React, {useState, useEffect} from "react";
import {child, get, set, ref, onValue, push} from "firebase/database";
import {db} from "./firebase";
import './App.css';
import Header from "./Components/Header/Header";
import UserLogin from "./Components/UserLogin/UserLogin";
import Messages from "./Components/Messages/Messages";
import Main from "./Components/Main/Main";

function App() {

    const [listMsgs, setListMsgs] = useState([]);
    const [user, setUser] = useState("");
    const [userForm, setUserForm] = useState(false);


    const writeNewMessage = (e) => {
        e.preventDefault();
        const postListRef = ref(db, 'messages');
        const newPostRef = push(postListRef);
        set(newPostRef, {
            title: e.target[0].value,
            author: user,
            time: `${new Date().getHours()}:${new Date().getMinutes()}`
        });
        e.target[0].value = ""
    };


    const messagesListener = ref(db, "messages");
    useEffect(() => {
        onValue(messagesListener, (snapshot) => {
            const data = snapshot.val();
            setListMsgs(Object.values(data));
        });
    }, []);



    return (
        <div className="App">
            {userForm ? <UserLogin setUser={setUser} setUserForm={setUserForm}/> : ""}
            <Header setUserForm={setUserForm} userForm={userForm} user={user} setUser={setUser}/>
            <Main user={user} listMsgs={listMsgs} writeNewMessage={writeNewMessage}/>
        </div>
    );
}

export default App;
