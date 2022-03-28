import React, {useState, useEffect} from "react";
import {set, ref, onValue, push} from "firebase/database";
import {db} from "./firebase";
import './App.css';
import Header from "./Components/Header/Header";
import UserLogin from "./Components/UserLogin/UserLogin";
import Main from "./Components/Main/Main";
import Alert from "./Components/Alert/Alert";

function App() {

    const [listMsgs, setListMsgs] = useState([]);

    const [user, setUser] = useState('');

    const [userForm, setUserForm] = useState(false);

    const [alertmsg, setAlertmsg] = useState('');


    const writeNewMessage = (e) => {
        e.preventDefault();
        const postListRef = ref(db, 'messages');
        const newPostRef = push(postListRef);
        set(newPostRef, {
            title: e.target[0].value,
            author: user.login,
            time: `${new Date().getHours() <= 9 ? "0" + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() <= 9 ? "0" + new Date().getMinutes() : new Date().getMinutes()}`,
            avatar: user.avatar
        });
        e.target[0].value = ""
    };


    const messagesListener = ref(db, "messages");
    useEffect(() => {

        onValue(messagesListener, (snapshot) => {
            const data = snapshot.val();
            setListMsgs(Object.values(data));
        });

        if (localStorage.getItem("user") !== null){
            setUser(JSON.parse(localStorage.getItem("user")))
        }


    }, []);


    return (
        <div className="App">
            {alertmsg !== ""
                ? <Alert alertmsg={alertmsg} setAlertmsg={setAlertmsg}/>
                : ""
            }
            {userForm ?
                <UserLogin user={user} setAlertmsg={setAlertmsg} setUser={setUser} setUserForm={setUserForm}/> : ""}
            <Header setAlertmsg={setAlertmsg} setUserForm={setUserForm} userForm={userForm} user={user}
                    setUser={setUser}/>
            <Main user={user} listMsgs={listMsgs} writeNewMessage={writeNewMessage}/>
        </div>
    );
}

export default App;
