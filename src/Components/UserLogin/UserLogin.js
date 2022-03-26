import React from 'react';
import "./userlog.css"

const UserLogin = ({setUser, setUserForm}) => {

    const log = (e)=>{
        e.preventDefault();
        setUser(e.target[0].value);
        setUserForm(false)
    };

    return (
        <div className="userForm">
            <form className="userForm__form" onSubmit={(e)=> log(e)}>
                <h2>Введите ваше имя:</h2>
                <input type="text"/>
                <button>Изменить</button>
            </form>
            <div onClick={()=> setUserForm(false)} className="blackBack">

            </div>
        </div>
    );
};

export default UserLogin;