import React, {useEffect, useState} from 'react';
import "./userlog.css"
import {onValue, push, ref, set} from "firebase/database";
import {db} from "../../firebase";

const UserLogin = ({setAlertmsg, setUser, setUserForm}) => {

    const [password, setPassword] = useState("");

    const [login, setLogin] = useState("");

    const [usersData, setUsersData] = useState('');

    const usersListener = ref(db, "users");
    useEffect(() => {
        onValue(usersListener, (snapshot) => {
            const data = snapshot.val();
            setUsersData(Object.values(data))
        });
    }, []);


    const reg = (e) => {

        function checkIs(elem) {
            return elem.login !== login
        }

        if (usersData.some(checkIs)) {
            usersData.forEach((item) => {
                if (item.login !== login) {
                        const usersList = ref(db, 'users');
                        const newUser = push(usersList);
                        set(newUser, {
                            login: login,
                            password: password,
                            avatar: "https://работазабкрай.рф/static/img/cabinet.png"
                        });
                        setAlertmsg("Аккаунт успешно создан!")

                }
            })

        } else {
            setAlertmsg("Такой логин уже существует!")
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
                            setUserForm(false)
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
                    <button type="button" onClick={() => reg()}>Регистрация</button>
                </div>
            </form>
            <div onClick={() => setUserForm(false)} className="blackBack">

            </div>
        </div>
    );
};

export default UserLogin;