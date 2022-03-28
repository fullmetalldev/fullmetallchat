import React, {useEffect, useState} from 'react';
import "./userlog.css"
import {onValue, push, ref, set} from "firebase/database";
import {db} from "../../firebase";

const UserLogin = ({setAlertmsg, user, setUser, setUserForm}) => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");


    const [usersData, setUsersData] = useState('');

    const usersListener = ref(db, "users");
    useEffect(() => {
        onValue(usersListener, (snapshot) => {
            const data = snapshot.val();
            setUsersData(Object.values(data))
        });
    }, []);


    const registerFunc = () => {

        function checkIs(elem) {
            return elem.login === login
        }

        if (login.length && password.length > 2) {
            if (usersData.some(checkIs)) {
                setAlertmsg("Аккаунт существует!")
            } else {
                const usersList = ref(db, 'users');
                const newUser = push(usersList);
                set(newUser, {
                    login: login,
                    password: password,
                    avatar: "https://yt3.ggpht.com/ytc/AKedOLQTgF1BoM1wG6t3wn2j_dg8s56AaGG_rLviVYwM=s900-c-k-c0x00ffffff-no-rj"
                });
                setUser({
                    login: login,
                    password: password,
                    avatar: "https://yt3.ggpht.com/ytc/AKedOLQTgF1BoM1wG6t3wn2j_dg8s56AaGG_rLviVYwM=s900-c-k-c0x00ffffff-no-rj"
                });

                localStorage.setItem("user", JSON.stringify({
                    login: login,
                    password: password,
                    avatar: "https://yt3.ggpht.com/ytc/AKedOLQTgF1BoM1wG6t3wn2j_dg8s56AaGG_rLviVYwM=s900-c-k-c0x00ffffff-no-rj"
                }));

                setAlertmsg("Аккаунт успешно создан!");
                setUserForm(false);

            }
        }
        else {
            setAlertmsg("Не допустимое кол-во символов!")
        }

    };


    const log = () => {

        function checkIs(elem) {
            return elem.login === login
        }

        if (usersData.some(checkIs)) {
            usersData.forEach((item) => {
                if (item.login === login) {
                    if (item.password === password) {
                        setUser({
                            login: item.login,
                            password: item.password,
                            avatar: item.avatar
                        });

                        localStorage.setItem("user", JSON.stringify({
                            login: item.login,
                            password: item.password,
                            avatar: item.avatar
                        }));

                        setUserForm(false);
                        setAlertmsg("Вы успешно вошли в аккаунт!");

                    } else {
                        setAlertmsg("Вы ввели не правильный пароль!")
                    }

                }

            })

        } else {
            setAlertmsg("Логин не найден!")
        }
    };

    return (
        <div className="userForm">
            <form className="userForm__form">
                <h2>Введите ваше имя:</h2>
                <input
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                    type="text"/>
                <h2>Пароль</h2>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"/>
                <div className="userForm__buttons">
                    <button type="button" onClick={() => log()}>Вход</button>
                    <button type="button" onClick={() => registerFunc()}>Регистрация</button>
                </div>
            </form>
            <div onClick={() => setUserForm(false)} className="blackBack">

            </div>
        </div>
    );
};

export default UserLogin;